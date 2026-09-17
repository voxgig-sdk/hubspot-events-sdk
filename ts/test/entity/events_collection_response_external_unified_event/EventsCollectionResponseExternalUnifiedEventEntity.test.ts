

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HubspotEventsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EventsCollectionResponseExternalUnifiedEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotEventsSDK.test()
    const ent = testsdk.EventsCollectionResponseExternalUnifiedEvent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUBSPOT_EVENTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'events_collection_response_external_unified_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"eventType","req":true,"short":"The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":true,"short":"A unique identifier for the event.","type":"`$STRING`","index$":1},{"active":true,"name":"objectId","req":true,"short":"The objectId of the object which did the event.","type":"`$STRING`","index$":2},{"active":true,"name":"objectType","req":true,"short":"The objectType for the object which did the event.","type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"occurredAt","req":true,"short":"An ISO 8601 timestamp when the event occurred.","type":"`$STRING`","index$":4},{"active":true,"name":"properties","req":true,"short":"A key-value map of event-specific properties.","type":"`$OBJECT`","index$":5}],"id":{"field":"id","name":"id"},"name":"events_collection_response_external_unified_event","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":null,"kind":"query","name":"after","orig":"after","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":null,"kind":"query","name":"before","orig":"before","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":null,"kind":"query","name":"event_type","orig":"event_type","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":null,"kind":"query","name":"id","orig":"id","reqd":false,"type":"`$ARRAY`","index$":3},{"active":true,"example":null,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"example":null,"kind":"query","name":"object_id","orig":"object_id","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"example":null,"kind":"query","name":"object_property_{propname}","orig":"object_property_{propname}","reqd":false,"type":"`$OBJECT`","index$":6},{"active":true,"example":null,"kind":"query","name":"object_type","orig":"object_type","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"example":null,"kind":"query","name":"occurred_after","orig":"occurred_after","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"example":null,"kind":"query","name":"occurred_before","orig":"occurred_before","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"example":null,"kind":"query","name":"property","orig":"property","reqd":false,"type":"`$ARRAY`","index$":10},{"active":true,"example":null,"kind":"query","name":"property_{propname}","orig":"property_{propname}","reqd":false,"type":"`$OBJECT`","index$":11},{"active":true,"example":null,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$ARRAY`","index$":12}]},"contract":{"id":"GET /events/event-occurrences/2026-09","json":"{\"operationId\":\"get-/events/event-occurrences/2026-09_/events/event-occurrences/2026-03\",\"parameters\":[{\"description\":\"The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.\",\"explode\":true,\"in\":\"query\",\"name\":\"after\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"A cursor token for pagination. Use the value from the previous response's paging.prev.before field.\",\"explode\":true,\"in\":\"query\",\"name\":\"before\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"The type of events to retrieve.\",\"explode\":true,\"in\":\"query\",\"name\":\"eventType\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"An array of event IDs to retrieve.\",\"explode\":true,\"in\":\"query\",\"name\":\"id\",\"required\":false,\"schema\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"The maximum number of results to display per page.\",\"explode\":true,\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"example\":null,\"format\":\"int32\",\"type\":\"integer\"},\"style\":\"form\"},{\"description\":\"The unique identifier of the object associated with the events.\",\"explode\":true,\"in\":\"query\",\"name\":\"objectId\",\"required\":false,\"schema\":{\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"style\":\"form\"},{\"description\":\"Filter events based on specific object properties.\",\"explode\":true,\"in\":\"query\",\"name\":\"objectProperty.{propname}\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"object\"},\"style\":\"form\"},{\"description\":\"The type of object associated with the events.\",\"explode\":true,\"in\":\"query\",\"name\":\"objectType\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"Filter events that occurred after this date-time.\",\"explode\":true,\"in\":\"query\",\"name\":\"occurredAfter\",\"required\":false,\"schema\":{\"example\":null,\"format\":\"date-time\",\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"Filter events that occurred before this date-time.\",\"explode\":true,\"in\":\"query\",\"name\":\"occurredBefore\",\"required\":false,\"schema\":{\"example\":null,\"format\":\"date-time\",\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"An array of property names to include in the response.\",\"explode\":true,\"in\":\"query\",\"name\":\"properties\",\"required\":false,\"schema\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Filter events based on specific event properties.\",\"explode\":true,\"in\":\"query\",\"name\":\"property.{propname}\",\"required\":false,\"schema\":{\"example\":null,\"type\":\"object\"},\"style\":\"form\"},{\"description\":\"An array of fields to sort the results by.\",\"explode\":true,\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"paging\":{\"description\":\"Represents the pagination information for navigating through a list of results in the API. It provides details on how to access the previous or next set of results.\",\"example\":null,\"properties\":{\"next\":{\"description\":\"Specifies the paging information needed to retrieve the next set of results in a paginated API response\",\"example\":null,\"properties\":{\"after\":{\"description\":\"The cursor token to pass as the after query parameter to retrieve the next page of results.\",\"example\":null,\"type\":\"string\"},\"link\":{\"description\":\"The full URL of the next page of results, with the after cursor token included as a query parameter.\",\"example\":null,\"type\":\"string\"}},\"required\":[\"after\"],\"type\":\"object\"},\"prev\":{\"description\":\"specifies the paging information needed to retrieve the previous set of results in a paginated API response\",\"example\":null,\"properties\":{\"before\":{\"description\":\"The cursor token to pass as the before query parameter to retrieve the previous page of results.\",\"example\":null,\"type\":\"string\"},\"link\":{\"description\":\"The full URL of the previous page of results, with the before cursor token included as a query parameter.\",\"example\":null,\"type\":\"string\"}},\"required\":[\"before\"],\"type\":\"object\"}},\"type\":\"object\"},\"results\":{\"description\":\"An array of ExternalUnifiedEvent objects, each representing an individual event with its associated details.\",\"example\":null,\"items\":{\"example\":null,\"properties\":{\"eventType\":{\"description\":\"The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.\",\"example\":null,\"type\":\"string\"},\"id\":{\"description\":\"A unique identifier for the event.\",\"example\":null,\"type\":\"string\"},\"objectId\":{\"description\":\"The objectId of the object which did the event.\",\"example\":null,\"type\":\"string\"},\"objectType\":{\"description\":\"The objectType for the object which did the event.\",\"example\":null,\"type\":\"string\"},\"occurredAt\":{\"description\":\"An ISO 8601 timestamp when the event occurred.\",\"example\":null,\"format\":\"date-time\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A key-value map of event-specific properties. The available properties depend on the event type definition.\",\"example\":null,\"type\":\"object\"}},\"required\":[\"eventType\",\"id\",\"objectId\",\"objectType\",\"occurredAt\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"results\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"security\":[{\"oauth2\":[\"oauth-access\"]}],\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{\"oauth-access\":\"\"},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/events/event-occurrences/2026-09","segments":[{"lit":"events"},{"lit":"event-occurrences"},{"lit":"2026-09"}],"select":{"exist":["after","before","event_type","id","limit","object_id","object_property_{propname}","object_type","occurred_after","occurred_before","property","property_{propname}","sort"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"events_collection_response_external_unified_event","name__orig":"events_collection_response_external_unified_event","Name":"EventsCollectionResponseExternalUnifiedEvent","name_":"events_collection_response_external_unified_event","name-":"events-collection-response-external-unified-event","NAME":"EVENTS_COLLECTION_RESPONSE_EXTERNAL_UNIFIED_EVENT","index$":3}, {"active":true,"entity":"events_collection_response_external_unified_event","key$":"BasicEventsCollectionResponseExternalUnifiedEventFlow","kind":"basic","name":"BasicEventsCollectionResponseExternalUnifiedEventFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"events_collection_response_external_unified_event_ref01"}}],"index$":0}]}, 'EventsCollectionResponseExternalUnifiedEvent')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let events_collection_response_external_unified_event_ref01_data = Object.values(setup.data.existing.events_collection_response_external_unified_event)[0] as any

    // LIST
    const events_collection_response_external_unified_event_ref01_ent = client.EventsCollectionResponseExternalUnifiedEvent()
    const events_collection_response_external_unified_event_ref01_match: any = {}

    const events_collection_response_external_unified_event_ref01_list = (await events_collection_response_external_unified_event_ref01_ent.list(events_collection_response_external_unified_event_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/events_collection_response_external_unified_event/EventsCollectionResponseExternalUnifiedEventTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HubspotEventsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['events_collection_response_external_unified_event01','events_collection_response_external_unified_event02','events_collection_response_external_unified_event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_EVENTS_TEST_EVENTS_COLLECTION_RESPONSE_EXTERNAL_UNIFIED_EVENT_ENTID': idmap,
    'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
    'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_EVENTS_APIKEY': '',
  })

  idmap = env['HUBSPOT_EVENTS_TEST_EVENTS_COLLECTION_RESPONSE_EXTERNAL_UNIFIED_EVENT_ENTID']

  const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_EVENTS_TEST_EVENTS_COLLECTION_RESPONSE_EXTERNAL_UNIFIED_EVENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HubspotEventsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HUBSPOT_EVENTS_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HUBSPOT_EVENTS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
