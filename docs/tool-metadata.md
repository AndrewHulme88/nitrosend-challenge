# Tool metadata: what the agent can currently know

Everything a Nitrosend agent knows about the consequence of an action comes from
the tool manifest. This is a record of what that manifest actually contains,
because the argument for changing the interface has to rest on the real thing
rather than on a plausible-sounding summary of it.

## Provenance

Captured from `mcp tools list` against the Nitrosend MCP server on 1 August 2026.
The response reported `"environment": "development"`, so this is the development
server's manifest; production may differ. 25 tools were returned.

Counts across those 25:

| Signal | Tools |
| --- | --- |
| `readOnlyHint: true` | 6 |
| `destructiveHint: true` | 7 |
| Neither | 12 |
| Carries a `_meta.ui` resource | 2 |

## The problem in four tools

These are quoted verbatim from the manifest, trimmed to the fields under
discussion.

**A read.** No consequence, and the metadata says so clearly.

```json
{
  "name": "nitro_query",
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": true
  }
}
```

**A draft.** Marked destructive, but the tool's own description says it is not.

```json
{
  "name": "nitro_compose_campaign",
  "description": "... Creates a draft — use nitro_control_delivery to approve and send ...",
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true
  },
  "_meta": { "ui": { "resourceUri": "ui://nitrosend/email-preview" } }
}
```

**An irreversible send.** Same flag as the draft above. No `dry_run` parameter,
and no `_meta.ui`.

```json
{
  "name": "nitro_control_delivery",
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": true
  }
}
```

**A bulk write that is not flagged at all.** Imports up to 250,000 contacts and
subscribes email contacts by default.

```json
{
  "name": "nitro_import_contacts",
  "description": "... up to 250k rows self-serve, with sends held for review above 20k ...",
  "annotations": {
    "readOnlyHint": false,
    "destructiveHint": false
  }
}
```

Two things follow. `destructiveHint` spans everything from a private draft to a
permanent mass send, so a UI driven by it either confirms all of them the same
way or none of them. And it is not even consistently applied: the unflagged bulk
import carries more real-world consequence than the flagged draft.

## Consequence varies inside a single tool

The annotation is per tool, but several tools take an `operation` parameter whose
values differ enormously in consequence. `nitro_control_delivery` accepts
`approve`, `reject`, `live`, `schedule`, `pause`, `resume`, `cancel`, `archive`,
`restore`, and `delete` under one `destructiveHint: true`. Pausing a campaign is
trivially reversible; making it live is not. `nitro_manage_audience` has the same
shape, covering `create_contact` through `delete_segment`.

No per-tool boolean can describe this, because the consequence is not a property
of the tool.

## What already exists

The product is not naive about this, and the proposal below is a generalisation
of patterns already present rather than a new idea imposed on it.

- `dry_run` appears on 9 tools, including both compose tools and both send tools.
  `nitro_define_segment` does the same job under a different name, defaulting to
  `preview_only: true`.
- `confirm: true` gates the sharpest edges: `delete_segment`, list deletion,
  domain removal, graph replacement, and draft deletion.
- `confirm_send_to_all` on `nitro_control_delivery` is a bespoke guard for
  exactly one case — making a campaign live against `audience_type:
  "all_contacts"`.
- `nitro_review_delivery` is a read-only preflight returning validation, spam
  score and preview URLs. `nitro_send_test_message` sends a real rehearsal to at
  most 5 nominated addresses.
- `idempotency_key` is required for most non-dry-run mutations, and flow
  approval requires an exact `revision_id`.

`confirm_send_to_all` is the most telling of these. Someone recognised that
reaching everybody is categorically different from reaching somebody, and
expressed it as a one-off boolean on a single parameter of a single tool. The
insight is right; it just has nowhere general to live.

The preflight tools are the second telling detail. Rehearsal already exists and
is good, but nothing in the metadata connects `nitro_review_delivery` or
`nitro_send_test_message` to the action they are a rehearsal for. An agent has to
already know to reach for them.

## Proposed metadata

Two axes, because one is demonstrably not enough. Reversibility answers "can this
be taken back", reach answers "how many people does it touch" — and the existence
of `confirm_send_to_all` shows the second matters independently of the first.

```json
"_meta": {
  "nitrosend/consequence": {
    "default": { "reversibility": "reversible", "reach": "account" },
    "varies_by": "operation",
    "cases": {
      "pause":  { "reversibility": "reversible",   "reach": "account" },
      "live":   {
        "reversibility": "irreversible",
        "reach": "audience",
        "rehearse_with": "nitro_send_test_message",
        "preview_with": "nitro_review_delivery"
      }
    }
  }
}
```

- `reversibility` — `none` (a read), `reversible` (undoable in product), or
  `irreversible` (has left the system).
- `reach` — `self`, `nominated` (addresses the operator chose, as with a test
  send), or `audience` (a list or segment, resolved to a count at call time).
- `rehearse_with` and `preview_with` name the existing tools, so the rehearsal
  path is discoverable from the consequential action rather than known in advance.

`varies_by` addresses the per-operation problem directly: the consequence is
resolved from the arguments of the call, not looked up per tool.

The prototype implements this resolution server-side and fails closed — an
operation with no declared case is treated as irreversible until stated
otherwise, so adding a tool cannot silently create an unguarded send.
