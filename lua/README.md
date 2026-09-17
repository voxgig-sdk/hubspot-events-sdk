# HubspotEvents Lua SDK



The Lua SDK for the HubspotEvents API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Basic()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hubspot-events-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("hubspot-events_sdk")

local client = sdk.new({
  apikey = os.getenv("HUBSPOT_EVENTS_APIKEY"),
})
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Basic():create({ eventName = "example_eventName", properties = {} })
if err then error(err) end

-- Remove
client:Basic():remove({ event_name = "example_event_name" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local eventscollectionresponseexternalunifiedevents, err = client:EventsCollectionResponseExternalUnifiedEvent():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:EventsCollectionResponseExternalUnifiedEvent():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HUBSPOT_EVENTS_TEST_LIVE=TRUE
HUBSPOT_EVENTS_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### HubspotEventsSDK

```lua
local sdk = require("hubspot-events_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HubspotEventsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Basic` | `(data) -> BasicEntity` | Create a Basic entity instance. |
| `Batch` | `(data) -> BatchEntity` | Create a Batch entity instance. |
| `EventDefinition` | `(data) -> EventDefinitionEntity` | Create an EventDefinition entity instance. |
| `EventsCollectionResponseExternalUnifiedEvent` | `(data) -> EventsCollectionResponseExternalUnifiedEventEntity` | Create an EventsCollectionResponseExternalUnifiedEvent entity instance. |
| `EventsVisibleExternalEventTypeName` | `(data) -> EventsVisibleExternalEventTypeNameEntity` | Create an EventsVisibleExternalEventTypeName entity instance. |
| `ManageEventDefinitionsCollectionResponseWithTotalExternal` | `(data) -> ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` | Create a ManageEventDefinitionsCollectionResponseWithTotalExternal entity instance. |
| `ManageEventDefinitionsProperty` | `(data) -> ManageEventDefinitionsPropertyEntity` | Create a ManageEventDefinitionsProperty entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local event_definition, err = client:EventDefinition():load({ id = "example_id" })
    if err then error(err) end
    -- event_definition is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Basic

| Field | Description |
| --- | --- |
| `email` | The visitor's email address. |
| `eventName` | The event's fully qualified name. |
| `objectId` | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | The time when this event occurred. |
| `properties` | The event properties to update. |
| `utk` | The visitor's usertoken. |
| `uuid` | A unique identifier for the event occurrence. |

Operations: Create, Remove.

API path: `/events/2026-09/send`

#### Batch

| Field | Description |
| --- | --- |
| `inputs` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

Operations: Create.

API path: `/events/2026-09/send/batch`

#### EventDefinition

| Field | Description |
| --- | --- |
| `archived` | A boolean indicating whether the event type is archived. |
| `associations` | An array of association definitions related to the event type. |
| `comboEventRules` |  |
| `createdAt` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` |  |
| `description` | A string providing a description of the event type. |
| `detailTemplate` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | The rendering template for the header of the CRM timeline activity card. |
| `id` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | A boolean indicating whether default properties should be included. |
| `label` | A string representing the label of the event type. |
| `labels` |  |
| `name` | A string representing the name of the event type. |
| `objectTypeId` | A string representing the object type ID associated with the event type. |
| `primaryObject` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | A string representing the ID of the primary object associated with the event type. |
| `properties` | An array of property objects associated with the event type. |
| `propertyDefinitions` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | A string indicating the tracking type of the event. |
| `updatedAt` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | An integer representing the ID of the user who last updated the event type. |

Operations: Create, Load, Update.

API path: `/events/2026-09/event-definitions`

#### EventsCollectionResponseExternalUnifiedEvent

| Field | Description |
| --- | --- |
| `eventType` | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | A unique identifier for the event. |
| `objectId` | The objectId of the object which did the event. |
| `objectType` | The objectType for the object which did the event. |
| `occurredAt` | An ISO 8601 timestamp when the event occurred. |
| `properties` | A key-value map of event-specific properties. |

Operations: List.

API path: `/events/event-occurrences/2026-09`

#### EventsVisibleExternalEventTypeName

| Field | Description |
| --- | --- |
| `eventTypes` | List of event type names. |

Operations: List.

API path: `/events/event-occurrences/2026-09/event-types`

#### ManageEventDefinitionsCollectionResponseWithTotalExternal

| Field | Description |
| --- | --- |
| `archived` | A boolean indicating whether the event type is archived. |
| `associations` | An array of association definitions related to the event type. |
| `comboEventRules` |  |
| `createdAt` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` |  |
| `description` | A string providing a description of the event type. |
| `detailTemplate` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | The rendering template for the header of the CRM timeline activity card. |
| `id` | A string representing the unique identifier of the event type. |
| `labels` |  |
| `name` | A string representing the name of the event type. |
| `objectTypeId` | A string representing the object type ID associated with the event type. |
| `primaryObject` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | A string representing the ID of the primary object associated with the event type. |
| `properties` | An array of property objects associated with the event type. |
| `trackingType` | A string indicating the tracking type of the event. |
| `updatedAt` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | An integer representing the ID of the user who last updated the event type. |

Operations: List.

API path: `/events/2026-09/event-definitions`

#### ManageEventDefinitionsProperty

| Field | Description |
| --- | --- |
| `description` | A string providing additional information about the property. |
| `displayOrder` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` |  |
| `label` | A string representing the display name of the property. |
| `name` | A string representing the unique name of the property. |
| `options` | An array of OptionInput objects that define the possible values for the property. |
| `type` | A string indicating the data type of the property. |

Operations: Create, Update.

API path: `/events/2026-09/event-definitions/{eventName}/property`



## Entities


### Basic

Create an instance: `local basic = client:Basic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The visitor's email address. |
| `eventName` | `string` | The event's fully qualified name. |
| `objectId` | `string` | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `string` | The time when this event occurred. |
| `properties` | `table` | The event properties to update. |
| `utk` | `string` | The visitor's usertoken. |
| `uuid` | `string` | A unique identifier for the event occurrence. |

#### Example: Create

```lua
local basic, err = client:Basic():create({
  eventName = "example_eventName", -- string
  properties = {}, -- table
})
```


### Batch

Create an instance: `local batch = client:Batch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inputs` | `table` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

#### Example: Create

```lua
local batch, err = client:Batch():create({
  inputs = {}, -- table
})
```


### EventDefinition

Create an instance: `local event_definition = client:EventDefinition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `boolean` | A boolean indicating whether the event type is archived. |
| `associations` | `table` | An array of association definitions related to the event type. |
| `comboEventRules` | `table` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `table` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `boolean` | A boolean indicating whether default properties should be included. |
| `label` | `string` | A string representing the label of the event type. |
| `labels` | `table` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `table` | An array of property objects associated with the event type. |
| `propertyDefinitions` | `table` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `table` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | An integer representing the ID of the user who last updated the event type. |

#### Example: Load

```lua
local event_definition, err = client:EventDefinition():load({ id = "event_definition_id" })
```

#### Example: Create

```lua
local event_definition, err = client:EventDefinition():create({
  archived = true, -- boolean
  associations = {}, -- table
  comboEventRules = {}, -- table
  customMatchingId = {}, -- table
  fullyQualifiedName = "example_fullyQualifiedName", -- string
  id = "example_id", -- string
  includeDefaultProperties = true, -- boolean
  label = "example_label", -- string
  labels = {}, -- table
  name = "example_name", -- string
  objectTypeId = "example_objectTypeId", -- string
  properties = {}, -- table
  propertyDefinitions = {}, -- table
  propertyOrder = {}, -- table
})
```


### EventsCollectionResponseExternalUnifiedEvent

Create an instance: `local events_collection_response_external_unified_event = client:EventsCollectionResponseExternalUnifiedEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventType` | `string` | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `string` | A unique identifier for the event. |
| `objectId` | `string` | The objectId of the object which did the event. |
| `objectType` | `string` | The objectType for the object which did the event. |
| `occurredAt` | `string` | An ISO 8601 timestamp when the event occurred. |
| `properties` | `table` | A key-value map of event-specific properties. |

#### Example: List

```lua
local events_collection_response_external_unified_events, err = client:EventsCollectionResponseExternalUnifiedEvent():list()
```


### EventsVisibleExternalEventTypeName

Create an instance: `local events_visible_external_event_type_name = client:EventsVisibleExternalEventTypeName(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypes` | `table` | List of event type names. |

#### Example: List

```lua
local events_visible_external_event_type_names, err = client:EventsVisibleExternalEventTypeName():list()
```


### ManageEventDefinitionsCollectionResponseWithTotalExternal

Create an instance: `local manage_event_definitions_collection_response_with_total_external = client:ManageEventDefinitionsCollectionResponseWithTotalExternal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `boolean` | A boolean indicating whether the event type is archived. |
| `associations` | `table` | An array of association definitions related to the event type. |
| `comboEventRules` | `table` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `table` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `labels` | `table` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `table` | An array of property objects associated with the event type. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | An integer representing the ID of the user who last updated the event type. |

#### Example: List

```lua
local manage_event_definitions_collection_response_with_total_externals, err = client:ManageEventDefinitionsCollectionResponseWithTotalExternal():list()
```


### ManageEventDefinitionsProperty

Create an instance: `local manage_event_definitions_property = client:ManageEventDefinitionsProperty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A string providing additional information about the property. |
| `displayOrder` | `number` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `boolean` | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `string` |  |
| `label` | `string` | A string representing the display name of the property. |
| `name` | `string` | A string representing the unique name of the property. |
| `options` | `table` | An array of OptionInput objects that define the possible values for the property. |
| `type` | `string` | A string indicating the data type of the property. |

#### Example: Create

```lua
local manage_event_definitions_property, err = client:ManageEventDefinitionsProperty():create({
  event_name = "example_event_name", -- string
  label = "example_label", -- string
  type = "example_type", -- string
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

2 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `event_definition` | `comboEventRules` | 21 | 20 levels |
| `manage_event_definitions_collection_response_with_total_external` | `comboEventRules` | 21 | 20 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── hubspot-events_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`hubspot-events_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local eventscollectionresponseexternalunifiedevent = client:EventsCollectionResponseExternalUnifiedEvent()
eventscollectionresponseexternalunifiedevent:list()

-- eventscollectionresponseexternalunifiedevent:data_get() now returns the eventscollectionresponseexternalunifiedevent data from the last list
-- eventscollectionresponseexternalunifiedevent:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
