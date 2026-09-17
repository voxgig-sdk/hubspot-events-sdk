# HubspotEvents SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HubspotEvents",
            "slug": "hubspot-events",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.hubapi.com",
            "auth": {
                "prefix": "",
                "in": "query",
                "name": "hapikey",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "basic": {},
                "batch": {},
                "event_definition": {},
                "events_collection_response_external_unified_event": {},
                "events_visible_external_event_type_name": {},
                "manage_event_definitions_collection_response_with_total_external": {},
                "manage_event_definitions_property": {},
            },
        },
        "entity": {
      "basic": {
        "fields": [
          {
            "name": "email",
            "short": "The visitor's email address.",
            "type": "`$STRING`",
          },
          {
            "name": "eventName",
            "req": True,
            "short": "The event's fully qualified name.",
            "type": "`$STRING`",
          },
          {
            "name": "objectId",
            "short": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "occurredAt",
            "short": "The time when this event occurred.",
            "type": "`$STRING`",
          },
          {
            "name": "properties",
            "req": True,
            "short": "The event properties to update.",
            "type": "`$OBJECT`",
          },
          {
            "name": "utk",
            "short": "The visitor's usertoken.",
            "type": "`$STRING`",
          },
          {
            "name": "uuid",
            "short": "A unique identifier for the event occurrence.",
            "type": "`$STRING`",
          },
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
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "send",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "send",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "event_definition_id",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "param",
                      "name": "property_name",
                      "orig": "property_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
                "rename": {
                  "param": {
                    "eventName": "event_definition_id",
                    "propertyName": "property_name",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "event_definition_id",
                  },
                  {
                    "lit": "property",
                  },
                  {
                    "var": "property_name",
                  },
                ],
                "select": {
                  "exist": [
                    "event_definition_id",
                    "property_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{event_definition_id}",
                  "property",
                  "{property_name}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "event_name",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/events/2026-09/event-definitions/{eventName}",
                "rename": {
                  "param": {
                    "eventName": "event_name",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "event_name",
                  },
                ],
                "select": {
                  "exist": [
                    "event_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{event_name}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "event_definition",
            ],
            [
              "event_definition",
              "property",
            ],
          ],
        },
      },
      "batch": {
        "fields": [
          {
            "name": "inputs",
            "req": True,
            "short": "An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.",
            "type": "`$ARRAY`",
          },
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
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "send",
                  },
                  {
                    "lit": "batch",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "send",
                  "batch",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event_definition": {
        "fields": [
          {
            "name": "archived",
            "req": True,
            "short": "A boolean indicating whether the event type is archived.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "associations",
            "req": True,
            "short": "An array of association definitions related to the event type.",
            "type": "`$ARRAY`",
          },
          {
            "name": "comboEventRules",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 21,
              "count": 17,
              "depth": 20,
            },
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "createdUserId",
            "short": "An integer representing the ID of the user who created the event type.",
            "type": "`$INTEGER`",
          },
          {
            "name": "customMatchingId",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "short": "A string providing a description of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "detailTemplate",
            "short": "The rendering template for the body of the CRM timeline activity card.",
            "type": "`$STRING`",
          },
          {
            "name": "fullyQualifiedName",
            "req": True,
            "short": "A string representing the fully qualified name of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "headerTemplate",
            "short": "The rendering template for the header of the CRM timeline activity card.",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "A string representing the unique identifier of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "includeDefaultProperties",
            "req": True,
            "short": "A boolean indicating whether default properties should be included.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "label",
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "A string representing the label of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "A string representing the name of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "objectTypeId",
            "req": True,
            "short": "A string representing the object type ID associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "primaryObject",
            "short": "A string representing the primary object associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "primaryObjectId",
            "short": "A string representing the ID of the primary object associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "properties",
            "req": True,
            "short": "An array of property objects associated with the event type.",
            "type": "`$ARRAY`",
          },
          {
            "name": "propertyDefinitions",
            "req": True,
            "short": "An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.",
            "type": "`$ARRAY`",
          },
          {
            "name": "propertyOrder",
            "req": True,
            "short": "Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.",
            "type": "`$ARRAY`",
          },
          {
            "name": "trackingType",
            "short": "A string indicating the tracking type of the event.",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "updatedUserId",
            "short": "An integer representing the ID of the user who last updated the event type.",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "id",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/events/2026-09/event-definitions/{eventName}",
                "rename": {
                  "param": {
                    "eventName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "id",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/events/2026-09/event-definitions/{eventName}",
                "rename": {
                  "param": {
                    "eventName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "events_collection_response_external_unified_event": {
        "fields": [
          {
            "name": "eventType",
            "req": True,
            "short": "The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "A unique identifier for the event.",
            "type": "`$STRING`",
          },
          {
            "name": "objectId",
            "req": True,
            "short": "The objectId of the object which did the event.",
            "type": "`$STRING`",
          },
          {
            "name": "objectType",
            "req": True,
            "short": "The objectType for the object which did the event.",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "occurredAt",
            "req": True,
            "short": "An ISO 8601 timestamp when the event occurred.",
            "type": "`$STRING`",
          },
          {
            "name": "properties",
            "req": True,
            "short": "A key-value map of event-specific properties.",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "example": None,
                      "kind": "query",
                      "name": "after",
                      "orig": "after",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "before",
                      "orig": "before",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "event_type",
                      "orig": "event_type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "type": "`$ARRAY`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "object_id",
                      "orig": "object_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "object_property_{propname}",
                      "orig": "object_property_{propname}",
                      "type": "`$OBJECT`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "object_type",
                      "orig": "object_type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "occurred_after",
                      "orig": "occurred_after",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "occurred_before",
                      "orig": "occurred_before",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "property",
                      "orig": "property",
                      "type": "`$ARRAY`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "property_{propname}",
                      "orig": "property_{propname}",
                      "type": "`$OBJECT`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$ARRAY`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/events/event-occurrences/2026-09",
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "event-occurrences",
                  },
                  {
                    "lit": "2026-09",
                  },
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
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "event-occurrences",
                  "2026-09",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "events_visible_external_event_type_name": {
        "fields": [
          {
            "name": "eventTypes",
            "req": True,
            "short": "List of event type names.",
            "type": "`$ARRAY`",
          },
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
                    "lit": "events",
                  },
                  {
                    "lit": "event-occurrences",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-types",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.eventTypes`",
                },
                "parts": [
                  "events",
                  "event-occurrences",
                  "2026-09",
                  "event-types",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "manage_event_definitions_collection_response_with_total_external": {
        "fields": [
          {
            "name": "archived",
            "req": True,
            "short": "A boolean indicating whether the event type is archived.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "associations",
            "req": True,
            "short": "An array of association definitions related to the event type.",
            "type": "`$ARRAY`",
          },
          {
            "name": "comboEventRules",
            "req": True,
            "type": "`$OBJECT`",
            "union": {
              "branches": 21,
              "count": 17,
              "depth": 20,
            },
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "createdUserId",
            "short": "An integer representing the ID of the user who created the event type.",
            "type": "`$INTEGER`",
          },
          {
            "name": "customMatchingId",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "short": "A string providing a description of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "detailTemplate",
            "short": "The rendering template for the body of the CRM timeline activity card.",
            "type": "`$STRING`",
          },
          {
            "name": "fullyQualifiedName",
            "req": True,
            "short": "A string representing the fully qualified name of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "headerTemplate",
            "short": "The rendering template for the header of the CRM timeline activity card.",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "A string representing the unique identifier of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "req": True,
            "short": "A string representing the name of the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "objectTypeId",
            "req": True,
            "short": "A string representing the object type ID associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "primaryObject",
            "short": "A string representing the primary object associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "primaryObjectId",
            "short": "A string representing the ID of the primary object associated with the event type.",
            "type": "`$STRING`",
          },
          {
            "name": "properties",
            "req": True,
            "short": "An array of property objects associated with the event type.",
            "type": "`$ARRAY`",
          },
          {
            "name": "trackingType",
            "short": "A string indicating the tracking type of the event.",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "updatedUserId",
            "short": "An integer representing the ID of the user who last updated the event type.",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "example": None,
                      "kind": "query",
                      "name": "after",
                      "orig": "after",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "include_property",
                      "orig": "include_property",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "search_string",
                      "orig": "search_string",
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "query",
                      "name": "sort_order",
                      "orig": "sort_order",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/events/2026-09/event-definitions",
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                ],
                "select": {
                  "exist": [
                    "after",
                    "include_property",
                    "limit",
                    "search_string",
                    "sort_order",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "manage_event_definitions_property": {
        "fields": [
          {
            "name": "description",
            "short": "A string providing additional information about the property.",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "displayOrder",
            "short": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).",
            "type": "`$INTEGER`",
          },
          {
            "name": "hidden",
            "short": "Controls whether or not this property is displayed on the record's activity timeline.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "label",
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "A string representing the display name of the property.",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "A string representing the unique name of the property.",
            "type": "`$STRING`",
          },
          {
            "name": "options",
            "short": "An array of OptionInput objects that define the possible values for the property.",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "req": True,
            "short": "A string indicating the data type of the property.",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "example": None,
                      "kind": "param",
                      "name": "event_name",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/events/2026-09/event-definitions/{eventName}/property",
                "rename": {
                  "param": {
                    "eventName": "event_name",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "event_name",
                  },
                  {
                    "lit": "property",
                  },
                ],
                "select": {
                  "exist": [
                    "event_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{event_name}",
                  "property",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": None,
                      "kind": "param",
                      "name": "event_definition_id",
                      "orig": "event_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": None,
                      "kind": "param",
                      "name": "id",
                      "orig": "property_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
                "rename": {
                  "param": {
                    "eventName": "event_definition_id",
                    "propertyName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "events",
                  },
                  {
                    "lit": "2026-09",
                  },
                  {
                    "lit": "event-definitions",
                  },
                  {
                    "var": "event_definition_id",
                  },
                  {
                    "lit": "property",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "event_definition_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "events",
                  "2026-09",
                  "event-definitions",
                  "{event_definition_id}",
                  "property",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "event_definition",
            ],
          ],
        },
      },
    },
    }
