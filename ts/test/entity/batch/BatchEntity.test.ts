

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"inputs","req":true,"short":"An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.","type":"`$ARRAY`","index$":0}],"name":"batch","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /events/2026-09/send/batch","json":"{\"operationId\":\"post-/events/2026-09/send/batch_send\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"inputs\":{\"description\":\"An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed. This property is required.\",\"example\":null,\"items\":{\"example\":null,\"properties\":{\"email\":{\"description\":\"The visitor's email address. Used for associating the event data with a CRM record.\",\"example\":null,\"type\":\"string\"},\"eventName\":{\"description\":\"The event's fully qualified name. This value (formatted as `pe{HubID}_{name}`) can be retrieved through the [event definitions API](https://developers.hubspot.com/docs/reference/api/analytics-and-events/custom-events/custom-event-definitions#get-%2Fevents%2Fv3%2Fevent-definitions) or in [HubSpot's UI](https://knowledge.hubspot.com/reports/create-custom-behavioral-events-with-the-code-wizard#find-internal-name).\",\"example\":null,\"type\":\"string\"},\"objectId\":{\"description\":\"The ID of the record for which the event occurred (e.g., contact ID or visitor ID).\",\"example\":null,\"type\":\"string\"},\"occurredAt\":{\"description\":\"The time when this event occurred. If this isn't set, the current time will be used.\",\"example\":\"2026-01-20T21:14:16.512Z\",\"format\":\"date-time\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"The event properties to update. Takes the format of key-value pairs (property internal name and property value). Learn more about [HubSpot's default event properties](https://developers.hubspot.com/docs/guides/api/analytics-and-events/custom-events/custom-event-definitions#hubspot-s-default-event-properties).\",\"example\":null,\"type\":\"object\"},\"utk\":{\"description\":\"The visitor's usertoken. Used for associating the event data with a CRM record.\",\"example\":null,\"type\":\"string\"},\"uuid\":{\"description\":\"A unique identifier for the event occurrence. Must be unique within the event type. If not provided, HubSpot will generate a random UUID. When multiple events have the same ID within a year, the first will be accepted and all others will be rejected. Can be useful for matching data between HubSpot and other external systems.\",\"example\":null,\"type\":\"string\"}},\"required\":[\"eventName\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"inputs\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"204\":{\"content\":{},\"description\":\"No content\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"security\":[{\"oauth2\":[\"analytics.behavioral_events.send\"]}],\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{\"oauth-access\":\"\"},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/events/2026-09/send/batch","segments":[{"lit":"events"},{"lit":"2026-09"},{"lit":"send"},{"lit":"batch"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch","name__orig":"batch","Name":"Batch","name_":"batch","name-":"batch","NAME":"BATCH","index$":1}, {"active":true,"entity":"batch","key$":"BasicBatchFlow","kind":"basic","name":"BasicBatchFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"batch_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Batch')
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
  
