"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PropertyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_EVENTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotEventsSDK.test();
        const ent = testsdk.Property();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_EVENTS_TEST_LIVE;
        for (const op of ['create', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'property.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "A string providing additional information about the property.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "displayOrder": { "a": true, "fo": "int32", "h": "Display Order", "n": "displayOrder", "r": false, "sh": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).", "t": "`$INTEGER`", "key$": "displayOrder", "index$": 1 }, "hidden": { "a": true, "h": "Hidden", "n": "hidden", "r": false, "sh": "Controls whether or not this property is displayed on the record's activity timeline.", "t": "`$BOOLEAN`", "key$": "hidden", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "label": { "a": true, "h": "Label", "n": "label", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "A string representing the display name of the property.", "t": "`$STRING`", "key$": "label", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "A string representing the unique name of the property.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "options": { "a": true, "h": "Options", "n": "options", "r": false, "sh": "An array of OptionInput objects that define the possible values for the property.", "t": "`$ARRAY`", "key$": "options", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "A string indicating the data type of the property.", "t": "`$STRING`", "key$": "type", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "property", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /events/2026-09/event-definitions/{eventName}/property", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "event_name", "or": "event_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/events/2026-09/event-definitions/{eventName}/property", "q": { "exist": ["event_name"] }, "r": { "param": { "eventName": "event_name" } }, "s": [{ "lit": "events" }, { "lit": "2026-09" }, { "lit": "event-definitions" }, { "var": "event_name" }, { "lit": "property" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /events/2026-09/event-definitions/{eventName}/property/{propertyName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "event_definition_id", "or": "event_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": null, "k": "param", "n": "id", "or": "property_name", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}", "q": { "exist": ["event_definition_id", "id"] }, "r": { "param": { "eventName": "event_definition_id", "propertyName": "id" } }, "s": [{ "lit": "events" }, { "lit": "2026-09" }, { "lit": "event-definitions" }, { "var": "event_definition_id" }, { "lit": "property" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.event_definition"]] }, "key$": "property", "name__orig": "property", "Name": "Property", "name_": "property", "name-": "property", "NAME": "PROPERTY", "index$": 6 }, { "active": true, "entity": "property", "key$": "BasicPropertyFlow", "kind": "basic", "name": "BasicPropertyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "property_ref01" }, "m": { "event_definition_id": "event_definition01", "event_name": "event_name01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "event_definition_id": "event_definition01" }, "i": { "ref": "property_ref01", "srcdatavar": "property_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-property_ref01" } }], "v": [], "index$": 1 }] }, 'Property', { "POST /events/2026-09/event-definitions/{eventName}/property": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["label", "type"], "type": "object", "properties": { "description": { "type": "string", "description": "A string providing additional information about the property.", "example": null, "key$": "description" }, "label": { "type": "string", "description": "A string representing the display name of the property. This field is required.", "example": null, "key$": "label" }, "name": { "type": "string", "description": "A string representing the unique name of the property.", "example": null, "key$": "name" }, "options": { "type": "array", "description": "An array of OptionInput objects that define the possible values for the property.", "example": null, "items": { "required": ["displayOrder", "hidden", "label", "value"], "type": "object", "properties": { "description": { "type": "string", "description": "A string providing additional information about the option.", "example": null }, "displayOrder": { "type": "integer", "description": "An integer indicating the order in which the option should be displayed relative to other options.", "format": "int32", "example": null }, "hidden": { "type": "boolean", "description": "A boolean indicating whether the option is hidden from view.", "example": null }, "label": { "type": "string", "description": "A string representing the display label for the option.", "example": null }, "value": { "type": "string", "description": "A string representing the unique value associated with the option.", "example": null } }, "example": null, "x-ref": "#/components/schemas/ManageEventDefinitionsOptionInput" }, "key$": "options" }, "type": { "type": "string", "description": "A string indicating the data type of the property. This field is required.", "example": null, "key$": "type" } }, "example": null, "x-ref": "#/components/schemas/ManageEventDefinitionsExternalBehavioralEventPropertyCreate", "index$": 1 }, "example": null } }, "required": true }, "parameters": [{ "name": "eventName", "in": "path", "description": "The unique identifier of the event definition for which the property is being created.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 0 }] }, "PATCH /events/2026-09/event-definitions/{eventName}/property/{propertyName}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "A description of the property that will be shown as help text in HubSpot.", "example": null, "key$": "description" }, "displayOrder": { "type": "integer", "description": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).", "format": "int32", "example": null, "key$": "displayOrder" }, "hidden": { "type": "boolean", "description": "Controls whether or not this property is displayed on the record's activity timeline.", "example": null, "key$": "hidden" }, "label": { "type": "string", "description": "Human readable label for the property. Used in HubSpot UI.", "example": null, "key$": "label" }, "options": { "type": "array", "description": "A list of available options for the property if it is an enumeration. NOTE: This field is only applicable for enumerated properties.", "example": null, "items": { "required": ["displayOrder", "hidden", "label", "value"], "type": "object", "properties": { "description": { "type": "string", "description": "A string providing additional information about the option.", "example": null }, "displayOrder": { "type": "integer", "description": "An integer indicating the order in which the option should be displayed relative to other options.", "format": "int32", "example": null }, "hidden": { "type": "boolean", "description": "A boolean indicating whether the option is hidden from view.", "example": null }, "label": { "type": "string", "description": "A string representing the display label for the option.", "example": null }, "value": { "type": "string", "description": "A string representing the unique value associated with the option.", "example": null } }, "example": null, "x-ref": "#/components/schemas/ManageEventDefinitionsOptionInput" }, "key$": "options" } }, "example": null, "x-ref": "#/components/schemas/ManageEventDefinitionsExternalBehavioralEventPropertyDefinitionPatch", "index$": 1 }, "example": null } }, "required": true }, "parameters": [{ "name": "eventName", "in": "path", "description": "The unique identifier of the event whose property you want to update.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 0 }, { "name": "propertyName", "in": "path", "description": "The name of the property to be updated within the specified event.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const property_ref01_ent = client.Property();
        let property_ref01_data = setup.data.new.property['property_ref01'];
        property_ref01_data['event_definition_id'] = setup.idmap['event_definition01'];
        property_ref01_data['event_name'] = setup.idmap['event_name01'];
        property_ref01_data = (await property_ref01_ent.create(property_ref01_data)).data();
        (0, node_assert_1.default)(null != property_ref01_data.id);
        // UPDATE
        const property_ref01_data_up0 = {};
        property_ref01_data_up0.id = property_ref01_data.id;
        property_ref01_data_up0['event_definition_id'] = setup.idmap['event_definition_id'];
        const property_ref01_markdef_up0 = { name: 'description', value: 'Mark01-property_ref01_' + setup.now };
        property_ref01_data_up0[property_ref01_markdef_up0.name] = property_ref01_markdef_up0.value;
        const property_ref01_resdata_up0 = (await property_ref01_ent.update(property_ref01_data_up0)).data();
        (0, node_assert_1.default)(property_ref01_resdata_up0.id === property_ref01_data_up0.id);
        (0, node_assert_1.default)(property_ref01_resdata_up0[property_ref01_markdef_up0.name] === property_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/property/PropertyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotEventsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['property01', 'property02', 'property03', 'event_definition01', 'event_definition02', 'event_definition03', 'event_name01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_EVENTS_TEST_PROPERTY_ENTID': idmap,
        'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
        'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_EVENTS_APIKEY': '',
    });
    idmap = env['HUBSPOT_EVENTS_TEST_PROPERTY_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_EVENTS_TEST_PROPERTY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HubspotEventsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PropertyEntity.test.js.map