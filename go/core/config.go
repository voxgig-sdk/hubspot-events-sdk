package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HubspotEvents",
			"slug": "hubspot-events",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.hubapi.com",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "hapikey",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"basic": map[string]any{},
				"batch": map[string]any{},
				"event_definition": map[string]any{},
				"events_collection_response_external_unified_event": map[string]any{},
				"events_visible_external_event_type_name": map[string]any{},
				"manage_event_definitions_collection_response_with_total_external": map[string]any{},
				"manage_event_definitions_property": map[string]any{},
			},
		},
		"entity": map[string]any{
			"basic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"short": "The visitor's email address.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eventName",
						"req": true,
						"short": "The event's fully qualified name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectId",
						"short": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "occurredAt",
						"short": "The time when this event occurred.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"short": "The event properties to update.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "utk",
						"short": "The visitor's usertoken.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uuid",
						"short": "A unique identifier for the event occurrence.",
						"type": "`$STRING`",
					},
				},
				"name": "basic",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/events/2026-09/send",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "send",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"send",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "event_definition_id",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "property_name",
											"orig": "property_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_definition_id",
										"propertyName": "property_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "event_definition_id",
									},
									map[string]any{
										"lit": "property",
									},
									map[string]any{
										"var": "property_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_definition_id",
										"property_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_definition_id}",
									"property",
									"{property_name}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "event_name",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/events/2026-09/event-definitions/{eventName}",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "event_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_name}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"event_definition",
						},
						[]any{
							"event_definition",
							"property",
						},
					},
				},
			},
			"batch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "inputs",
						"req": true,
						"short": "An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.",
						"type": "`$ARRAY`",
					},
				},
				"name": "batch",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/events/2026-09/send/batch",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "send",
									},
									map[string]any{
										"lit": "batch",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"send",
									"batch",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event_definition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "archived",
						"req": true,
						"short": "A boolean indicating whether the event type is archived.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "associations",
						"req": true,
						"short": "An array of association definitions related to the event type.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "comboEventRules",
						"req": true,
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 21,
							"count": 17,
							"depth": 20,
						},
					},
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "createdUserId",
						"short": "An integer representing the ID of the user who created the event type.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "customMatchingId",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"short": "A string providing a description of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "detailTemplate",
						"short": "The rendering template for the body of the CRM timeline activity card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullyQualifiedName",
						"req": true,
						"short": "A string representing the fully qualified name of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "headerTemplate",
						"short": "The rendering template for the header of the CRM timeline activity card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A string representing the unique identifier of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "includeDefaultProperties",
						"req": true,
						"short": "A boolean indicating whether default properties should be included.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "label",
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "A string representing the label of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "A string representing the name of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectTypeId",
						"req": true,
						"short": "A string representing the object type ID associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryObject",
						"short": "A string representing the primary object associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryObjectId",
						"short": "A string representing the ID of the primary object associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"short": "An array of property objects associated with the event type.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "propertyDefinitions",
						"req": true,
						"short": "An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "propertyOrder",
						"req": true,
						"short": "Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trackingType",
						"short": "A string indicating the tracking type of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "updatedUserId",
						"short": "An integer representing the ID of the user who last updated the event type.",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "event_definition",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/events/2026-09/event-definitions",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "id",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/events/2026-09/event-definitions/{eventName}",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "id",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/events/2026-09/event-definitions/{eventName}",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"events_collection_response_external_unified_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "eventType",
						"req": true,
						"short": "The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A unique identifier for the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectId",
						"req": true,
						"short": "The objectId of the object which did the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectType",
						"req": true,
						"short": "The objectType for the object which did the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "occurredAt",
						"req": true,
						"short": "An ISO 8601 timestamp when the event occurred.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"short": "A key-value map of event-specific properties.",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "events_collection_response_external_unified_event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "before",
											"orig": "before",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "event_type",
											"orig": "event_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "id",
											"orig": "id",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "object_id",
											"orig": "object_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "object_property_{propname}",
											"orig": "object_property_{propname}",
											"type": "`$OBJECT`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "object_type",
											"orig": "object_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "occurred_after",
											"orig": "occurred_after",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "occurred_before",
											"orig": "occurred_before",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "property",
											"orig": "property",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "property_{propname}",
											"orig": "property_{propname}",
											"type": "`$OBJECT`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$ARRAY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/events/event-occurrences/2026-09",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "event-occurrences",
									},
									map[string]any{
										"lit": "2026-09",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"event-occurrences",
									"2026-09",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"events_visible_external_event_type_name": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "eventTypes",
						"req": true,
						"short": "List of event type names.",
						"type": "`$ARRAY`",
					},
				},
				"name": "events_visible_external_event_type_name",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/events/event-occurrences/2026-09/event-types",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "event-occurrences",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-types",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.eventTypes`",
								},
								"parts": []any{
									"events",
									"event-occurrences",
									"2026-09",
									"event-types",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"manage_event_definitions_collection_response_with_total_external": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "archived",
						"req": true,
						"short": "A boolean indicating whether the event type is archived.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "associations",
						"req": true,
						"short": "An array of association definitions related to the event type.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "comboEventRules",
						"req": true,
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 21,
							"count": 17,
							"depth": 20,
						},
					},
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "createdUserId",
						"short": "An integer representing the ID of the user who created the event type.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "customMatchingId",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"short": "A string providing a description of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "detailTemplate",
						"short": "The rendering template for the body of the CRM timeline activity card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullyQualifiedName",
						"req": true,
						"short": "A string representing the fully qualified name of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "headerTemplate",
						"short": "The rendering template for the header of the CRM timeline activity card.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A string representing the unique identifier of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "A string representing the name of the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectTypeId",
						"req": true,
						"short": "A string representing the object type ID associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryObject",
						"short": "A string representing the primary object associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryObjectId",
						"short": "A string representing the ID of the primary object associated with the event type.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"short": "An array of property objects associated with the event type.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trackingType",
						"short": "A string indicating the tracking type of the event.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "updatedUserId",
						"short": "An integer representing the ID of the user who last updated the event type.",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "manage_event_definitions_collection_response_with_total_external",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "include_property",
											"orig": "include_property",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "search_string",
											"orig": "search_string",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "query",
											"name": "sort_order",
											"orig": "sort_order",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/events/2026-09/event-definitions",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"after",
										"include_property",
										"limit",
										"search_string",
										"sort_order",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"manage_event_definitions_property": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "A string providing additional information about the property.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "displayOrder",
						"short": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "hidden",
						"short": "Controls whether or not this property is displayed on the record's activity timeline.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label",
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "A string representing the display name of the property.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "A string representing the unique name of the property.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "options",
						"short": "An array of OptionInput objects that define the possible values for the property.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "A string indicating the data type of the property.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "manage_event_definitions_property",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "event_name",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/events/2026-09/event-definitions/{eventName}/property",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "event_name",
									},
									map[string]any{
										"lit": "property",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_name}",
									"property",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "event_definition_id",
											"orig": "event_name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": nil,
											"kind": "param",
											"name": "id",
											"orig": "property_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_definition_id",
										"propertyName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"lit": "2026-09",
									},
									map[string]any{
										"lit": "event-definitions",
									},
									map[string]any{
										"var": "event_definition_id",
									},
									map[string]any{
										"lit": "property",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_definition_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_definition_id}",
									"property",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"event_definition",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
