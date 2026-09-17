# API definition provenance

## hubspot-events-openapi.json

- **Source:** https://github.com/HubSpot/HubSpot-public-api-spec-collection
  (`PublicApiSpecs/Events/*/Rollouts/*/<version>/*.json`)
- **Publisher:** HubSpot (the official HubSpot-maintained spec collection)
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.0.1
- **Size:** 168107 bytes
- **Coverage:** every API HubSpot publishes under **Events** — 3 document(s),
  merged to 8 paths and 78 component schemas.

## Why this is a merge, and one SDK per product group

HubSpot publishes **140** separate OpenAPI documents, one per API, grouped by
product (Events is one such group). One SDK per document would be 140 SDKs;
one SDK for all of HubSpot would be a single enormous client. The SDK is
therefore cut at HubSpot's own product-group boundary, and this file is every
document in that group merged into one.

The merge is mechanical and lossless in shape:

- The **latest stable rollout** of each API is taken — a dated version
  (`2026-09`) over a `vN` version, and a `-beta` rollout only where the API
  publishes nothing else.
- **Component names are namespaced per source document.** The documents were
  written independently and a dozen of them define their own `Error`,
  `Paging` or `SimplePublicObject`; every `$ref` is rewritten to match, so
  no two different shapes silently unify under one name.
- **Security schemes are shared**, not namespaced: HubSpot's APIs all take the
  same OAuth2 / private-app auth, so the merged document declares one auth
  surface.
- Where two documents in the group describe the **same path** — HubSpot's CRM
  APIs are generic over `{objectType}`, so many do — the operations are merged
  rather than one document replacing the other.

Regenerate with `admin/scripts/hubspot-merge.sh`; do not hand-edit this file.
