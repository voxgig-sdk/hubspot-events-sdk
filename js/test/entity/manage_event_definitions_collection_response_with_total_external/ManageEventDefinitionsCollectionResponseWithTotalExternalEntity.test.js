
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


describe('ManageEventDefinitionsCollectionResponseWithTotalExternalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotEventsSDK.test()
    const ent = testsdk.ManageEventDefinitionsCollectionResponseWithTotalExternal()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"archived":{"a":true,"h":"Archived","n":"archived","r":true,"sh":"A boolean indicating whether the event type is archived.","t":"`$BOOLEAN`","key$":"archived","index$":0},"associations":{"a":true,"h":"Associations","n":"associations","r":true,"sh":"An array of association definitions related to the event type.","t":"`$ARRAY`","key$":"associations","index$":1},"comboEventRules":{"a":true,"h":"Combo Event Rules","n":"comboEventRules","r":true,"t":"`$OBJECT`","union":{"branches":21,"count":23,"depth":20},"key$":"comboEventRules","index$":2},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"A string representing the date and time when the event type was created, in ISO 8601 format.","t":"`$STRING`","key$":"createdAt","index$":3},"createdUserId":{"a":true,"fo":"int32","h":"Created User Id","n":"createdUserId","r":false,"sh":"An integer representing the ID of the user who created the event type.","t":"`$INTEGER`","key$":"createdUserId","index$":4},"customMatchingId":{"a":true,"h":"Custom Matching Id","n":"customMatchingId","r":true,"t":"`$OBJECT`","key$":"customMatchingId","index$":5},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A string providing a description of the event type.","t":"`$STRING`","key$":"description","index$":6},"detailTemplate":{"a":true,"h":"Detail Template","n":"detailTemplate","r":false,"sh":"The rendering template for the body of the CRM timeline activity card.","t":"`$STRING`","key$":"detailTemplate","index$":7},"fullyQualifiedName":{"a":true,"h":"Fully Qualified Name","n":"fullyQualifiedName","r":true,"sh":"A string representing the fully qualified name of the event type.","t":"`$STRING`","key$":"fullyQualifiedName","index$":8},"headerTemplate":{"a":true,"h":"Header Template","n":"headerTemplate","r":false,"sh":"The rendering template for the header of the CRM timeline activity card.","t":"`$STRING`","key$":"headerTemplate","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A string representing the unique identifier of the event type.","t":"`$STRING`","key$":"id","index$":10},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":"`$OBJECT`","key$":"labels","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"A string representing the name of the event type.","t":"`$STRING`","key$":"name","index$":12},"objectTypeId":{"a":true,"h":"Object Type Id","n":"objectTypeId","r":true,"sh":"A string representing the object type ID associated with the event type.","t":"`$STRING`","key$":"objectTypeId","index$":13},"primaryObject":{"a":true,"h":"Primary Object","n":"primaryObject","r":false,"sh":"A string representing the primary object associated with the event type.","t":"`$STRING`","key$":"primaryObject","index$":14},"primaryObjectId":{"a":true,"h":"Primary Object Id","n":"primaryObjectId","r":false,"sh":"A string representing the ID of the primary object associated with the event type.","t":"`$STRING`","key$":"primaryObjectId","index$":15},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"sh":"An array of property objects associated with the event type.","t":"`$ARRAY`","key$":"properties","index$":16},"trackingType":{"a":true,"h":"Tracking Type","n":"trackingType","r":false,"sh":"A string indicating the tracking type of the event.","t":"`$STRING`","key$":"trackingType","index$":17},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"A string representing the date and time when the event type was last updated, in ISO 8601 format.","t":"`$STRING`","key$":"updatedAt","index$":18},"updatedUserId":{"a":true,"fo":"int32","h":"Updated User Id","n":"updatedUserId","r":false,"sh":"An integer representing the ID of the user who last updated the event type.","t":"`$INTEGER`","key$":"updatedUserId","index$":19}},"id":{"field":"id","name":"id"},"name":"manage_event_definitions_collection_response_with_total_external","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /events/2026-09/event-definitions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":null,"k":"query","n":"after","or":"after","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":null,"k":"query","n":"include_property","or":"include_property","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":null,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":null,"k":"query","n":"search_string","or":"search_string","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":null,"k":"query","n":"sort_order","or":"sort_order","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/events/2026-09/event-definitions","q":{"exist":["after","include_property","limit","search_string","sort_order"]},"r":{},"s":[{"lit":"events"},{"lit":"2026-09"},{"lit":"event-definitions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"manage_event_definitions_collection_response_with_total_external","name__orig":"manage_event_definitions_collection_response_with_total_external","Name":"ManageEventDefinitionsCollectionResponseWithTotalExternal","name_":"manage_event_definitions_collection_response_with_total_external","name-":"manage-event-definitions-collection-response-with-total-external","NAME":"MANAGE_EVENT_DEFINITIONS_COLLECTION_RESPONSE_WITH_TOTAL_EXTERNAL","index$":5}, {"active":true,"entity":"manage_event_definitions_collection_response_with_total_external","key$":"BasicManageEventDefinitionsCollectionResponseWithTotalExternalFlow","kind":"basic","name":"BasicManageEventDefinitionsCollectionResponseWithTotalExternalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"manage_event_definitions_collection_response_with_total_external_ref01"}}],"index$":0}]}, 'ManageEventDefinitionsCollectionResponseWithTotalExternal', {"GET /events/2026-09/event-definitions":{"protocol":"http","parameters":[{"name":"after","in":"query","description":"A cursor token for pagination. Use the value from the previous response's paging.next.after field to retrieve the next set of results.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":0},{"name":"includeProperties","in":"query","description":"A boolean indicating whether to include event properties in the response.","required":false,"style":"form","explode":true,"schema":{"type":"boolean","example":null},"index$":1},{"name":"limit","in":"query","description":"The maximum number of results to return per page.","required":false,"style":"form","explode":true,"schema":{"type":"integer","format":"int32","example":null},"index$":2},{"name":"searchString","in":"query","description":"A string to filter event definitions by name or description.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":3},{"name":"sortOrder","in":"query","description":"The order in which to sort the results. Accepts values like 'asc' or 'desc'.","required":false,"style":"form","explode":true,"schema":{"type":"string","example":null},"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let manage_event_definitions_collection_response_with_total_external_ref01_data = Object.values(setup.data.existing.manage_event_definitions_collection_response_with_total_external)[0]

    // LIST
    const manage_event_definitions_collection_response_with_total_external_ref01_ent = client.ManageEventDefinitionsCollectionResponseWithTotalExternal()
    const manage_event_definitions_collection_response_with_total_external_ref01_match = {}

    const manage_event_definitions_collection_response_with_total_external_ref01_list = (await manage_event_definitions_collection_response_with_total_external_ref01_ent.list(manage_event_definitions_collection_response_with_total_external_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/manage_event_definitions_collection_response_with_total_external/ManageEventDefinitionsCollectionResponseWithTotalExternalTestData.json')

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
    ['manage_event_definitions_collection_response_with_total_external01','manage_event_definitions_collection_response_with_total_external02','manage_event_definitions_collection_response_with_total_external03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_COLLECTION_RESPONSE_WITH_TOTAL_EXTERNAL_ENTID': idmap,
    'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
    'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_EVENTS_APIKEY': '',
  })

  idmap = env['HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_COLLECTION_RESPONSE_WITH_TOTAL_EXTERNAL_ENTID']

  const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_COLLECTION_RESPONSE_WITH_TOTAL_EXTERNAL_ENTID']
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
  
