# HubSpot Events API

HubSpot Events API, merged from the vendor&#39;s per-API OpenAPI documents.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Basic](docs/api/basic.html)

Results: No content.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `email`: The visitor&#39;s email address.
- `eventName`: The event&#39;s fully qualified name.
- `objectId`: The ID of the record for which the event occurred (for example, contact ID or visitor ID).
- `occurredAt`: The time when this event occurred.
- `properties`: The event properties to update.

### [Batch](docs/api/batch.html)

Results: No content.

SDK operations: `create`.

Key fields to recognise:

- `inputs`: An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.

### [EventDefinition](docs/api/event_definition.html)

Results: successful operation.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `archived`: A boolean indicating whether the event type is archived.
- `associations`: An array of association definitions related to the event type.
- `createdAt`: A string representing the date and time when the event type was created, in ISO 8601 format.
- `createdUserId`: An integer representing the ID of the user who created the event type.
- `description`: A string providing a description of the event type.

### [EventsCollectionResponseExternalUnifiedEvent](docs/api/events_collection_response_external_unified_event.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `eventType`: The format of the `eventType` string is `ae&#123;appId&#125;_&#123;eventTypeLabel&#125;`, `pe&#123;portalId&#125;_&#123;eventTypeLabel&#125;`, or just `e_&#123;eventTypeLabel&#125;` for HubSpot events.
- `id`: A unique identifier for the event.
- `objectId`: The objectId of the object which did the event.
- `objectType`: The objectType for the object which did the event.
- `occurredAt`: An ISO 8601 timestamp when the event occurred.

### [EventsVisibleExternalEventTypeName](docs/api/events_visible_external_event_type_name.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `eventTypes`: List of event type names.

### [ManageEventDefinitionsCollectionResponseWithTotalExternal](docs/api/manage_event_definitions_collection_response_with_total_external.html)

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `archived`: A boolean indicating whether the event type is archived.
- `associations`: An array of association definitions related to the event type.
- `createdAt`: A string representing the date and time when the event type was created, in ISO 8601 format.
- `createdUserId`: An integer representing the ID of the user who created the event type.
- `description`: A string providing a description of the event type.

### [Property](docs/api/property.html)

Results: successful operation.

SDK operations: `create`, `update`.

Key fields to recognise:

- `description`: A description of the property.
- `displayOrder`: The order in which this property is displayed relative to other properties.
- `hidden`: Indicates whether the property is hidden.
- `label`: The display label for the property.
- `name`: The unique name of the property.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Basic](docs/api/basic.html) | `create` | `POST /events/2026-09/send` | Required |
| [Basic](docs/api/basic.html) | `remove` | `DELETE /events/2026-09/event-definitions/{eventName}/property/{propertyName}` | Required |
| [Basic](docs/api/basic.html) | `remove` | `DELETE /events/2026-09/event-definitions/{eventName}` | Required |
| [Batch](docs/api/batch.html) | `create` | `POST /events/2026-09/send/batch` | Required |
| [EventDefinition](docs/api/event_definition.html) | `create` | `POST /events/2026-09/event-definitions` | Required |
| [EventDefinition](docs/api/event_definition.html) | `load` | `GET /events/2026-09/event-definitions/{eventName}` | Required |
| [EventDefinition](docs/api/event_definition.html) | `update` | `PATCH /events/2026-09/event-definitions/{eventName}` | Required |
| [EventsCollectionResponseExternalUnifiedEvent](docs/api/events_collection_response_external_unified_event.html) | `list` | `GET /events/event-occurrences/2026-09` | Required |
| [EventsVisibleExternalEventTypeName](docs/api/events_visible_external_event_type_name.html) | `list` | `GET /events/event-occurrences/2026-09/event-types` | Required |
| [ManageEventDefinitionsCollectionResponseWithTotalExternal](docs/api/manage_event_definitions_collection_response_with_total_external.html) | `list` | `GET /events/2026-09/event-definitions` | Required |
| [Property](docs/api/property.html) | `create` | `POST /events/2026-09/event-definitions/{eventName}/property` | Required |
| [Property](docs/api/property.html) | `update` | `PATCH /events/2026-09/event-definitions/{eventName}/property/{propertyName}` | Required |

## Connect to the API

- API server: `https://api.hubapi.com`

The default credential is sent in the `hapikey` query.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hubspot-events_list`: List records for an entity. Supported entities: `events_collection_response_external_unified_event`, `events_visible_external_event_type_name`, `manage_event_definitions_collection_response_with_total_external`.
- `hubspot-events_load`: Load one record for an entity. Supported entities: `event_definition`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

