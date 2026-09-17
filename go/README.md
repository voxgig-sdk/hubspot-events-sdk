# HubspotEvents Golang SDK



The Golang SDK for the HubspotEvents API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Basic(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hubspot-events-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/hubspot-events-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hubspot-events-sdk/go=../hubspot-events-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/hubspot-events-sdk/go"
)

func main() {
    client := sdk.NewHubspotEventsSDK(map[string]any{
        "apikey": os.Getenv("HUBSPOT_EVENTS_APIKEY"),
    })

    // Create a basic.
    created, err := client.Basic(nil).Create(map[string]any{"eventName": "example_eventName", "properties": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Remove a basic.
    removed, err := client.Basic(nil).Remove(map[string]any{"event_name": "example_event_name"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
eventscollectionresponseexternalunifiedevents, err := client.EventsCollectionResponseExternalUnifiedEvent(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = eventscollectionresponseexternalunifiedevents
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

eventsCollectionResponseExternalUnifiedEvent, err := client.EventsCollectionResponseExternalUnifiedEvent(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(eventsCollectionResponseExternalUnifiedEvent) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHubspotEventsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewHubspotEventsSDK

```go
func NewHubspotEventsSDK(options map[string]any) *HubspotEventsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *HubspotEventsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### HubspotEventsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Basic` | `(data map[string]any) HubspotEventsEntity` | Create a Basic entity instance. |
| `Batch` | `(data map[string]any) HubspotEventsEntity` | Create a Batch entity instance. |
| `EventDefinition` | `(data map[string]any) HubspotEventsEntity` | Create an EventDefinition entity instance. |
| `EventsCollectionResponseExternalUnifiedEvent` | `(data map[string]any) HubspotEventsEntity` | Create an EventsCollectionResponseExternalUnifiedEvent entity instance. |
| `EventsVisibleExternalEventTypeName` | `(data map[string]any) HubspotEventsEntity` | Create an EventsVisibleExternalEventTypeName entity instance. |
| `ManageEventDefinitionsCollectionResponseWithTotalExternal` | `(data map[string]any) HubspotEventsEntity` | Create a ManageEventDefinitionsCollectionResponseWithTotalExternal entity instance. |
| `ManageEventDefinitionsProperty` | `(data map[string]any) HubspotEventsEntity` | Create a ManageEventDefinitionsProperty entity instance. |

### Entity interface (HubspotEventsEntity)

All entities implement the `HubspotEventsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    basic, err := client.Basic(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // basic is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Basic

| Field | Description |
| --- | --- |
| `"email"` | The visitor's email address. |
| `"eventName"` | The event's fully qualified name. |
| `"objectId"` | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `"occurredAt"` | The time when this event occurred. |
| `"properties"` | The event properties to update. |
| `"utk"` | The visitor's usertoken. |
| `"uuid"` | A unique identifier for the event occurrence. |

Operations: Create, Remove.

API path: `/events/2026-09/send`

#### Batch

| Field | Description |
| --- | --- |
| `"inputs"` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

Operations: Create.

API path: `/events/2026-09/send/batch`

#### EventDefinition

| Field | Description |
| --- | --- |
| `"archived"` | A boolean indicating whether the event type is archived. |
| `"associations"` | An array of association definitions related to the event type. |
| `"comboEventRules"` |  |
| `"createdAt"` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `"createdUserId"` | An integer representing the ID of the user who created the event type. |
| `"customMatchingId"` |  |
| `"description"` | A string providing a description of the event type. |
| `"detailTemplate"` | The rendering template for the body of the CRM timeline activity card. |
| `"fullyQualifiedName"` | A string representing the fully qualified name of the event type. |
| `"headerTemplate"` | The rendering template for the header of the CRM timeline activity card. |
| `"id"` | A string representing the unique identifier of the event type. |
| `"includeDefaultProperties"` | A boolean indicating whether default properties should be included. |
| `"label"` | A string representing the label of the event type. |
| `"labels"` |  |
| `"name"` | A string representing the name of the event type. |
| `"objectTypeId"` | A string representing the object type ID associated with the event type. |
| `"primaryObject"` | A string representing the primary object associated with the event type. |
| `"primaryObjectId"` | A string representing the ID of the primary object associated with the event type. |
| `"properties"` | An array of property objects associated with the event type. |
| `"propertyDefinitions"` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `"propertyOrder"` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `"trackingType"` | A string indicating the tracking type of the event. |
| `"updatedAt"` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `"updatedUserId"` | An integer representing the ID of the user who last updated the event type. |

Operations: Create, Load, Update.

API path: `/events/2026-09/event-definitions`

#### EventsCollectionResponseExternalUnifiedEvent

| Field | Description |
| --- | --- |
| `"eventType"` | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `"id"` | A unique identifier for the event. |
| `"objectId"` | The objectId of the object which did the event. |
| `"objectType"` | The objectType for the object which did the event. |
| `"occurredAt"` | An ISO 8601 timestamp when the event occurred. |
| `"properties"` | A key-value map of event-specific properties. |

Operations: List.

API path: `/events/event-occurrences/2026-09`

#### EventsVisibleExternalEventTypeName

| Field | Description |
| --- | --- |
| `"eventTypes"` | List of event type names. |

Operations: List.

API path: `/events/event-occurrences/2026-09/event-types`

#### ManageEventDefinitionsCollectionResponseWithTotalExternal

| Field | Description |
| --- | --- |
| `"archived"` | A boolean indicating whether the event type is archived. |
| `"associations"` | An array of association definitions related to the event type. |
| `"comboEventRules"` |  |
| `"createdAt"` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `"createdUserId"` | An integer representing the ID of the user who created the event type. |
| `"customMatchingId"` |  |
| `"description"` | A string providing a description of the event type. |
| `"detailTemplate"` | The rendering template for the body of the CRM timeline activity card. |
| `"fullyQualifiedName"` | A string representing the fully qualified name of the event type. |
| `"headerTemplate"` | The rendering template for the header of the CRM timeline activity card. |
| `"id"` | A string representing the unique identifier of the event type. |
| `"labels"` |  |
| `"name"` | A string representing the name of the event type. |
| `"objectTypeId"` | A string representing the object type ID associated with the event type. |
| `"primaryObject"` | A string representing the primary object associated with the event type. |
| `"primaryObjectId"` | A string representing the ID of the primary object associated with the event type. |
| `"properties"` | An array of property objects associated with the event type. |
| `"trackingType"` | A string indicating the tracking type of the event. |
| `"updatedAt"` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `"updatedUserId"` | An integer representing the ID of the user who last updated the event type. |

Operations: List.

API path: `/events/2026-09/event-definitions`

#### ManageEventDefinitionsProperty

| Field | Description |
| --- | --- |
| `"description"` | A string providing additional information about the property. |
| `"displayOrder"` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `"hidden"` | Controls whether or not this property is displayed on the record's activity timeline. |
| `"id"` |  |
| `"label"` | A string representing the display name of the property. |
| `"name"` | A string representing the unique name of the property. |
| `"options"` | An array of OptionInput objects that define the possible values for the property. |
| `"type"` | A string indicating the data type of the property. |

Operations: Create, Update.

API path: `/events/2026-09/event-definitions/{eventName}/property`



## Entities


### Basic

Create an instance: `basic := client.Basic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The visitor's email address. |
| `eventName` | `string` | The event's fully qualified name. |
| `objectId` | `string` | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `string` | The time when this event occurred. |
| `properties` | `map[string]any` | The event properties to update. |
| `utk` | `string` | The visitor's usertoken. |
| `uuid` | `string` | A unique identifier for the event occurrence. |

#### Example: Create

```go
result, err := client.Basic(nil).Create(map[string]any{
    "eventName": "example_eventName",
    "properties": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Batch

Create an instance: `batch := client.Batch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inputs` | `[]any` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

#### Example: Create

```go
result, err := client.Batch(nil).Create(map[string]any{
    "inputs": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### EventDefinition

Create an instance: `eventDefinition := client.EventDefinition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `bool` | A boolean indicating whether the event type is archived. |
| `associations` | `[]any` | An array of association definitions related to the event type. |
| `comboEventRules` | `map[string]any` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `map[string]any` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `bool` | A boolean indicating whether default properties should be included. |
| `label` | `string` | A string representing the label of the event type. |
| `labels` | `map[string]any` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `[]any` | An array of property objects associated with the event type. |
| `propertyDefinitions` | `[]any` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `[]any` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: Load

```go
eventDefinition, err := client.EventDefinition(nil).Load(map[string]any{"id": "event_definition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventDefinition) // the loaded record
```

#### Example: Create

```go
result, err := client.EventDefinition(nil).Create(map[string]any{
    "archived": true,
    "associations": []any{},
    "comboEventRules": map[string]any{},
    "customMatchingId": map[string]any{},
    "fullyQualifiedName": "example_fullyQualifiedName",
    "id": "example_id",
    "includeDefaultProperties": true,
    "label": "example_label",
    "labels": map[string]any{},
    "name": "example_name",
    "objectTypeId": "example_objectTypeId",
    "properties": []any{},
    "propertyDefinitions": []any{},
    "propertyOrder": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### EventsCollectionResponseExternalUnifiedEvent

Create an instance: `eventsCollectionResponseExternalUnifiedEvent := client.EventsCollectionResponseExternalUnifiedEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventType` | `string` | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `string` | A unique identifier for the event. |
| `objectId` | `string` | The objectId of the object which did the event. |
| `objectType` | `string` | The objectType for the object which did the event. |
| `occurredAt` | `string` | An ISO 8601 timestamp when the event occurred. |
| `properties` | `map[string]any` | A key-value map of event-specific properties. |

#### Example: List

```go
eventsCollectionResponseExternalUnifiedEvents, err := client.EventsCollectionResponseExternalUnifiedEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventsCollectionResponseExternalUnifiedEvents) // the array of records
```


### EventsVisibleExternalEventTypeName

Create an instance: `eventsVisibleExternalEventTypeName := client.EventsVisibleExternalEventTypeName(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypes` | `[]any` | List of event type names. |

#### Example: List

```go
eventsVisibleExternalEventTypeNames, err := client.EventsVisibleExternalEventTypeName(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventsVisibleExternalEventTypeNames) // the array of records
```


### ManageEventDefinitionsCollectionResponseWithTotalExternal

Create an instance: `manageEventDefinitionsCollectionResponseWithTotalExternal := client.ManageEventDefinitionsCollectionResponseWithTotalExternal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `bool` | A boolean indicating whether the event type is archived. |
| `associations` | `[]any` | An array of association definitions related to the event type. |
| `comboEventRules` | `map[string]any` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `map[string]any` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `labels` | `map[string]any` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `[]any` | An array of property objects associated with the event type. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: List

```go
manageEventDefinitionsCollectionResponseWithTotalExternals, err := client.ManageEventDefinitionsCollectionResponseWithTotalExternal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(manageEventDefinitionsCollectionResponseWithTotalExternals) // the array of records
```


### ManageEventDefinitionsProperty

Create an instance: `manageEventDefinitionsProperty := client.ManageEventDefinitionsProperty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A string providing additional information about the property. |
| `displayOrder` | `int` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `bool` | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `string` |  |
| `label` | `string` | A string representing the display name of the property. |
| `name` | `string` | A string representing the unique name of the property. |
| `options` | `[]any` | An array of OptionInput objects that define the possible values for the property. |
| `type` | `string` | A string indicating the data type of the property. |

#### Example: Create

```go
result, err := client.ManageEventDefinitionsProperty(nil).Create(map[string]any{
    "event_name": "example_event_name",
    "label": "example_label",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/hubspot-events-sdk/go/
├── hubspot-events.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hubspot-events-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
eventscollectionresponseexternalunifiedevent := client.EventsCollectionResponseExternalUnifiedEvent(nil)
eventscollectionresponseexternalunifiedevent.List(nil, nil)

// eventscollectionresponseexternalunifiedevent.Data() now returns the eventscollectionresponseexternalunifiedevent data from the last list
// eventscollectionresponseexternalunifiedevent.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
