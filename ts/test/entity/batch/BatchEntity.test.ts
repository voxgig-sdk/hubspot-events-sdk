

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


describe('BatchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotEventsSDK.test()
    const ent = testsdk.Batch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUBSPOT_EVENTS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'batch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"inputs":{"a":true,"h":"Inputs","n":"inputs","r":true,"sh":"An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.","t":"`$ARRAY`","key$":"inputs","index$":0}},"name":"batch","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /events/2026-09/send/batch","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/events/2026-09/send/batch","q":{},"r":{},"s":[{"lit":"events"},{"lit":"2026-09"},{"lit":"send"},{"lit":"batch"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch","name__orig":"batch","Name":"Batch","name_":"batch","name-":"batch","NAME":"BATCH","index$":1}, {"active":true,"entity":"batch","key$":"BasicBatchFlow","kind":"basic","name":"BasicBatchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Batch', {"POST /events/2026-09/send/batch":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["inputs"],"type":"object","properties":{"inputs":{"type":"array","description":"An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. This property is required.","example":null,"items":{"required":["eventName","properties"],"type":"object","properties":{"email":{"type":"string","description":"The visitor's email address. Used for associating the event data with a CRM record.","example":null,"key$":"email"},"eventName":{"type":"string","description":"The event's fully qualified name. This value (formatted as `pe{HubID}_{name}`) can be retrieved through the [event definitions API](https://developers.hubspot.com/docs/reference/api/analytics-and-events/custom-events/custom-event-definitions#get-%2Fevents%2Fv3%2Fevent-definitions) or in [HubSpot's UI](https://knowledge.hubspot.com/reports/create-custom-behavioral-events-with-the-code-wizard#find-internal-name).","example":null,"key$":"eventName"},"objectId":{"type":"string","description":"The ID of the record for which the event occurred (e.g., contact ID or visitor ID).","example":null,"key$":"objectId"},"occurredAt":{"type":"string","description":"The time when this event occurred. If this isn't set, the current time will be used.","format":"date-time","example":"2026-01-20T21:14:16.512Z","key$":"occurredAt"},"properties":{"type":"object","additionalProperties":{},"description":"The event properties to update. Takes the format of key-value pairs (property internal name and property value). Learn more about [HubSpot's default event properties](https://developers.hubspot.com/docs/guides/api/analytics-and-events/custom-events/custom-event-definitions#hubspot-s-default-event-properties).","example":null,"key$":"properties"},"utk":{"type":"string","description":"The visitor's usertoken. Used for associating the event data with a CRM record.","example":null,"key$":"utk"},"uuid":{"type":"string","description":"A unique identifier for the event occurrence. Must be unique within the event type. If not provided, HubSpot will generate a random UUID. When multiple events have the same ID within a year, the first will be accepted and all others will be rejected. Can be useful for matching data between HubSpot and other external systems.","example":null,"key$":"uuid"}},"example":null,"x-ref":"#/components/schemas/SendEventCompletionsBehavioralEventHttpCompletionRequest"},"key$":"inputs"}},"example":null,"x-ref":"#/components/schemas/SendEventCompletionsBatchedBehavioralEventHttpCompletionRequest","index$":1},"example":null}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const batch_ref01_ent = client.Batch()
    let batch_ref01_data = setup.data.new.batch['batch_ref01']

    batch_ref01_data = (await batch_ref01_ent.create(batch_ref01_data)).data()
    assert(null != batch_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/batch/BatchTestData.json')

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
    ['batch01','batch02','batch03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_EVENTS_TEST_BATCH_ENTID': idmap,
    'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
    'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_EVENTS_APIKEY': '',
  })

  idmap = env['HUBSPOT_EVENTS_TEST_BATCH_ENTID']

  const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_EVENTS_TEST_BATCH_ENTID']
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
  
