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
				"property": map[string]any{},
			},
		},
		"entity": map[string]any{
			"basic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "The visitor's email address.",
					},
					map[string]any{
						"name": "eventName",
						"title": "Event Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The event's fully qualified name.",
					},
					map[string]any{
						"name": "objectId",
						"title": "Object Id",
						"type": "`$STRING`",
						"short": "The ID of the record for which the event occurred (e.g., contact ID or visitor ID).",
					},
					map[string]any{
						"name": "occurredAt",
						"title": "Occurred At",
						"type": "`$STRING`",
						"short": "The time when this event occurred.",
						"format": "date-time",
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The event properties to update.",
					},
					map[string]any{
						"name": "utk",
						"title": "Utk",
						"type": "`$STRING`",
						"short": "The visitor's usertoken.",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"short": "A unique identifier for the event occurrence.",
					},
				},
				"name": "basic",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"events",
									"2026-09",
									"send",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_definition_id}",
									"property",
									"{property_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_definition_id",
										"propertyName": "property_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "event_definition_id",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
										map[string]any{
											"name": "property_name",
											"orig": "property_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_definition_id",
										"property_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/events/2026-09/event-definitions/{eventName}",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "event_name",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.event_definition",
						},
						[]any{
							"$.main.kit.entity.event_definition",
							"$.main.kit.entity.property",
						},
					},
				},
			},
			"batch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "inputs",
						"title": "Inputs",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of BehavioralEventHttpCompletionRequest objects, each representing a single behavioral event to be completed.",
					},
				},
				"name": "batch",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"events",
									"2026-09",
									"send",
									"batch",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Archived",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "A boolean indicating whether the event type is archived.",
					},
					map[string]any{
						"name": "associations",
						"title": "Associations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of association definitions related to the event type.",
					},
					map[string]any{
						"name": "comboEventRules",
						"title": "Combo Event Rules",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
						"format": "date-time",
					},
					map[string]any{
						"name": "createdUserId",
						"title": "Created User Id",
						"type": "`$INTEGER`",
						"short": "An integer representing the ID of the user who created the event type.",
						"format": "int32",
					},
					map[string]any{
						"name": "customMatchingId",
						"title": "Custom Matching Id",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A string providing a description of the event type.",
					},
					map[string]any{
						"name": "detailTemplate",
						"title": "Detail Template",
						"type": "`$STRING`",
						"short": "The rendering template for the body of the CRM timeline activity card.",
					},
					map[string]any{
						"name": "fullyQualifiedName",
						"title": "Fully Qualified Name",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the fully qualified name of the event type.",
					},
					map[string]any{
						"name": "headerTemplate",
						"title": "Header Template",
						"type": "`$STRING`",
						"short": "The rendering template for the header of the CRM timeline activity card.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the unique identifier of the event type.",
					},
					map[string]any{
						"name": "includeDefaultProperties",
						"title": "Include Default Properties",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "A boolean indicating whether default properties should be included.",
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A string representing the label of the event type.",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A string representing the name of the event type.",
					},
					map[string]any{
						"name": "objectTypeId",
						"title": "Object Type Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the object type ID associated with the event type.",
					},
					map[string]any{
						"name": "primaryObject",
						"title": "Primary Object",
						"type": "`$STRING`",
						"short": "A string representing the primary object associated with the event type.",
					},
					map[string]any{
						"name": "primaryObjectId",
						"title": "Primary Object Id",
						"type": "`$STRING`",
						"short": "A string representing the ID of the primary object associated with the event type.",
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of property objects associated with the event type.",
					},
					map[string]any{
						"name": "propertyDefinitions",
						"title": "Property Definitions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of property definitions, each represented by an ExternalBehavioralEventPropertyCreate object.",
					},
					map[string]any{
						"name": "propertyOrder",
						"title": "Property Order",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Specifies the ordering and visibility of event properties when rendered on the CRM timeline activity card.",
					},
					map[string]any{
						"name": "trackingType",
						"title": "Tracking Type",
						"type": "`$STRING`",
						"short": "A string indicating the tracking type of the event.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
						"format": "date-time",
					},
					map[string]any{
						"name": "updatedUserId",
						"title": "Updated User Id",
						"type": "`$INTEGER`",
						"short": "An integer representing the ID of the user who last updated the event type.",
						"format": "int32",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/events/2026-09/event-definitions/{eventName}",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/events/2026-09/event-definitions/{eventName}",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Event Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The format of the `eventType` string is `ae{appId}_{eventTypeLabel}`, `pe{portalId}_{eventTypeLabel}`, or just `e_{eventTypeLabel}` for HubSpot events.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A unique identifier for the event.",
					},
					map[string]any{
						"name": "objectId",
						"title": "Object Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The objectId of the object which did the event.",
					},
					map[string]any{
						"name": "objectType",
						"title": "Object Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The objectType for the object which did the event.",
					},
					map[string]any{
						"name": "occurredAt",
						"title": "Occurred At",
						"type": "`$STRING`",
						"req": true,
						"short": "An ISO 8601 timestamp when the event occurred.",
						"format": "date-time",
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A key-value map of event-specific properties.",
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
								"parts": []any{
									"events",
									"event-occurrences",
									"2026-09",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "before",
											"orig": "before",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "event_type",
											"orig": "event_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$ARRAY`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "object_id",
											"orig": "object_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "object_property_{propname}",
											"orig": "object_property_{propname}",
											"type": "`$OBJECT`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "object_type",
											"orig": "object_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "occurred_after",
											"orig": "occurred_after",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "occurred_before",
											"orig": "occurred_before",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "property",
											"orig": "property",
											"type": "`$ARRAY`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "property_{propname}",
											"orig": "property_{propname}",
											"type": "`$OBJECT`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$ARRAY`",
											"kind": "query",
											"example": nil,
										},
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
						"title": "Event Types",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of event type names.",
					},
				},
				"name": "events_visible_external_event_type_name",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"events",
									"event-occurrences",
									"2026-09",
									"event-types",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.eventTypes`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Archived",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "A boolean indicating whether the event type is archived.",
					},
					map[string]any{
						"name": "associations",
						"title": "Associations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of association definitions related to the event type.",
					},
					map[string]any{
						"name": "comboEventRules",
						"title": "Combo Event Rules",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "A string representing the date and time when the event type was created, in ISO 8601 format.",
						"format": "date-time",
					},
					map[string]any{
						"name": "createdUserId",
						"title": "Created User Id",
						"type": "`$INTEGER`",
						"short": "An integer representing the ID of the user who created the event type.",
						"format": "int32",
					},
					map[string]any{
						"name": "customMatchingId",
						"title": "Custom Matching Id",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A string providing a description of the event type.",
					},
					map[string]any{
						"name": "detailTemplate",
						"title": "Detail Template",
						"type": "`$STRING`",
						"short": "The rendering template for the body of the CRM timeline activity card.",
					},
					map[string]any{
						"name": "fullyQualifiedName",
						"title": "Fully Qualified Name",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the fully qualified name of the event type.",
					},
					map[string]any{
						"name": "headerTemplate",
						"title": "Header Template",
						"type": "`$STRING`",
						"short": "The rendering template for the header of the CRM timeline activity card.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the unique identifier of the event type.",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the name of the event type.",
					},
					map[string]any{
						"name": "objectTypeId",
						"title": "Object Type Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A string representing the object type ID associated with the event type.",
					},
					map[string]any{
						"name": "primaryObject",
						"title": "Primary Object",
						"type": "`$STRING`",
						"short": "A string representing the primary object associated with the event type.",
					},
					map[string]any{
						"name": "primaryObjectId",
						"title": "Primary Object Id",
						"type": "`$STRING`",
						"short": "A string representing the ID of the primary object associated with the event type.",
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of property objects associated with the event type.",
					},
					map[string]any{
						"name": "trackingType",
						"title": "Tracking Type",
						"type": "`$STRING`",
						"short": "A string indicating the tracking type of the event.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "A string representing the date and time when the event type was last updated, in ISO 8601 format.",
						"format": "date-time",
					},
					map[string]any{
						"name": "updatedUserId",
						"title": "Updated User Id",
						"type": "`$INTEGER`",
						"short": "An integer representing the ID of the user who last updated the event type.",
						"format": "int32",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "include_property",
											"orig": "include_property",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "search_string",
											"orig": "search_string",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
										map[string]any{
											"name": "sort_order",
											"orig": "sort_order",
											"type": "`$STRING`",
											"kind": "query",
											"example": nil,
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"property": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A string providing additional information about the property.",
					},
					map[string]any{
						"name": "displayOrder",
						"title": "Display Order",
						"type": "`$INTEGER`",
						"short": "For not hidden properties, indicates the order to display the property on the record's activity timeline (ex: displayOrder: 0 is at the top).",
						"format": "int32",
					},
					map[string]any{
						"name": "hidden",
						"title": "Hidden",
						"type": "`$BOOLEAN`",
						"short": "Controls whether or not this property is displayed on the record's activity timeline.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A string representing the display name of the property.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "A string representing the unique name of the property.",
					},
					map[string]any{
						"name": "options",
						"title": "Options",
						"type": "`$ARRAY`",
						"short": "An array of OptionInput objects that define the possible values for the property.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "A string indicating the data type of the property.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "property",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/events/2026-09/event-definitions/{eventName}/property",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_name}",
									"property",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "event_name",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_name",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/events/2026-09/event-definitions/{eventName}/property/{propertyName}",
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
								"parts": []any{
									"events",
									"2026-09",
									"event-definitions",
									"{event_definition_id}",
									"property",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"eventName": "event_definition_id",
										"propertyName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "event_definition_id",
											"orig": "event_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
										map[string]any{
											"name": "id",
											"orig": "property_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": nil,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event_definition_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.event_definition",
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
