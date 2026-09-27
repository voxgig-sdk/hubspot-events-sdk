
const { BaseFeature } = require('./feature/base/BaseFeature')
const { DebugFeature } = require('./feature/debug/DebugFeature')
const { IdempotencyFeature } = require('./feature/idempotency/IdempotencyFeature')
const { MetricsFeature } = require('./feature/metrics/MetricsFeature')
const { PagingFeature } = require('./feature/paging/PagingFeature')
const { RatelimitFeature } = require('./feature/ratelimit/RatelimitFeature')
const { RetryFeature } = require('./feature/retry/RetryFeature')
const { TestFeature } = require('./feature/test/TestFeature')
const { TimeoutFeature } = require('./feature/timeout/TimeoutFeature')



const FEATURE_CLASS = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'HubspotEvents',
        slug: "hubspot-events",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.hubapi.com",

    auth: {
      prefix: '',
      in: 'query',
      name: 'hapikey',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        basic: {
        },
  
        batch: {
        },
  
        event_definition: {
        },
  
        events_collection_response_external_unified_event: {
        },
  
        events_visible_external_event_type_name: {
        },
  
        manage_event_definitions_collection_response_with_total_external: {
        },
  
        property: {
        },
  
    }
  }


  entity = {
    "basic": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "The visitor's email address."
        },
        {
          "name": "eventName",
          "title": "Event Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The event's fully qualified name."
        },
        {
          "name": "objectId",
          "title": "Object Id",
          "type": "`$STRING`",
          "short": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID)."
        },
        {
          "name": "occurredAt",
          "title": "Occurred At",
          "type": "`$STRING`",
          "short": "The time when this event occurred.",
          "format": "date-time"
        },
        {
          "name": "properties",
          "title": "Properties",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The event properties to update."
        },
        {
          "name": "utk",
          "title": "Utk",
          "type": "`$STRING`",
          "short": "The visitor's usertoken."
        },
        {
          "name": "uuid",
          "title": "Uuid",
          "type": "`$STRING`",
          "short": "A unique identifier for the event occurrence."
        }
      ],
      "name": "basic",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/events/2026-09/send",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "send"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "send"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "event_definition_id"
                },
                {
                  "lit": "property"
                },
                {
                  "var": "property_name"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_definition_id}",
                "property",
                "{property_name}"
              ],
              "rename": {
                "param": {
                  "eventName": "event_definition_id",
                  "propertyName": "property_name"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_definition_id",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  },
                  {
                    "name": "property_name",
                    "orig": "property_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "event_definition_id",
                  "property_name"
                ]
              }
            },
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "event_name"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_name}"
              ],
              "rename": {
                "param": {
                  "eventName": "event_name"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_name",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "event_name"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.event_definition"
          ],
          [
            "$.main.kit.entity.event_definition",
            "$.main.kit.entity.property"
          ]
        ]
      }
    },
    "batch": {
      "fields": [
        {
          "name": "inputs",
          "title": "Inputs",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed."
        }
      ],
      "name": "batch",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/events/2026-09/send/batch",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "send"
                },
                {
                  "lit": "batch"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "send",
                "batch"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event_definition": {
      "fields": [
        {
          "name": "archived",
          "title": "Archived",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "A boolean indicating whether the event type is archived."
        },
        {
          "name": "associations",
          "title": "Associations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of association definitions related to the event type."
        },
        {
          "name": "comboEventRules",
          "title": "Combo Event Rules",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
          "format": "date-time"
        },
        {
          "name": "createdUserId",
          "title": "Created User Id",
          "type": "`$INTEGER`",
          "short": "An integer representing the ID of the user who created the event type.",
          "format": "int32"
        },
        {
          "name": "customMatchingId",
          "title": "Custom Matching Id",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "A string providing a description of the event type."
        },
        {
          "name": "detailTemplate",
          "title": "Detail Template",
          "type": "`$STRING`",
          "short": "The rendering template for the body of the CRM timeline activity card."
        },
        {
          "name": "fullyQualifiedName",
          "title": "Fully Qualified Name",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the fully qualified name of the event type."
        },
        {
          "name": "headerTemplate",
          "title": "Header Template",
          "type": "`$STRING`",
          "short": "The rendering template for the header of the CRM timeline activity card."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the unique identifier of the event type."
        },
        {
          "name": "includeDefaultProperties",
          "title": "Include Default Properties",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "A boolean indicating whether default properties should be included."
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "short": "A string representing the label of the event type."
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "A string representing the name of the event type."
        },
        {
          "name": "objectTypeId",
          "title": "Object Type Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the object type ID associated with the event type."
        },
        {
          "name": "primaryObject",
          "title": "Primary Object",
          "type": "`$STRING`",
          "short": "A string representing the primary object associated with the event type."
        },
        {
          "name": "primaryObjectId",
          "title": "Primary Object Id",
          "type": "`$STRING`",
          "short": "A string representing the ID of the primary object associated with the event type."
        },
        {
          "name": "properties",
          "title": "Properties",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of property objects associated with the event type."
        },
        {
          "name": "propertyDefinitions",
          "title": "Property Definitions",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object."
        },
        {
          "name": "propertyOrder",
          "title": "Property Order",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card."
        },
        {
          "name": "trackingType",
          "title": "Tracking Type",
          "type": "`$STRING`",
          "short": "A string indicating the tracking type of the event."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
          "format": "date-time"
        },
        {
          "name": "updatedUserId",
          "title": "Updated User Id",
          "type": "`$INTEGER`",
          "short": "An integer representing the ID of the user who last updated the event type.",
          "format": "int32"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "event_definition",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/events/2026-09/event-definitions",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{id}"
              ],
              "rename": {
                "param": {
                  "eventName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{id}"
              ],
              "rename": {
                "param": {
                  "eventName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "events_collection_response_external_unified_event": {
      "fields": [
        {
          "name": "eventType",
          "title": "Event Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A unique identifier for the event."
        },
        {
          "name": "objectId",
          "title": "Object Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The objectId of the object which did the event."
        },
        {
          "name": "objectType",
          "title": "Object Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The objectType for the object which did the event."
        },
        {
          "name": "occurredAt",
          "title": "Occurred At",
          "type": "`$STRING`",
          "req": true,
          "short": "An ISO 8601 timestamp when the event occurred.",
          "format": "date-time"
        },
        {
          "name": "properties",
          "title": "Properties",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A key-value map of event-specific properties."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "events_collection_response_external_unified_event",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/events/event-occurrences/2026-09",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "event-occurrences"
                },
                {
                  "lit": "2026-09"
                }
              ],
              "parts": [
                "events",
                "event-occurrences",
                "2026-09"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "after",
                    "orig": "after",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "before",
                    "orig": "before",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "event_type",
                    "orig": "event_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "object_id",
                    "orig": "object_id",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "object_property_{propname}",
                    "orig": "object_property_{propname}",
                    "type": "`$OBJECT`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "object_type",
                    "orig": "object_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "occurred_after",
                    "orig": "occurred_after",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "occurred_before",
                    "orig": "occurred_before",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "property",
                    "orig": "property",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "property_{propname}",
                    "orig": "property_{propname}",
                    "type": "`$OBJECT`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "after",
                  "before",
                  "event_type",
                  "id",
                  "limit",
                  "object_id",
                  "object_property_{propname}",
                  "object_type",
                  "occurred_after",
                  "occurred_before",
                  "property",
                  "property_{propname}",
                  "sort"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "events_visible_external_event_type_name": {
      "fields": [
        {
          "name": "eventTypes",
          "title": "Event Types",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of event type names."
        }
      ],
      "name": "events_visible_external_event_type_name",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/events/event-occurrences/2026-09/event-types",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "event-occurrences"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-types"
                }
              ],
              "parts": [
                "events",
                "event-occurrences",
                "2026-09",
                "event-types"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.eventTypes`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "manage_event_definitions_collection_response_with_total_external": {
      "fields": [
        {
          "name": "archived",
          "title": "Archived",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "A boolean indicating whether the event type is archived."
        },
        {
          "name": "associations",
          "title": "Associations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of association definitions related to the event type."
        },
        {
          "name": "comboEventRules",
          "title": "Combo Event Rules",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
          "format": "date-time"
        },
        {
          "name": "createdUserId",
          "title": "Created User Id",
          "type": "`$INTEGER`",
          "short": "An integer representing the ID of the user who created the event type.",
          "format": "int32"
        },
        {
          "name": "customMatchingId",
          "title": "Custom Matching Id",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "A string providing a description of the event type."
        },
        {
          "name": "detailTemplate",
          "title": "Detail Template",
          "type": "`$STRING`",
          "short": "The rendering template for the body of the CRM timeline activity card."
        },
        {
          "name": "fullyQualifiedName",
          "title": "Fully Qualified Name",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the fully qualified name of the event type."
        },
        {
          "name": "headerTemplate",
          "title": "Header Template",
          "type": "`$STRING`",
          "short": "The rendering template for the header of the CRM timeline activity card."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the unique identifier of the event type."
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the name of the event type."
        },
        {
          "name": "objectTypeId",
          "title": "Object Type Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A string representing the object type ID associated with the event type."
        },
        {
          "name": "primaryObject",
          "title": "Primary Object",
          "type": "`$STRING`",
          "short": "A string representing the primary object associated with the event type."
        },
        {
          "name": "primaryObjectId",
          "title": "Primary Object Id",
          "type": "`$STRING`",
          "short": "A string representing the ID of the primary object associated with the event type."
        },
        {
          "name": "properties",
          "title": "Properties",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of property objects associated with the event type."
        },
        {
          "name": "trackingType",
          "title": "Tracking Type",
          "type": "`$STRING`",
          "short": "A string indicating the tracking type of the event."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
          "format": "date-time"
        },
        {
          "name": "updatedUserId",
          "title": "Updated User Id",
          "type": "`$INTEGER`",
          "short": "An integer representing the ID of the user who last updated the event type.",
          "format": "int32"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "manage_event_definitions_collection_response_with_total_external",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/events/2026-09/event-definitions",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "after",
                    "orig": "after",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "include_property",
                    "orig": "include_property",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "search_string",
                    "orig": "search_string",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  },
                  {
                    "name": "sort_order",
                    "orig": "sort_order",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "after",
                  "include_property",
                  "limit",
                  "search_string",
                  "sort_order"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "property": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "A string providing additional information about the property."
        },
        {
          "name": "displayOrder",
          "title": "Display Order",
          "type": "`$INTEGER`",
          "short": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).",
          "format": "int32"
        },
        {
          "name": "hidden",
          "title": "Hidden",
          "type": "`$BOOLEAN`",
          "short": "Controls whether or not this property is displayed on the record's activity timeline."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "short": "A string representing the display name of the property."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "A string representing the unique name of the property."
        },
        {
          "name": "options",
          "title": "Options",
          "type": "`$ARRAY`",
          "short": "An array of OptionInput objects that define the possible values for the property."
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "short": "A string indicating the data type of the property."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "property",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/events/2026-09/event-definitions/{eventName}/property",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "event_name"
                },
                {
                  "lit": "property"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_name}",
                "property"
              ],
              "rename": {
                "param": {
                  "eventName": "event_name"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_name",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "event_name"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "lit": "2026-09"
                },
                {
                  "lit": "event-definitions"
                },
                {
                  "var": "event_definition_id"
                },
                {
                  "lit": "property"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_definition_id}",
                "property",
                "{id}"
              ],
              "rename": {
                "param": {
                  "eventName": "event_definition_id",
                  "propertyName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_definition_id",
                    "orig": "event_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  },
                  {
                    "name": "id",
                    "orig": "property_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": null
                  }
                ]
              },
              "select": {
                "exist": [
                  "event_definition_id",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.event_definition"
          ]
        ]
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

