# HubspotEvents JavaScript SDK Reference

Complete API reference for the HubspotEvents JavaScript SDK.


## HubspotEventsSDK

### Constructor

```ts
new HubspotEventsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HubspotEventsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HubspotEventsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HubspotEventsSDK` instance in test mode.


### Instance Methods

#### `Basic(data?: object)`

Create a new `Basic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BasicEntity` instance.

#### `Batch(data?: object)`

Create a new `Batch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchEntity` instance.

#### `EventDefinition(data?: object)`

Create a new `EventDefinition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventDefinitionEntity` instance.

#### `EventsCollectionResponseExternalUnifiedEvent(data?: object)`

Create a new `EventsCollectionResponseExternalUnifiedEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventsCollectionResponseExternalUnifiedEventEntity` instance.

#### `EventsVisibleExternalEventTypeName(data?: object)`

Create a new `EventsVisibleExternalEventTypeName` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventsVisibleExternalEventTypeNameEntity` instance.

#### `ManageEventDefinitionsCollectionResponseWithTotalExternal(data?: object)`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` instance.

#### `ManageEventDefinitionsProperty(data?: object)`

Create a new `ManageEventDefinitionsProperty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ManageEventDefinitionsPropertyEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HubspotEventsSDK.test()`.

**Returns:** `HubspotEventsSDK` instance in test mode.


---

## BasicEntity

```ts
const basic = client.Basic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The visitor's email address. |
| `eventName` | `string` | Yes | The event's fully qualified name. |
| `objectId` | `string` | No | The ID of the record for which the event occurred (e.g., contact ID or visitor ID). |
| `occurredAt` | `string` | No | The time when this event occurred. |
| `properties` | `Object` | Yes | The event properties to update. |
| `utk` | `string` | No | The visitor's usertoken. |
| `uuid` | `string` | No | A unique identifier for the event occurrence. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Basic().create({
  eventName: 'example_eventName',
  properties: {},
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Basic().remove({ event_name: 'event_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BasicEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchEntity

```ts
const batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `inputs` | `Array` | Yes | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Batch().create({
  inputs: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventDefinitionEntity

```ts
const event_definition = client.EventDefinition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `boolean` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `Array` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `Object` | Yes |  |
| `createdAt` | `string` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `Object` | Yes |  |
| `description` | `string` | No | A string providing a description of the event type. |
| `detailTemplate` | `string` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | Yes | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `boolean` | Yes | A boolean indicating whether default properties should be included. |
| `label` | `string` | Yes | A string representing the label of the event type. |
| `labels` | `Object` | Yes |  |
| `name` | `string` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `string` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `Array` | Yes | An array of property objects associated with the event type. |
| `propertyDefinitions` | `Array` | Yes | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `Array` | Yes | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | No | An integer representing the ID of the user who last updated the event type. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EventDefinition().create({
  archived: true,
  associations: [],
  comboEventRules: {},
  customMatchingId: {},
  fullyQualifiedName: 'example_fullyQualifiedName',
  id: 'example_id',
  includeDefaultProperties: true,
  label: 'example_label',
  labels: {},
  name: 'example_name',
  objectTypeId: 'example_objectTypeId',
  properties: [],
  propertyDefinitions: [],
  propertyOrder: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventDefinition().load({ id: 'event_definition_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.EventDefinition().update({
  id: 'event_definition_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventDefinitionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventsCollectionResponseExternalUnifiedEventEntity

```ts
const events_collection_response_external_unified_event = client.EventsCollectionResponseExternalUnifiedEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventType` | `string` | Yes | The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events. |
| `id` | `string` | Yes | A unique identifier for the event. |
| `objectId` | `string` | Yes | The objectId of the object which did the event. |
| `objectType` | `string` | Yes | The objectType for the object which did the event. |
| `occurredAt` | `string` | Yes | An ISO 8601 timestamp when the event occurred. |
| `properties` | `Object` | Yes | A key-value map of event-specific properties. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventsCollectionResponseExternalUnifiedEvent().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventsCollectionResponseExternalUnifiedEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventsVisibleExternalEventTypeNameEntity

```ts
const events_visible_external_event_type_name = client.EventsVisibleExternalEventTypeName()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventTypes` | `Array` | Yes | List of event type names. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventsVisibleExternalEventTypeName().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventsVisibleExternalEventTypeNameEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ManageEventDefinitionsCollectionResponseWithTotalExternalEntity

```ts
const manage_event_definitions_collection_response_with_total_external = client.ManageEventDefinitionsCollectionResponseWithTotalExternal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived` | `boolean` | Yes | A boolean indicating whether the event type is archived. |
| `associations` | `Array` | Yes | An array of association definitions related to the event type. |
| `comboEventRules` | `Object` | Yes |  |
| `createdAt` | `string` | No | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | No | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `Object` | Yes |  |
| `description` | `string` | No | A string providing a description of the event type. |
| `detailTemplate` | `string` | No | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | Yes | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | No | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | Yes | A string representing the unique identifier of the event type. |
| `labels` | `Object` | Yes |  |
| `name` | `string` | Yes | A string representing the name of the event type. |
| `objectTypeId` | `string` | Yes | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | No | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | No | A string representing the ID of the primary object associated with the event type. |
| `properties` | `Array` | Yes | An array of property objects associated with the event type. |
| `trackingType` | `string` | No | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | No | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | No | An integer representing the ID of the user who last updated the event type. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ManageEventDefinitionsCollectionResponseWithTotalExternal().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ManageEventDefinitionsPropertyEntity

```ts
const manage_event_definitions_property = client.ManageEventDefinitionsProperty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A string providing additional information about the property. |
| `displayOrder` | `number` | No | For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top). |
| `hidden` | `boolean` | No | Controls whether or not this property is displayed on the record's activity timeline. |
| `id` | `string` | No |  |
| `label` | `string` | Yes | A string representing the display name of the property. |
| `name` | `string` | No | A string representing the unique name of the property. |
| `options` | `Array` | No | An array of OptionInput objects that define the possible values for the property. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ManageEventDefinitionsProperty().create({
  event_name: 'example_event_name',
  label: 'example_label',
  type: 'example_type',
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ManageEventDefinitionsProperty().update({
  event_definition_id: 'event_definition_id',
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ManageEventDefinitionsPropertyEntity` instance with the same client and
options.

#### `client()`

Return the parent `HubspotEventsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new HubspotEventsSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

