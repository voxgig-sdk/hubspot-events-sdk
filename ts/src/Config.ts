
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
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
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'HubspotEvents',
        slug: "hubspot-events",
    version: "0.0.1",
    target: "ts",

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
  
        manage_event_definitions_property: {
        },
  
    }
  }


  entity = {
    "basic": {
      "fields": [
        {
          "name": "email",
          "short": "The visitor's email address.",
          "type": "`$STRING`"
        },
        {
          "name": "eventName",
          "req": true,
          "short": "The event's fully qualified name.",
          "type": "`$STRING`"
        },
        {
          "name": "objectId",
          "short": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "occurredAt",
          "short": "The time when this event occurred.",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "req": true,
          "short": "The event properties to update.",
          "type": "`$OBJECT`"
        },
        {
          "name": "utk",
          "short": "The visitor's usertoken.",
          "type": "`$STRING`"
        },
        {
          "name": "uuid",
          "short": "A unique identifier for the event occurrence.",
          "type": "`$STRING`"
        }
      ],
      "name": "basic",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "send"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "event_definition_id",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "param",
                    "name": "property_name",
                    "orig": "property_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
              "rename": {
                "param": {
                  "eventName": "event_definition_id",
                  "propertyName": "property_name"
                }
              },
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
              "select": {
                "exist": [
                  "event_definition_id",
                  "property_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_definition_id}",
                "property",
                "{property_name}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "event_name",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "rename": {
                "param": {
                  "eventName": "event_name"
                }
              },
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
              "select": {
                "exist": [
                  "event_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_name}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "event_definition"
          ],
          [
            "event_definition",
            "property"
          ]
        ]
      }
    },
    "batch": {
      "fields": [
        {
          "name": "inputs",
          "req": true,
          "short": "An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.",
          "type": "`$ARRAY`"
        }
      ],
      "name": "batch",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "send",
                "batch"
              ]
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
          "req": true,
          "short": "A boolean indicating whether the event type is archived.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "associations",
          "req": true,
          "short": "An array of association definitions related to the event type.",
          "type": "`$ARRAY`"
        },
        {
          "name": "comboEventRules",
          "req": true,
          "type": "`$OBJECT`",
          "union": {
            "branches": 21,
            "count": 17,
            "depth": 20
          }
        },
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "createdUserId",
          "short": "An integer representing the ID of the user who created the event type.",
          "type": "`$INTEGER`"
        },
        {
          "name": "customMatchingId",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "description",
          "short": "A string providing a description of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "detailTemplate",
          "short": "The rendering template for the body of the CRM timeline activity card.",
          "type": "`$STRING`"
        },
        {
          "name": "fullyQualifiedName",
          "req": true,
          "short": "A string representing the fully qualified name of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "headerTemplate",
          "short": "The rendering template for the header of the CRM timeline activity card.",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "A string representing the unique identifier of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "includeDefaultProperties",
          "req": true,
          "short": "A boolean indicating whether default properties should be included.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "label",
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "A string representing the label of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "labels",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "A string representing the name of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "objectTypeId",
          "req": true,
          "short": "A string representing the object type ID associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "primaryObject",
          "short": "A string representing the primary object associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "primaryObjectId",
          "short": "A string representing the ID of the primary object associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "req": true,
          "short": "An array of property objects associated with the event type.",
          "type": "`$ARRAY`"
        },
        {
          "name": "propertyDefinitions",
          "req": true,
          "short": "An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.",
          "type": "`$ARRAY`"
        },
        {
          "name": "propertyOrder",
          "req": true,
          "short": "Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.",
          "type": "`$ARRAY`"
        },
        {
          "name": "trackingType",
          "short": "A string indicating the tracking type of the event.",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "updatedAt",
          "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "updatedUserId",
          "short": "An integer representing the ID of the user who last updated the event type.",
          "type": "`$INTEGER`"
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
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "id",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "rename": {
                "param": {
                  "eventName": "id"
                }
              },
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "id",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/events/2026-09/event-definitions/{eventName}",
              "rename": {
                "param": {
                  "eventName": "id"
                }
              },
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{id}"
              ]
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
          "req": true,
          "short": "The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "A unique identifier for the event.",
          "type": "`$STRING`"
        },
        {
          "name": "objectId",
          "req": true,
          "short": "The objectId of the object which did the event.",
          "type": "`$STRING`"
        },
        {
          "name": "objectType",
          "req": true,
          "short": "The objectType for the object which did the event.",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "occurredAt",
          "req": true,
          "short": "An ISO 8601 timestamp when the event occurred.",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "req": true,
          "short": "A key-value map of event-specific properties.",
          "type": "`$OBJECT`"
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
              "args": {
                "query": [
                  {
                    "example": null,
                    "kind": "query",
                    "name": "after",
                    "orig": "after",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "before",
                    "orig": "before",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "event_type",
                    "orig": "event_type",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "id",
                    "orig": "id",
                    "type": "`$ARRAY`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "object_id",
                    "orig": "object_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "object_property_{propname}",
                    "orig": "object_property_{propname}",
                    "type": "`$OBJECT`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "object_type",
                    "orig": "object_type",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "occurred_after",
                    "orig": "occurred_after",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "occurred_before",
                    "orig": "occurred_before",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "property",
                    "orig": "property",
                    "type": "`$ARRAY`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "property_{propname}",
                    "orig": "property_{propname}",
                    "type": "`$OBJECT`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$ARRAY`"
                  }
                ]
              },
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "event-occurrences",
                "2026-09"
              ]
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
          "req": true,
          "short": "List of event type names.",
          "type": "`$ARRAY`"
        }
      ],
      "name": "events_visible_external_event_type_name",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.eventTypes`"
              },
              "parts": [
                "events",
                "event-occurrences",
                "2026-09",
                "event-types"
              ]
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
          "req": true,
          "short": "A boolean indicating whether the event type is archived.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "associations",
          "req": true,
          "short": "An array of association definitions related to the event type.",
          "type": "`$ARRAY`"
        },
        {
          "name": "comboEventRules",
          "req": true,
          "type": "`$OBJECT`",
          "union": {
            "branches": 21,
            "count": 17,
            "depth": 20
          }
        },
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "createdUserId",
          "short": "An integer representing the ID of the user who created the event type.",
          "type": "`$INTEGER`"
        },
        {
          "name": "customMatchingId",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "description",
          "short": "A string providing a description of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "detailTemplate",
          "short": "The rendering template for the body of the CRM timeline activity card.",
          "type": "`$STRING`"
        },
        {
          "name": "fullyQualifiedName",
          "req": true,
          "short": "A string representing the fully qualified name of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "headerTemplate",
          "short": "The rendering template for the header of the CRM timeline activity card.",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "A string representing the unique identifier of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "labels",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "req": true,
          "short": "A string representing the name of the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "objectTypeId",
          "req": true,
          "short": "A string representing the object type ID associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "primaryObject",
          "short": "A string representing the primary object associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "primaryObjectId",
          "short": "A string representing the ID of the primary object associated with the event type.",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "req": true,
          "short": "An array of property objects associated with the event type.",
          "type": "`$ARRAY`"
        },
        {
          "name": "trackingType",
          "short": "A string indicating the tracking type of the event.",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "updatedAt",
          "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "updatedUserId",
          "short": "An integer representing the ID of the user who last updated the event type.",
          "type": "`$INTEGER`"
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
              "args": {
                "query": [
                  {
                    "example": null,
                    "kind": "query",
                    "name": "after",
                    "orig": "after",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "include_property",
                    "orig": "include_property",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "search_string",
                    "orig": "search_string",
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "query",
                    "name": "sort_order",
                    "orig": "sort_order",
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "after",
                  "include_property",
                  "limit",
                  "search_string",
                  "sort_order"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "manage_event_definitions_property": {
      "fields": [
        {
          "name": "description",
          "short": "A string providing additional information about the property.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "displayOrder",
          "short": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).",
          "type": "`$INTEGER`"
        },
        {
          "name": "hidden",
          "short": "Controls whether or not this property is displayed on the record's activity timeline.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "label",
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "A string representing the display name of the property.",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "A string representing the unique name of the property.",
          "type": "`$STRING`"
        },
        {
          "name": "options",
          "short": "An array of OptionInput objects that define the possible values for the property.",
          "type": "`$ARRAY`"
        },
        {
          "name": "type",
          "req": true,
          "short": "A string indicating the data type of the property.",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "manage_event_definitions_property",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "event_name",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/events/2026-09/event-definitions/{eventName}/property",
              "rename": {
                "param": {
                  "eventName": "event_name"
                }
              },
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
              "select": {
                "exist": [
                  "event_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_name}",
                "property"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": null,
                    "kind": "param",
                    "name": "event_definition_id",
                    "orig": "event_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": null,
                    "kind": "param",
                    "name": "id",
                    "orig": "property_name",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
              "rename": {
                "param": {
                  "eventName": "event_definition_id",
                  "propertyName": "id"
                }
              },
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
              "select": {
                "exist": [
                  "event_definition_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events",
                "2026-09",
                "event-definitions",
                "{event_definition_id}",
                "property",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "event_definition"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

