# HubspotEvents Python SDK Reference

Complete API reference for the HubspotEvents Python SDK.


## HubspotEventsSDK

### Constructor

```python
from hubspotevents_sdk import HubspotEventsSDK

client = HubspotEventsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HubspotEventsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HubspotEventsSDK.test()
```


### Instance Methods

#### `Basic(data=None)`

Create a new `BasicEntity` instance. Pass `None` for no initial data.

#### `Batch(data=None)`

Create a new `BatchEntity` instance. Pass `None` for no initial data.

#### `EventDefinition(data=None)`

Create a new `EventDefinitionEntity` instance. Pass `None` for no initial data.

#### `EventsCollectionResponseExternalUnifiedEvent(data=None)`

Create a new `EventsCollectionResponseExternalUnifiedEventEntity` instance. Pass `None` for no initial data.

#### `EventsVisibleExternalEventTypeName(data=None)`

Create a new `EventsVisibleExternalEventTypeNameEntity` instance. Pass `None` for no initial data.

#### `ManageEventDefinitionsCollectionResponseWithTotalExternal(data=None)`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` instance. Pass `None` for no initial data.

#### `ManageEventDefinitionsProperty(data=None)`

Create a new `ManageEventDefinitionsPropertyEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BasicEntity

```python
basic = client.Basic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No | The visitor's email address. |
| `eventName` | `str` | Yes | The event's fully qualified name. |
| `objectId` | `str` | No | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `str` | No | The time when this event occurred. |
| `properties` | `dict` | Yes | The event properties to update. |
| `utk` | `str` | No | The visitor's usertoken. |
| `uuid` | `str` | No | A unique identifier for the event occurrence. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Basic().create({
    "eventName": "example_eventName",  # str
    "properties": {},  # dict
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Basic().remove({"event_name": "event_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BasicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchEntity

```python
batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `inputs` | `list` | Yes | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Batch().create({
    "inputs": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventDefinitionEntity

```python
event_definition = client.EventDefinition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `bool` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `list` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `dict` | Yes |  |
| `createdAt` | `str` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `dict` | Yes |  |
| `description` | `str` | No | A string providing a description of the event type. |
| `detailTemplate` | `str` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `str` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `str` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `str` | Yes | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `bool` | Yes | A boolean indicating whether default properties should be included. |
| `label` | `str` | Yes | A string representing the label of the event type. |
| `labels` | `dict` | Yes |  |
| `name` | `str` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `str` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `str` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `str` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `list` | Yes | An array of property objects associated with the event type. |
| `propertyDefinitions` | `list` | Yes | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `list` | Yes | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `str` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `str` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EventDefinition().create({
    "archived": True,  # bool
    "associations": [],  # list
    "comboEventRules": {},  # dict
    "customMatchingId": {},  # dict
    "fullyQualifiedName": "example_fullyQualifiedName",  # str
    "id": "example_id",  # str
    "includeDefaultProperties": True,  # bool
    "label": "example_label",  # str
    "labels": {},  # dict
    "name": "example_name",  # str
    "objectTypeId": "example_objectTypeId",  # str
    "properties": [],  # list
    "propertyDefinitions": [],  # list
    "propertyOrder": [],  # list
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EventDefinition().load({"id": "event_definition_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.EventDefinition().update({
    "id": "event_definition_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventDefinitionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventsCollectionResponseExternalUnifiedEventEntity

```python
events_collection_response_external_unified_event = client.EventsCollectionResponseExternalUnifiedEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventType` | `str` | Yes | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `str` | Yes | A unique identifier for the event. |
| `objectId` | `str` | Yes | The objectId of the object which did the event. |
| `objectType` | `str` | Yes | The objectType for the object which did the event. |
| `occurredAt` | `str` | Yes | An ISO 8601 timestamp when the event occurred. |
| `properties` | `dict` | Yes | A key-value map of event-specific properties. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EventsCollectionResponseExternalUnifiedEvent().list()
for events_collection_response_external_unified_event in results:
    print(events_collection_response_external_unified_event)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsCollectionResponseExternalUnifiedEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventsVisibleExternalEventTypeNameEntity

```python
events_visible_external_event_type_name = client.EventsVisibleExternalEventTypeName()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventTypes` | `list` | Yes | List of event type names. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EventsVisibleExternalEventTypeName().list()
for events_visible_external_event_type_name in results:
    print(events_visible_external_event_type_name)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsVisibleExternalEventTypeNameEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ManageEventDefinitionsCollectionResponseWithTotalExternalEntity

```python
manage_event_definitions_collection_response_with_total_external = client.ManageEventDefinitionsCollectionResponseWithTotalExternal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `bool` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `list` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `dict` | Yes |  |
| `createdAt` | `str` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `dict` | Yes |  |
| `description` | `str` | No | A string providing a description of the event type. |
| `detailTemplate` | `str` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `str` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `str` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `str` | Yes | A string representing the unique identifier of the event type. |
| `labels` | `dict` | Yes |  |
| `name` | `str` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `str` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `str` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `str` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `list` | Yes | An array of property objects associated with the event type. |
| `trackingType` | `str` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `str` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | No | An integer representing the ID of the user who last updated the event type. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ManageEventDefinitionsCollectionResponseWithTotalExternal().list()
for manage_event_definitions_collection_response_with_total_external in results:
    print(manage_event_definitions_collection_response_with_total_external)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ManageEventDefinitionsPropertyEntity

```python
manage_event_definitions_property = client.ManageEventDefinitionsProperty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | A string providing additional information about the property. |
| `displayOrder` | `int` | No | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `bool` | No | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `str` | No |  |
| `label` | `str` | Yes | A string representing the display name of the property. |
| `name` | `str` | No | A string representing the unique name of the property. |
| `options` | `list` | No | An array of OptionInput objects that define the possible values for the property. |
| `type` | `str` | Yes | A string indicating the data type of the property. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ManageEventDefinitionsProperty().create({
    "event_name": "example_event_name",  # str
    "label": "example_label",  # str
    "type": "example_type",  # str
})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ManageEventDefinitionsProperty().update({
    "event_definition_id": "event_definition_id",
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManageEventDefinitionsPropertyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```python
client = HubspotEventsSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

Request/response capture ring buffer for debugging.

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

Idempotency keys for safe retries of mutating operations.

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

Statistics capture: per-operation counters and latency.

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

Pagination signals for list operations.

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

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

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

Per-request timeout with transport abort.

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

