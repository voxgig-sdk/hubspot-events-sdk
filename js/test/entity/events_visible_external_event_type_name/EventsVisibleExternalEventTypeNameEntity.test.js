
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { HubspotEventsSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EventsVisibleExternalEventTypeNameEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotEventsSDK.test()
    const ent = testsdk.EventsVisibleExternalEventTypeName()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"eventTypes":{"a":true,"h":"Event Types","n":"eventTypes","r":true,"sh":"List of event type names.","t":"`$ARRAY`","key$":"eventTypes","index$":0}},"name":"events_visible_external_event_type_name","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /events/event-occurrences/2026-09/event-types","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/events/event-occurrences/2026-09/event-types","q":{},"r":{},"s":[{"lit":"events"},{"lit":"event-occurrences"},{"lit":"2026-09"},{"lit":"event-types"}],"t":{"req":"`reqdata`","res":"`body.eventTypes`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"events_visible_external_event_type_name","name__orig":"events_visible_external_event_type_name","Name":"EventsVisibleExternalEventTypeName","name_":"events_visible_external_event_type_name","name-":"events-visible-external-event-type-name","NAME":"EVENTS_VISIBLE_EXTERNAL_EVENT_TYPE_NAME","index$":4}, {"active":true,"entity":"events_visible_external_event_type_name","key$":"BasicEventsVisibleExternalEventTypeNameFlow","kind":"basic","name":"BasicEventsVisibleExternalEventTypeNameFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"events_visible_external_event_type_name_ref01"}}],"index$":0}]}, 'EventsVisibleExternalEventTypeName', {"GET /events/event-occurrences/2026-09/event-types":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let events_visible_external_event_type_name_ref01_data = Object.values(setup.data.existing.events_visible_external_event_type_name)[0]

    // LIST
    const events_visible_external_event_type_name_ref01_ent = client.EventsVisibleExternalEventTypeName()
    const events_visible_external_event_type_name_ref01_match = {}

    const events_visible_external_event_type_name_ref01_list = (await events_visible_external_event_type_name_ref01_ent.list(events_visible_external_event_type_name_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/events_visible_external_event_type_name/EventsVisibleExternalEventTypeNameTestData.json')

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
    ['events_visible_external_event_type_name01','events_visible_external_event_type_name02','events_visible_external_event_type_name03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_EVENTS_TEST_EVENTS_VISIBLE_EXTERNAL_EVENT_TYPE_NAME_ENTID': idmap,
    'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
    'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_EVENTS_APIKEY': '',
  })

  idmap = env['HUBSPOT_EVENTS_TEST_EVENTS_VISIBLE_EXTERNAL_EVENT_TYPE_NAME_ENTID']

  const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_EVENTS_TEST_EVENTS_VISIBLE_EXTERNAL_EVENT_TYPE_NAME_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
