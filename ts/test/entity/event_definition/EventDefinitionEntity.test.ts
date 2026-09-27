

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


describe('EventDefinitionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_EVENTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotEventsSDK.test()
    const ent = testsdk.EventDefinition()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUBSPOT_EVENTS_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event_definition.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"archived":{"a":true,"h":"Archived","n":"archived","r":true,"sh":"A boolean indicating whether the event type is archived.","t":"`$BOOLEAN`","key$":"archived","index$":0},"associations":{"a":true,"h":"Associations","n":"associations","r":true,"sh":"An array of association definitions related to the event type.","t":"`$ARRAY`","key$":"associations","index$":1},"comboEventRules":{"a":true,"h":"Combo Event Rules","n":"comboEventRules","r":true,"t":"`$OBJECT`","union":{"branches":21,"count":23,"depth":20},"key$":"comboEventRules","index$":2},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"A string representing the date and time when the event type was created, in ISO 8601 format.","t":"`$STRING`","key$":"createdAt","index$":3},"createdUserId":{"a":true,"fo":"int32","h":"Created User Id","n":"createdUserId","r":false,"sh":"An integer representing the ID of the user who created the event type.","t":"`$INTEGER`","key$":"createdUserId","index$":4},"customMatchingId":{"a":true,"h":"Custom Matching Id","n":"customMatchingId","r":true,"t":"`$OBJECT`","key$":"customMatchingId","index$":5},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A string providing a description of the event type.","t":"`$STRING`","key$":"description","index$":6},"detailTemplate":{"a":true,"h":"Detail Template","n":"detailTemplate","r":false,"sh":"The rendering template for the body of the CRM timeline activity card.","t":"`$STRING`","key$":"detailTemplate","index$":7},"fullyQualifiedName":{"a":true,"h":"Fully Qualified Name","n":"fullyQualifiedName","r":true,"sh":"A string representing the fully qualified name of the event type.","t":"`$STRING`","key$":"fullyQualifiedName","index$":8},"headerTemplate":{"a":true,"h":"Header Template","n":"headerTemplate","r":false,"sh":"The rendering template for the header of the CRM timeline activity card.","t":"`$STRING`","key$":"headerTemplate","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A string representing the unique identifier of the event type.","t":"`$STRING`","key$":"id","index$":10},"includeDefaultProperties":{"a":true,"h":"Include Default Properties","n":"includeDefaultProperties","r":true,"sh":"A boolean indicating whether default properties should be included.","t":"`$BOOLEAN`","key$":"includeDefaultProperties","index$":11},"label":{"a":true,"h":"Label","n":"label","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A string representing the label of the event type.","t":"`$STRING`","key$":"label","index$":12},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":"`$OBJECT`","key$":"labels","index$":13},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A string representing the name of the event type.","t":"`$STRING`","key$":"name","index$":14},"objectTypeId":{"a":true,"h":"Object Type Id","n":"objectTypeId","r":true,"sh":"A string representing the object type ID associated with the event type.","t":"`$STRING`","key$":"objectTypeId","index$":15},"primaryObject":{"a":true,"h":"Primary Object","n":"primaryObject","r":false,"sh":"A string representing the primary object associated with the event type.","t":"`$STRING`","key$":"primaryObject","index$":16},"primaryObjectId":{"a":true,"h":"Primary Object Id","n":"primaryObjectId","r":false,"sh":"A string representing the ID of the primary object associated with the event type.","t":"`$STRING`","key$":"primaryObjectId","index$":17},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"sh":"An array of property objects associated with the event type.","t":"`$ARRAY`","key$":"properties","index$":18},"propertyDefinitions":{"a":true,"h":"Property Definitions","n":"propertyDefinitions","r":true,"sh":"An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.","t":"`$ARRAY`","key$":"propertyDefinitions","index$":19},"propertyOrder":{"a":true,"h":"Property Order","n":"propertyOrder","r":true,"sh":"Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.","t":"`$ARRAY`","key$":"propertyOrder","index$":20},"trackingType":{"a":true,"h":"Tracking Type","n":"trackingType","r":false,"sh":"A string indicating the tracking type of the event.","t":"`$STRING`","key$":"trackingType","index$":21},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"A string representing the date and time when the event type was last updated, in ISO 8601 format.","t":"`$STRING`","key$":"updatedAt","index$":22},"updatedUserId":{"a":true,"fo":"int32","h":"Updated User Id","n":"updatedUserId","r":false,"sh":"An integer representing the ID of the user who last updated the event type.","t":"`$INTEGER`","key$":"updatedUserId","index$":23}},"id":{"field":"id","name":"id"},"name":"event_definition","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /events/2026-09/event-definitions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/events/2026-09/event-definitions","q":{},"r":{},"s":[{"lit":"events"},{"lit":"2026-09"},{"lit":"event-definitions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /events/2026-09/event-definitions/{eventName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"id","or":"event_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/events/2026-09/event-definitions/{eventName}","q":{"exist":["id"]},"r":{"param":{"eventName":"id"}},"s":[{"lit":"events"},{"lit":"2026-09"},{"lit":"event-definitions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /events/2026-09/event-definitions/{eventName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":null,"k":"param","n":"id","or":"event_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/events/2026-09/event-definitions/{eventName}","q":{"exist":["id"]},"r":{"param":{"eventName":"id"}},"s":[{"lit":"events"},{"lit":"2026-09"},{"lit":"event-definitions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"event_definition","name__orig":"event_definition","Name":"EventDefinition","name_":"event_definition","name-":"event-definition","NAME":"EVENT_DEFINITION","index$":2}, {"active":true,"entity":"event_definition","key$":"BasicEventDefinitionFlow","kind":"basic","name":"BasicEventDefinitionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"event_definition_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"event_definition_ref01","srcdatavar":"event_definition_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_definition_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"event_definition_ref01","srcdatavar":"event_definition_ref01_data","suffix":"_dt0"},"m":{"id":"event_definition01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_definition_ref01"}}],"index$":2}]}, 'EventDefinition', {"POST /events/2026-09/event-definitions":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["includeDefaultProperties","label","propertyDefinitions"],"type":"object","properties":{"customMatchingId":{"required":["primaryObjectRule"],"type":"object","properties":{"primaryObjectRule":{"required":["eventPropertyName","targetObjectPropertyName"],"type":"object","properties":{"eventPropertyName":{},"targetObjectPropertyName":{}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsExternalPrimaryObjectResolutionRule"}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsExternalObjectResolutionMappingRequest","key$":"customMatchingId"},"description":{"type":"string","description":"A string providing a description of the event type.","example":null,"key$":"description"},"includeDefaultProperties":{"type":"boolean","description":"A boolean indicating whether default properties should be included.","example":null,"key$":"includeDefaultProperties"},"label":{"type":"string","description":"A string representing the label of the event type.","example":null,"key$":"label"},"name":{"type":"string","description":"A string representing the name of the event type.","example":null,"key$":"name"},"primaryObject":{"type":"string","description":"A string indicating the primary object associated with the event type.","example":null,"key$":"primaryObject"},"propertyDefinitions":{"type":"array","description":"An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.","example":null,"items":{"required":["label","type"],"type":"object","properties":{"description":{"type":"string","description":"A string providing additional information about the property.","example":null,"key$":"description"},"label":{"type":"string","description":"A string representing the display name of the property. This field is required.","example":null,"key$":"label"},"name":{"type":"string","description":"A string representing the unique name of the property.","example":null,"key$":"name"},"options":{"type":"array","description":"An array of OptionInput objects that define the possible values for the property.","example":null,"items":{},"key$":"options"},"type":{"type":"string","description":"A string indicating the data type of the property. This field is required.","example":null,"key$":"type"}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsExternalBehavioralEventPropertyCreate"},"key$":"propertyDefinitions"}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsExternalBehavioralEventTypeDefinitionEgg","index$":1},"example":null}},"required":true},"parameters":[]},"GET /events/2026-09/event-definitions/{eventName}":{"protocol":"http","parameters":[{"name":"eventName","in":"path","description":"The unique name of the event definition to retrieve.","required":true,"style":"simple","explode":false,"schema":{"type":"string","example":null},"index$":0}]},"PATCH /events/2026-09/event-definitions/{eventName}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["propertyOrder"],"type":"object","properties":{"description":{"type":"string","description":"A description of the event that will be shown as help text in HubSpot.","example":null,"key$":"description"},"detailTemplate":{"type":"string","description":"The rendering template for the body of the CRM timeline activity card.","example":null,"key$":"detailTemplate"},"headerTemplate":{"type":"string","description":"The rendering template for the header of the CRM timeline activity card.","example":null,"key$":"headerTemplate"},"label":{"type":"string","description":"Human readable label for the event. Used in HubSpot UI.","example":null,"key$":"label"},"propertyOrder":{"type":"array","description":"Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.","example":null,"items":{"required":["name"],"type":"object","properties":{"description":{"type":"string","description":"A string providing a detailed description of the property.","example":null},"displayOrder":{"type":"integer","description":"An integer indicating the order in which the property should be displayed.","format":"int32","example":null},"hidden":{"type":"boolean","description":"A boolean indicating whether the property is hidden from view.","example":null},"label":{"type":"string","description":"A human-readable label for the property, represented as a string.","example":null},"name":{"type":"string","description":"The unique name of the property being modified. It is a required string field.","example":null},"options":{"type":"array","description":"An array of OptionInput objects, each representing possible options for the property.","example":null,"items":{}}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsPropertyPatch"},"key$":"propertyOrder"}},"example":null,"x-ref":"#/components/schemas/ManageEventDefinitionsExternalBehavioralEventTypeDefinitionPatch","index$":1},"example":null}},"required":true},"parameters":[{"name":"eventName","in":"path","description":"The unique name of the event definition to update.","required":true,"style":"simple","explode":false,"schema":{"type":"string","example":null},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_definition_ref01_ent = client.EventDefinition()
    let event_definition_ref01_data = setup.data.new.event_definition['event_definition_ref01']

    event_definition_ref01_data = (await event_definition_ref01_ent.create(event_definition_ref01_data)).data()
    assert(null != event_definition_ref01_data.id)


    // UPDATE
    const event_definition_ref01_data_up0: any = {}
    event_definition_ref01_data_up0.id = event_definition_ref01_data.id

    const event_definition_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-event_definition_ref01_' + setup.now }
    ;(event_definition_ref01_data_up0 as any)[event_definition_ref01_markdef_up0.name] = event_definition_ref01_markdef_up0.value

    const event_definition_ref01_resdata_up0 = (await event_definition_ref01_ent.update(event_definition_ref01_data_up0)).data()
    assert(event_definition_ref01_resdata_up0.id === event_definition_ref01_data_up0.id)

    assert((event_definition_ref01_resdata_up0 as any)[event_definition_ref01_markdef_up0.name] === event_definition_ref01_markdef_up0.value)


    // LOAD
    const event_definition_ref01_match_dt0: any = {}
    event_definition_ref01_match_dt0.id = event_definition_ref01_data.id
    const event_definition_ref01_data_dt0 = (await event_definition_ref01_ent.load(event_definition_ref01_match_dt0)).data()
    assert(event_definition_ref01_data_dt0.id === event_definition_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/event_definition/EventDefinitionTestData.json')

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
    ['event_definition01','event_definition02','event_definition03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID': idmap,
    'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
    'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_EVENTS_APIKEY': '',
  })

  idmap = env['HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID']

  const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID']
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
  
