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
(0, node_test_1.describe)('BasicEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_EVENTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_EVENTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotEventsSDK.test();
        const ent = testsdk.Basic();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_EVENTS_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'basic.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "h": "Email", "n": "email", "r": false, "sh": "The visitor's email address.", "t": "`$STRING`", "key$": "email", "index$": 0 }, "eventName": { "a": true, "h": "Event Name", "n": "eventName", "r": true, "sh": "The event's fully qualified name.", "t": "`$STRING`", "key$": "eventName", "index$": 1 }, "objectId": { "a": true, "h": "Object Id", "n": "objectId", "r": false, "sh": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).", "t": "`$STRING`", "key$": "objectId", "index$": 2 }, "occurredAt": { "a": true, "fo": "date-time", "h": "Occurred At", "n": "occurredAt", "r": false, "sh": "The time when this event occurred.", "t": "`$STRING`", "key$": "occurredAt", "index$": 3 }, "properties": { "a": true, "h": "Properties", "n": "properties", "r": true, "sh": "The event properties to update.", "t": "`$OBJECT`", "key$": "properties", "index$": 4 }, "utk": { "a": true, "h": "Utk", "n": "utk", "r": false, "sh": "The visitor's usertoken.", "t": "`$STRING`", "key$": "utk", "index$": 5 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "A unique identifier for the event occurrence.", "t": "`$STRING`", "key$": "uuid", "index$": 6 } }, "name": "basic", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /events/2026-09/send", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/events/2026-09/send", "q": {}, "r": {}, "s": [{ "lit": "events" }, { "lit": "2026-09" }, { "lit": "send" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /events/2026-09/event-definitions/{eventName}/property/{propertyName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "event_definition_id", "or": "event_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": null, "k": "param", "n": "property_name", "or": "property_name", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}", "q": { "exist": ["event_definition_id", "property_name"] }, "r": { "param": { "eventName": "event_definition_id", "propertyName": "property_name" } }, "s": [{ "lit": "events" }, { "lit": "2026-09" }, { "lit": "event-definitions" }, { "var": "event_definition_id" }, { "lit": "property" }, { "var": "property_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /events/2026-09/event-definitions/{eventName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": null, "k": "param", "n": "event_name", "or": "event_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/events/2026-09/event-definitions/{eventName}", "q": { "exist": ["event_name"] }, "r": { "param": { "eventName": "event_name" } }, "s": [{ "lit": "events" }, { "lit": "2026-09" }, { "lit": "event-definitions" }, { "var": "event_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.event_definition"], ["$.main.kit.entity.event_definition", "$.main.kit.entity.property"]] }, "key$": "basic", "name__orig": "basic", "Name": "Basic", "name_": "basic", "name-": "basic", "NAME": "BASIC", "index$": 0 }, { "active": true, "entity": "basic", "key$": "BasicBasicFlow", "kind": "basic", "name": "BasicBasicFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "basic_ref01" }, "m": { "event_definition_id": "event_definition01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "basic_ref01", "suffix": "_rm0" }, "m": { "id": "basic01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'Basic', { "POST /events/2026-09/send": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["eventName", "properties"], "type": "object", "properties": { "email": { "type": "string", "description": "The visitor's email address. Used for associating the event data with a CRM record.", "example": null, "key$": "email" }, "eventName": { "type": "string", "description": "The event's fully qualified name. This value (formatted as `pe{HubID}_{name}`) can be retrieved through the [event definitions API](https://developers.hubspot.com/docs/reference/api/analytics-and-events/custom-events/custom-event-definitions#get-%2Fevents%2Fv3%2Fevent-definitions) or in [HubSpot's UI](https://knowledge.hubspot.com/reports/create-custom-behavioral-events-with-the-code-wizard#find-internal-name).", "example": null, "key$": "eventName" }, "objectId": { "type": "string", "description": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).", "example": null, "key$": "objectId" }, "occurredAt": { "type": "string", "description": "The time when this event occurred. If this isn't set, the current time will be used.", "format": "date-time", "example": "2026-01-20T21:14:16.512Z", "key$": "occurredAt" }, "properties": { "type": "object", "additionalProperties": { "type": "string", "example": null }, "description": "The event properties to update. Takes the format of key-value pairs (property internal name and property value). Learn more about [HubSpot's default event properties](https://developers.hubspot.com/docs/guides/api/analytics-and-events/custom-events/custom-event-definitions#hubspot-s-default-event-properties).", "example": null, "key$": "properties" }, "utk": { "type": "string", "description": "The visitor's usertoken. Used for associating the event data with a CRM record.", "example": null, "key$": "utk" }, "uuid": { "type": "string", "description": "A unique identifier for the event occurrence. Must be unique within the event type. If not provided, HubSpot will generate a random UUID. When multiple events have the same ID within a year, the first will be accepted and all others will be rejected. Can be useful for matching data between HubSpot and other external systems.", "example": null, "key$": "uuid" } }, "example": null, "x-ref": "#/components/schemas/SendEventCompletionsBehavioralEventHttpCompletionRequest", "index$": 1 }, "example": null } }, "required": true }, "parameters": [] }, "DELETE /events/2026-09/event-definitions/{eventName}/property/{propertyName}": { "protocol": "http", "parameters": [{ "name": "eventName", "in": "path", "description": "The unique name of the event definition from which the property will be deleted.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 0 }, { "name": "propertyName", "in": "path", "description": "The unique name of the property to be deleted from the event definition.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 1 }] }, "DELETE /events/2026-09/event-definitions/{eventName}": { "protocol": "http", "parameters": [{ "name": "eventName", "in": "path", "description": "The unique name of the event definition to delete.", "required": true, "style": "simple", "explode": false, "schema": { "type": "string", "example": null }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const basic_ref01_ent = client.Basic();
        let basic_ref01_data = setup.data.new.basic['basic_ref01'];
        basic_ref01_data['event_definition_id'] = setup.idmap['event_definition01'];
        basic_ref01_data = (await basic_ref01_ent.create(basic_ref01_data)).data();
        (0, node_assert_1.default)(null != basic_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/basic/BasicTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotEventsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['basic01', 'basic02', 'basic03', 'event_definition01', 'event_definition02', 'event_definition03', 'property01', 'property02', 'property03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_EVENTS_TEST_BASIC_ENTID': idmap,
        'HUBSPOT_EVENTS_TEST_LIVE': 'FALSE',
        'HUBSPOT_EVENTS_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_EVENTS_APIKEY': '',
    });
    idmap = env['HUBSPOT_EVENTS_TEST_BASIC_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_EVENTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_EVENTS_TEST_BASIC_ENTID'];
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
//# sourceMappingURL=BasicEntity.test.js.map