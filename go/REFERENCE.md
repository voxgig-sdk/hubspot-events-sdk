# HubspotEvents Golang SDK Reference

Complete API reference for the HubspotEvents Golang SDK.


## HubspotEventsSDK

### Constructor

```go
func NewHubspotEventsSDK(options map[string]any) *HubspotEventsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *HubspotEventsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *HubspotEventsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Basic(data map[string]any) HubspotEventsEntity`

Create a new `Basic` entity instance. Pass `nil` for no initial data.

#### `Batch(data map[string]any) HubspotEventsEntity`

Create a new `Batch` entity instance. Pass `nil` for no initial data.

#### `EventDefinition(data map[string]any) HubspotEventsEntity`

Create a new `EventDefinition` entity instance. Pass `nil` for no initial data.

#### `EventsCollectionResponseExternalUnifiedEvent(data map[string]any) HubspotEventsEntity`

Create a new `EventsCollectionResponseExternalUnifiedEvent` entity instance. Pass `nil` for no initial data.

#### `EventsVisibleExternalEventTypeName(data map[string]any) HubspotEventsEntity`

Create a new `EventsVisibleExternalEventTypeName` entity instance. Pass `nil` for no initial data.

#### `ManageEventDefinitionsCollectionResponseWithTotalExternal(data map[string]any) HubspotEventsEntity`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternal` entity instance. Pass `nil` for no initial data.

#### `Property(data map[string]any) HubspotEventsEntity`

Create a new `Property` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BasicEntity

```go
basic := client.Basic(nil)
fmt.Println(basic.GetName()) // "basic"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The visitor's email address. |
| `eventName` | `string` | Yes | The event's fully qualified name. |
| `objectId` | `string` | No | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `string` | No | The time when this event occurred. |
| `properties` | `map[string]any` | Yes | The event properties to update. |
| `utk` | `string` | No | The visitor's usertoken. |
| `uuid` | `string` | No | A unique identifier for the event occurrence. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Basic(nil).Remove(map[string]any{"event_name": "event_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BasicEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BatchEntity

```go
batch := client.Batch(nil)
fmt.Println(batch.GetName()) // "batch"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `inputs` | `[]any` | Yes | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Batch(nil).Create(map[string]any{
    "inputs": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BatchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventDefinitionEntity

```go
eventDefinition := client.EventDefinition(nil)
fmt.Println(eventDefinition.GetName()) // "event_definition"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `bool` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `[]any` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `map[string]any` | Yes |  |
| `createdAt` | `string` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `map[string]any` | Yes |  |
| `description` | `string` | No | A string providing a description of the event type. |
| `detailTemplate` | `string` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | Yes | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `bool` | Yes | A boolean indicating whether default properties should be included. |
| `label` | `string` | Yes | A string representing the label of the event type. |
| `labels` | `map[string]any` | Yes |  |
| `name` | `string` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `string` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `[]any` | Yes | An array of property objects associated with the event type. |
| `propertyDefinitions` | `[]any` | Yes | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `[]any` | Yes | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | No | An integer representing the ID of the user who last updated the event type. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `archived` | - | - | - |
| `associations` | - | - | - |
| `comboEventRules` | - | - | - |
| `createdAt` | - | - | - |
| `createdUserId` | - | - | - |
| `customMatchingId` | - | - | - |
| `description` | - | - | - |
| `detailTemplate` | - | - | - |
| `fullyQualifiedName` | - | - | - |
| `headerTemplate` | - | - | - |
| `id` | - | - | - |
| `includeDefaultProperties` | - | - | - |
| `label` | - | - | Yes |
| `labels` | - | - | - |
| `name` | - | Yes | - |
| `objectTypeId` | - | - | - |
| `primaryObject` | - | - | - |
| `primaryObjectId` | - | - | - |
| `properties` | - | - | - |
| `propertyDefinitions` | - | - | - |
| `propertyOrder` | - | - | - |
| `trackingType` | - | - | - |
| `updatedAt` | - | - | - |
| `updatedUserId` | - | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EventDefinition(nil).Load(map[string]any{"id": "event_definition_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.EventDefinition(nil).Update(map[string]any{
    "id": "event_definition_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventDefinitionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventsCollectionResponseExternalUnifiedEventEntity

```go
eventsCollectionResponseExternalUnifiedEvent := client.EventsCollectionResponseExternalUnifiedEvent(nil)
fmt.Println(eventsCollectionResponseExternalUnifiedEvent.GetName()) // "events_collection_response_external_unified_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventType` | `string` | Yes | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `string` | Yes | A unique identifier for the event. |
| `objectId` | `string` | Yes | The objectId of the object which did the event. |
| `objectType` | `string` | Yes | The objectType for the object which did the event. |
| `occurredAt` | `string` | Yes | An ISO 8601 timestamp when the event occurred. |
| `properties` | `map[string]any` | Yes | A key-value map of event-specific properties. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EventsCollectionResponseExternalUnifiedEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventsCollectionResponseExternalUnifiedEventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventsVisibleExternalEventTypeNameEntity

```go
eventsVisibleExternalEventTypeName := client.EventsVisibleExternalEventTypeName(nil)
fmt.Println(eventsVisibleExternalEventTypeName.GetName()) // "events_visible_external_event_type_name"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventTypes` | `[]any` | Yes | List of event type names. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EventsVisibleExternalEventTypeName(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventsVisibleExternalEventTypeNameEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ManageEventDefinitionsCollectionResponseWithTotalExternalEntity

```go
manageEventDefinitionsCollectionResponseWithTotalExternal := client.ManageEventDefinitionsCollectionResponseWithTotalExternal(nil)
fmt.Println(manageEventDefinitionsCollectionResponseWithTotalExternal.GetName()) // "manage_event_definitions_collection_response_with_total_external"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `bool` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `[]any` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `map[string]any` | Yes |  |
| `createdAt` | `string` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `map[string]any` | Yes |  |
| `description` | `string` | No | A string providing a description of the event type. |
| `detailTemplate` | `string` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | Yes | A string representing the unique identifier of the event type. |
| `labels` | `map[string]any` | Yes |  |
| `name` | `string` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `string` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `[]any` | Yes | An array of property objects associated with the event type. |
| `trackingType` | `string` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | No | An integer representing the ID of the user who last updated the event type. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ManageEventDefinitionsCollectionResponseWithTotalExternal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PropertyEntity

```go
property := client.Property(nil)
fmt.Println(property.GetName()) // "property"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A string providing additional information about the property. |
| `displayOrder` | `int` | No | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `bool` | No | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `string` | No |  |
| `label` | `string` | Yes | A string representing the display name of the property. |
| `name` | `string` | No | A string representing the unique name of the property. |
| `options` | `[]any` | No | An array of OptionInput objects that define the possible values for the property. |
| `type` | `string` | Yes | A string indicating the data type of the property. |

### Field Usage by Operation

| Field | create | update |
| --- | --- | --- |
| `description` | - | - |
| `displayOrder` | - | - |
| `hidden` | - | - |
| `id` | - | - |
| `label` | - | Yes |
| `name` | - | - |
| `options` | - | - |
| `type` | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Property(nil).Create(map[string]any{
    "event_name": "example_event_name",
    "label": "example_label",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Property(nil).Update(map[string]any{
    "event_definition_id": "event_definition_id",
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PropertyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewHubspotEventsSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

