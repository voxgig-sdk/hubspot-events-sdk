

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"eventType":{"a":true,"h":"Event Type","n":"eventType","r":true,"sh":"The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.","t":"`$STRING`","key$":"eventType","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier for the event.","t":"`$STRING`","key$":"id","index$":1},"objectId":{"a":true,"h":"Object Id","n":"objectId","r":true,"sh":"The objectId of the object which did the event.","t":"`$STRING`","key$":"objectId","index$":2},"objectType":{"a":true,"h":"Object Type","n":"objectType","r":true,"sh":"The objectType for the object which did the event.","t":"`$STRING`","key$":"objectType","index$":3},"occurredAt":{"a":true,"fo":"date-time","h":"Occurred At","n":"occurredAt","r":true,"sh":"An ISO 8601 timestamp when the event occurred.","t":"`$STRING`","key$":"occurredAt","index$":4},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"sh":"A key-value map of event-specific properties.","t":"`$OBJECT`","key$":"properties","index$":5}},"id":{"field":"id","name":"id"},"name":"events_collection_response_external_unified_event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /events/event-occurrences/2026-09","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":null,"k":"query","n":"after","or":"after","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":null,"k":"query","n":"before","or":"before","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":null,"k":"query","n":"event_type","or":"event_type","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":null,"k":"query","n":"id","or":"id","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"ex":null,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":null,"k":"query","n":"object_id","or":"object_id","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":null,"k":"query","n":"object_property_{propname}","or":"object_property_{propname}","r":false,"t":"`$OBJECT`","index$":6},{"a":true,"ex":null,"k":"query","n":"object_type","or":"object_type","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":null,"k":"query","n":"occurred_after","or":"occurred_after","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":null,"k":"query","n":"occurred_before","or":"occurred_before","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":null,"k":"query","n":"property","or":"property","r":false,"t":"`$ARRAY`","index$":10},{"a":true,"ex":null,"k":"query","n":"property_{propname}","or":"property_{propname}","r":false,"t":"`$OBJECT`","index$":11},{"a":true,"ex":null,"k":"query","n":"sort","or":"sort","r":false,"t":"`$ARRAY`","index$":12}]},"k":"http","m":"GET","o":"/events/event-occurrences/2026-09","q":{"exist":["after","before","event_type","id","limit","object_id","object_property_{propname}","object_type","occurred_after","occurred_before","property","property_{propname}","sort"]},"r":{},"s":[{"lit":"events"},{"lit":"event-occurrences"},{"lit":"2026-09"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"events_collection_response_external_unified_event","name__orig":"events_collection_response_external_unified_event","Name":"EventsCollectionResponseExternalUnifiedEvent","name_":"events_collection_response_external_unified_event","name-":"events-collection-response-external-unified-event","NAME":"EVENTS_COLLECTION_RESPONSE_EXTERNAL_UNIFIED_EVENT","index$":3}, {"active":true,"entity":"events_collection_response_external_unified_event","key$":"BasicEventsCollectionResponseExternalUnifiedEventFlow","kind":"basic","name":"BasicEventsCollectionResponseExternalUnifiedEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"events_collection_response_external_unified_event_ref01"}}],"index$":0}]}, 'EventsCollectionResponseExternalUnifiedEvent', {"GET /events/event-occurrences/2026-09":{"protocol":"http","parameters":[{"name":"after","in":"query","description":"The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":0},{"name":"before","in":"query","description":"A cursor token for pagination. Use the value from the previous response's paging.prev.before field.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":1},{"name":"eventType","in":"query","description":"The type of events to retrieve.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":2},{"name":"id","in":"query","description":"An array of event IDs to retrieve.","required":false,"style":"form","explode":true,"schema":{"type":"array","example":null,"items":{"type":"string","example":null}},"index$":3},{"name":"limit","in":"query","description":"The maximum number of results to display per page.","required":false,"style":"form","explode":true,"schema":{"type":"integer","format":"int32","example":null},"index$":4},{"name":"objectId","in":"query","description":"The unique identifier of the object associated with the events.","required":false,"style":"form","explode":true,"schema":{"type":"integer","format":"int64","example":null},"index$":5},{"name":"objectProperty.{propname}","in":"query","description":"Filter events based on specific object properties.","required":false,"style":"form","explode":true,"schema":{"type":"object","example":null},"index$":6},{"name":"objectType","in":"query","description":"The type of object associated with the events.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":7},{"name":"occurredAfter","in":"query","description":"Filter events that occurred after this date-time.","required":false,"style":"form","explode":true,"schema":{"type":"string","format":"date-time","example":null},"index$":8},{"name":"occurredBefore","in":"query","description":"Filter events that occurred before this date-time.","required":false,"style":"form","explode":true,"schema":{"type":"string","format":"date-time","example":null},"index$":9},{"name":"properties","in":"query","description":"An array of property names to include in the response.","required":false,"style":"form","explode":true,"schema":{"type":"array","example":null,"items":{"type":"string","example":null}},"index$":10},{"name":"property.{propname}","in":"query","description":"Filter events based on specific event properties.","required":false,"style":"form","explode":true,"schema":{"type":"object","example":null},"index$":11},{"name":"sort","in":"query","description":"An array of fields to sort the results by.","required":false,"style":"form","explode":true,"schema":{"type":"array","example":null,"items":{"type":"string","example":null}},"index$":12}]}})
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
  
