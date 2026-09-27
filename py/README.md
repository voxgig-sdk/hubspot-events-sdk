# HubspotEvents Python SDK



The Python SDK for the HubspotEvents API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Basic()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hubspot-events-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from hubspotevents_sdk import HubspotEventsSDK

client = HubspotEventsSDK({
    "apikey": os.environ.get("HUBSPOT_EVENTS_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Basic().create({"eventName": "example_eventName", "properties": {}})

# Remove
client.Basic().remove({"event_name": "example_event_name"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    eventscollectionresponseexternalunifiedevents = client.EventsCollectionResponseExternalUnifiedEvent().list()
    print(eventscollectionresponseexternalunifiedevents)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = HubspotEventsSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
eventscollectionresponseexternalunifiedevent = client.EventsCollectionResponseExternalUnifiedEvent().list()
# eventscollectionresponseexternalunifiedevent contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = HubspotEventsSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### HubspotEventsSDK

```python
from hubspotevents_sdk import HubspotEventsSDK

client = HubspotEventsSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = HubspotEventsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### HubspotEventsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Basic` | `(data) -> BasicEntity` | Create a Basic entity instance. |
| `Batch` | `(data) -> BatchEntity` | Create a Batch entity instance. |
| `EventDefinition` | `(data) -> EventDefinitionEntity` | Create an EventDefinition entity instance. |
| `EventsCollectionResponseExternalUnifiedEvent` | `(data) -> EventsCollectionResponseExternalUnifiedEventEntity` | Create an EventsCollectionResponseExternalUnifiedEvent entity instance. |
| `EventsVisibleExternalEventTypeName` | `(data) -> EventsVisibleExternalEventTypeNameEntity` | Create an EventsVisibleExternalEventTypeName entity instance. |
| `ManageEventDefinitionsCollectionResponseWithTotalExternal` | `(data) -> ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` | Create a ManageEventDefinitionsCollectionResponseWithTotalExternal entity instance. |
| `Property` | `(data) -> PropertyEntity` | Create a Property entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

#### Property

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

Create an instance: `basic = client.Basic()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | The visitor's email address. |
| `eventName` | `str` | The event's fully qualified name. |
| `objectId` | `str` | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `str` | The time when this event occurred. |
| `properties` | `dict` | The event properties to update. |
| `utk` | `str` | The visitor's usertoken. |
| `uuid` | `str` | A unique identifier for the event occurrence. |

#### Example: Create

```python
basic = client.Basic().create({
    "eventName": "example_eventName",  # str
    "properties": {},  # dict
})
```


### Batch

Create an instance: `batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inputs` | `list` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

#### Example: Create

```python
batch = client.Batch().create({
    "inputs": [],  # list
})
```


### EventDefinition

Create an instance: `event_definition = client.EventDefinition()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `bool` | A boolean indicating whether the event type is archived. |
| `associations` | `list` | An array of association definitions related to the event type. |
| `comboEventRules` | `dict` |  |
| `createdAt` | `str` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `dict` |  |
| `description` | `str` | A string providing a description of the event type. |
| `detailTemplate` | `str` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `str` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `str` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `str` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `bool` | A boolean indicating whether default properties should be included. |
| `label` | `str` | A string representing the label of the event type. |
| `labels` | `dict` |  |
| `name` | `str` | A string representing the name of the event type. |
| `objectTypeId` | `str` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `str` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `str` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `list` | An array of property objects associated with the event type. |
| `propertyDefinitions` | `list` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `list` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `str` | A string indicating the tracking type of the event. |
| `updatedAt` | `str` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: Load

```python
event_definition = client.EventDefinition().load({"id": "event_definition_id"})
```

#### Example: Create

```python
event_definition = client.EventDefinition().create({
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


### EventsCollectionResponseExternalUnifiedEvent

Create an instance: `events_collection_response_external_unified_event = client.EventsCollectionResponseExternalUnifiedEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventType` | `str` | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `str` | A unique identifier for the event. |
| `objectId` | `str` | The objectId of the object which did the event. |
| `objectType` | `str` | The objectType for the object which did the event. |
| `occurredAt` | `str` | An ISO 8601 timestamp when the event occurred. |
| `properties` | `dict` | A key-value map of event-specific properties. |

#### Example: List

```python
events_collection_response_external_unified_events = client.EventsCollectionResponseExternalUnifiedEvent().list()
```


### EventsVisibleExternalEventTypeName

Create an instance: `events_visible_external_event_type_name = client.EventsVisibleExternalEventTypeName()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypes` | `list` | List of event type names. |

#### Example: List

```python
events_visible_external_event_type_names = client.EventsVisibleExternalEventTypeName().list()
```


### ManageEventDefinitionsCollectionResponseWithTotalExternal

Create an instance: `manage_event_definitions_collection_response_with_total_external = client.ManageEventDefinitionsCollectionResponseWithTotalExternal()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `bool` | A boolean indicating whether the event type is archived. |
| `associations` | `list` | An array of association definitions related to the event type. |
| `comboEventRules` | `dict` |  |
| `createdAt` | `str` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `dict` |  |
| `description` | `str` | A string providing a description of the event type. |
| `detailTemplate` | `str` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `str` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `str` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `str` | A string representing the unique identifier of the event type. |
| `labels` | `dict` |  |
| `name` | `str` | A string representing the name of the event type. |
| `objectTypeId` | `str` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `str` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `str` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `list` | An array of property objects associated with the event type. |
| `trackingType` | `str` | A string indicating the tracking type of the event. |
| `updatedAt` | `str` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: List

```python
manage_event_definitions_collection_response_with_total_externals = client.ManageEventDefinitionsCollectionResponseWithTotalExternal().list()
```


### Property

Create an instance: `property = client.Property()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | A string providing additional information about the property. |
| `displayOrder` | `int` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `bool` | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `str` |  |
| `label` | `str` | A string representing the display name of the property. |
| `name` | `str` | A string representing the unique name of the property. |
| `options` | `list` | An array of OptionInput objects that define the possible values for the property. |
| `type` | `str` | A string indicating the data type of the property. |

#### Example: Create

```python
property = client.Property().create({
    "event_name": "example_event_name",  # str
    "label": "example_label",  # str
    "type": "example_type",  # str
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
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

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

Rate limiting.

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

Retry.

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

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── hubspotevents_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`hubspotevents_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
eventscollectionresponseexternalunifiedevent = client.EventsCollectionResponseExternalUnifiedEvent()
eventscollectionresponseexternalunifiedevent.list()

# eventscollectionresponseexternalunifiedevent.data_get() now returns the eventscollectionresponseexternalunifiedevent data from the last list
# eventscollectionresponseexternalunifiedevent.match_get() returns the last match criteria
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
