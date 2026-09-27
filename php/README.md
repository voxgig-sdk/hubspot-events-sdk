# HubspotEvents PHP SDK



The PHP SDK for the HubspotEvents API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Basic()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hubspot-events-sdk/releases](https://github.com/voxgig-sdk/hubspot-events-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hubspotevents_sdk.php';

$client = new HubspotEventsSDK([
    "apikey" => getenv("HUBSPOT_EVENTS_APIKEY"),
]);
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Basic record.
$created = $client->Basic()->create(["eventName" => "example_eventName", "properties" => []]);

// Remove
$client->Basic()->remove(["event_name" => "example_event_name"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $eventscollectionresponseexternalunifiedevents = $client->EventsCollectionResponseExternalUnifiedEvent()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = HubspotEventsSDK::test([
    "entity" => ["eventdefinition" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$eventdefinition = $client->EventDefinition()->load(["id" => "test01"]);
print_r($eventdefinition->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new HubspotEventsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HUBSPOT_EVENTS_TEST_LIVE=TRUE
HUBSPOT_EVENTS_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### HubspotEventsSDK

```php
require_once 'hubspotevents_sdk.php';
$client = new HubspotEventsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = HubspotEventsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### HubspotEventsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Basic` | `($data): BasicEntity` | Create a Basic entity instance. |
| `Batch` | `($data): BatchEntity` | Create a Batch entity instance. |
| `EventDefinition` | `($data): EventDefinitionEntity` | Create an EventDefinition entity instance. |
| `EventsCollectionResponseExternalUnifiedEvent` | `($data): EventsCollectionResponseExternalUnifiedEventEntity` | Create an EventsCollectionResponseExternalUnifiedEvent entity instance. |
| `EventsVisibleExternalEventTypeName` | `($data): EventsVisibleExternalEventTypeNameEntity` | Create an EventsVisibleExternalEventTypeName entity instance. |
| `ManageEventDefinitionsCollectionResponseWithTotalExternal` | `($data): ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` | Create a ManageEventDefinitionsCollectionResponseWithTotalExternal entity instance. |
| `Property` | `($data): PropertyEntity` | Create a Property entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$basic = $client->Basic();`

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
| `properties` | `array` | The event properties to update. |
| `utk` | `string` | The visitor's usertoken. |
| `uuid` | `string` | A unique identifier for the event occurrence. |

#### Example: Create

```php
$basic = $client->Basic()->create([
    "eventName" => null, // string
    "properties" => null, // array
]);
```


### Batch

Create an instance: `$batch = $client->Batch();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inputs` | `array` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

#### Example: Create

```php
$batch = $client->Batch()->create([
    "inputs" => null, // array
]);
```


### EventDefinition

Create an instance: `$event_definition = $client->EventDefinition();`

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
| `associations` | `array` | An array of association definitions related to the event type. |
| `comboEventRules` | `array` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `array` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `bool` | A boolean indicating whether default properties should be included. |
| `label` | `string` | A string representing the label of the event type. |
| `labels` | `array` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `array` | An array of property objects associated with the event type. |
| `propertyDefinitions` | `array` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `array` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EventDefinition record (throws on error).
$event_definition = $client->EventDefinition()->load(["id" => "event_definition_id"]);
```

#### Example: Create

```php
$event_definition = $client->EventDefinition()->create([
    "archived" => null, // bool
    "associations" => null, // array
    "comboEventRules" => null, // array
    "customMatchingId" => null, // array
    "fullyQualifiedName" => null, // string
    "id" => null, // string
    "includeDefaultProperties" => null, // bool
    "label" => null, // string
    "labels" => null, // array
    "name" => null, // string
    "objectTypeId" => null, // string
    "properties" => null, // array
    "propertyDefinitions" => null, // array
    "propertyOrder" => null, // array
]);
```


### EventsCollectionResponseExternalUnifiedEvent

Create an instance: `$events_collection_response_external_unified_event = $client->EventsCollectionResponseExternalUnifiedEvent();`

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
| `properties` | `array` | A key-value map of event-specific properties. |

#### Example: List

```php
// list() returns an array of EventsCollectionResponseExternalUnifiedEvent records (throws on error).
$events_collection_response_external_unified_events = $client->EventsCollectionResponseExternalUnifiedEvent()->list();
```


### EventsVisibleExternalEventTypeName

Create an instance: `$events_visible_external_event_type_name = $client->EventsVisibleExternalEventTypeName();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypes` | `array` | List of event type names. |

#### Example: List

```php
// list() returns an array of EventsVisibleExternalEventTypeName records (throws on error).
$events_visible_external_event_type_names = $client->EventsVisibleExternalEventTypeName()->list();
```


### ManageEventDefinitionsCollectionResponseWithTotalExternal

Create an instance: `$manage_event_definitions_collection_response_with_total_external = $client->ManageEventDefinitionsCollectionResponseWithTotalExternal();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `bool` | A boolean indicating whether the event type is archived. |
| `associations` | `array` | An array of association definitions related to the event type. |
| `comboEventRules` | `array` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `int` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `array` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `labels` | `array` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `array` | An array of property objects associated with the event type. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `int` | An integer representing the ID of the user who last updated the event type. |

#### Example: List

```php
// list() returns an array of ManageEventDefinitionsCollectionResponseWithTotalExternal records (throws on error).
$manage_event_definitions_collection_response_with_total_externals = $client->ManageEventDefinitionsCollectionResponseWithTotalExternal()->list();
```


### Property

Create an instance: `$property = $client->Property();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A string providing additional information about the property. |
| `displayOrder` | `int` | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `bool` | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `string` |  |
| `label` | `string` | A string representing the display name of the property. |
| `name` | `string` | A string representing the unique name of the property. |
| `options` | `array` | An array of OptionInput objects that define the possible values for the property. |
| `type` | `string` | A string indicating the data type of the property. |

#### Example: Create

```php
$property = $client->Property()->create([
    "event_name" => null, // string
    "label" => null, // string
    "type" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hubspotevents_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hubspotevents_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$eventscollectionresponseexternalunifiedevent = $client->EventsCollectionResponseExternalUnifiedEvent();
$eventscollectionresponseexternalunifiedevent->list();

// $eventscollectionresponseexternalunifiedevent->data_get() now returns the eventscollectionresponseexternalunifiedevent data from the last list
// $eventscollectionresponseexternalunifiedevent->match_get() returns the last match criteria
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
