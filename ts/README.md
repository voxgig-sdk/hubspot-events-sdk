# HubspotEvents TypeScript SDK



The TypeScript SDK for the HubspotEvents API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Basic()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hubspot-events-sdk/releases](https://github.com/voxgig-sdk/hubspot-events-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { HubspotEventsSDK } from '@voxgig-sdk/hubspot-events'

const client = new HubspotEventsSDK({
  apikey: process.env.HUBSPOT_EVENTS_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created Basic ENTITY (.data() for the record)
const created = await client.Basic().create({
  eventName: 'example_eventName',
  properties: {},
})

// Remove
await client.Basic().remove({
  event_name: 'example_event_name',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const eventscollectionresponseexternalunifiedevents = await client.EventsCollectionResponseExternalUnifiedEvent().list()
  console.log(eventscollectionresponseexternalunifiedevents)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = HubspotEventsSDK.test()

const eventscollectionresponseexternalunifiedevent = await client.EventsCollectionResponseExternalUnifiedEvent().list()
// eventscollectionresponseexternalunifiedevent is the entity, populated with mock response data
// — call eventscollectionresponseexternalunifiedevent.data() for the record itself
console.log(eventscollectionresponseexternalunifiedevent)
```

You can also use the instance method:

```ts
const client = new HubspotEventsSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.EventsCollectionResponseExternalUnifiedEvent()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new HubspotEventsSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### HubspotEventsSDK

#### Constructor

```ts
new HubspotEventsSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Basic(data?)` | `BasicEntity` | Create a Basic entity instance. |
| `Batch(data?)` | `BatchEntity` | Create a Batch entity instance. |
| `EventDefinition(data?)` | `EventDefinitionEntity` | Create an EventDefinition entity instance. |
| `EventsCollectionResponseExternalUnifiedEvent(data?)` | `EventsCollectionResponseExternalUnifiedEventEntity` | Create an EventsCollectionResponseExternalUnifiedEvent entity instance. |
| `EventsVisibleExternalEventTypeName(data?)` | `EventsVisibleExternalEventTypeNameEntity` | Create an EventsVisibleExternalEventTypeName entity instance. |
| `ManageEventDefinitionsCollectionResponseWithTotalExternal(data?)` | `ManageEventDefinitionsCollectionResponseWithTotalExternalEntity` | Create a ManageEventDefinitionsCollectionResponseWithTotalExternal entity instance. |
| `ManageEventDefinitionsProperty(data?)` | `ManageEventDefinitionsPropertyEntity` | Create a ManageEventDefinitionsProperty entity instance. |
| `tester(testopts?, sdkopts?)` | `HubspotEventsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HubspotEventsSDK.test(testopts?, sdkopts?)` | `HubspotEventsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): HubspotEventsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create, remove.

API path: `/events/2026-09/send`

#### Batch

| Field | Description |
| --- | --- |
| `inputs` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

Operations: create.

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

Operations: create, load, update.

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

Operations: list.

API path: `/events/event-occurrences/2026-09`

#### EventsVisibleExternalEventTypeName

| Field | Description |
| --- | --- |
| `eventTypes` | List of event type names. |

Operations: list.

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

Operations: list.

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

Operations: create, update.

API path: `/events/2026-09/event-definitions/{eventName}/property`



## Entities


### Basic

Create an instance: `const basic = client.Basic()`

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
| `properties` | `Record<string, any>` | The event properties to update. |
| `utk` | `string` | The visitor's usertoken. |
| `uuid` | `string` | A unique identifier for the event occurrence. |

#### Example: Create

```ts
const basic = await client.Basic().create({
  eventName: 'example_eventName',
  properties: {},
})
```


### Batch

Create an instance: `const batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inputs` | `any[]` | An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. |

#### Example: Create

```ts
const batch = await client.Batch().create({
  inputs: [],
})
```


### EventDefinition

Create an instance: `const event_definition = client.EventDefinition()`

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
| `associations` | `any[]` | An array of association definitions related to the event type. |
| `comboEventRules` | `Record<string, any>` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `Record<string, any>` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `includeDefaultProperties` | `boolean` | A boolean indicating whether default properties should be included. |
| `label` | `string` | A string representing the label of the event type. |
| `labels` | `Record<string, any>` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `any[]` | An array of property objects associated with the event type. |
| `propertyDefinitions` | `any[]` | An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object. |
| `propertyOrder` | `any[]` | Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | An integer representing the ID of the user who last updated the event type. |

#### Example: Load

```ts
const event_definition = await client.EventDefinition().load({ id: 'event_definition_id' })
```

#### Example: Create

```ts
const event_definition = await client.EventDefinition().create({
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


### EventsCollectionResponseExternalUnifiedEvent

Create an instance: `const events_collection_response_external_unified_event = client.EventsCollectionResponseExternalUnifiedEvent()`

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
| `properties` | `Record<string, any>` | A key-value map of event-specific properties. |

#### Example: List

```ts
const events_collection_response_external_unified_events = await client.EventsCollectionResponseExternalUnifiedEvent().list()
```


### EventsVisibleExternalEventTypeName

Create an instance: `const events_visible_external_event_type_name = client.EventsVisibleExternalEventTypeName()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventTypes` | `any[]` | List of event type names. |

#### Example: List

```ts
const events_visible_external_event_type_names = await client.EventsVisibleExternalEventTypeName().list()
```


### ManageEventDefinitionsCollectionResponseWithTotalExternal

Create an instance: `const manage_event_definitions_collection_response_with_total_external = client.ManageEventDefinitionsCollectionResponseWithTotalExternal()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived` | `boolean` | A boolean indicating whether the event type is archived. |
| `associations` | `any[]` | An array of association definitions related to the event type. |
| `comboEventRules` | `Record<string, any>` |  |
| `createdAt` | `string` | A string representing the date and time when the event type was created, in ISO 8601 format. |
| `createdUserId` | `number` | An integer representing the ID of the user who created the event type. |
| `customMatchingId` | `Record<string, any>` |  |
| `description` | `string` | A string providing a description of the event type. |
| `detailTemplate` | `string` | The rendering template for the body of the CRM timeline activity card. |
| `fullyQualifiedName` | `string` | A string representing the fully qualified name of the event type. |
| `headerTemplate` | `string` | The rendering template for the header of the CRM timeline activity card. |
| `id` | `string` | A string representing the unique identifier of the event type. |
| `labels` | `Record<string, any>` |  |
| `name` | `string` | A string representing the name of the event type. |
| `objectTypeId` | `string` | A string representing the object type ID associated with the event type. |
| `primaryObject` | `string` | A string representing the primary object associated with the event type. |
| `primaryObjectId` | `string` | A string representing the ID of the primary object associated with the event type. |
| `properties` | `any[]` | An array of property objects associated with the event type. |
| `trackingType` | `string` | A string indicating the tracking type of the event. |
| `updatedAt` | `string` | A string representing the date and time when the event type was last updated, in ISO 8601 format. |
| `updatedUserId` | `number` | An integer representing the ID of the user who last updated the event type. |

#### Example: List

```ts
const manage_event_definitions_collection_response_with_total_externals = await client.ManageEventDefinitionsCollectionResponseWithTotalExternal().list()
```


### ManageEventDefinitionsProperty

Create an instance: `const manage_event_definitions_property = client.ManageEventDefinitionsProperty()`

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
| `options` | `any[]` | An array of OptionInput objects that define the possible values for the property. |
| `type` | `string` | A string indicating the data type of the property. |

#### Example: Create

```ts
const manage_event_definitions_property = await client.ManageEventDefinitionsProperty().create({
  event_name: 'example_event_name',
  label: 'example_label',
  type: 'example_type',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
hubspot-events/
├── src/
│   ├── HubspotEventsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HubspotEventsSDK } from '@voxgig-sdk/hubspot-events'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const eventscollectionresponseexternalunifiedevent = client.EventsCollectionResponseExternalUnifiedEvent()
await eventscollectionresponseexternalunifiedevent.list()

// eventscollectionresponseexternalunifiedevent.data() now returns the eventscollectionresponseexternalunifiedevent data from the last `list`
// eventscollectionresponseexternalunifiedevent.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
