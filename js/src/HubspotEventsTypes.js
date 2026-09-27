// Typed models for the HubspotEvents SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Basic
 * @property {string} [email]
 * @property {string} eventName
 * @property {string} [objectId]
 * @property {string} [occurredAt]
 * @property {Object} properties
 * @property {string} [utk]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} BasicCreateData
 * @property {string} [email]
 * @property {string} eventName
 * @property {string} [objectId]
 * @property {string} [occurredAt]
 * @property {Object} properties
 * @property {string} [utk]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} BasicRemoveMatch
 * @property {string} event_name
 */

/**
 * @typedef {Object} Batch
 * @property {Array} inputs
 */

/**
 * @typedef {Object} BatchCreateData
 * @property {Array} inputs
 */

/**
 * @typedef {Object} EventDefinition
 * @property {boolean} archived
 * @property {Array} associations
 * @property {Object} comboEventRules
 * @property {string} [createdAt]
 * @property {number} [createdUserId]
 * @property {Object} customMatchingId
 * @property {string} [description]
 * @property {string} [detailTemplate]
 * @property {string} fullyQualifiedName
 * @property {string} [headerTemplate]
 * @property {string} id
 * @property {boolean} includeDefaultProperties
 * @property {string} label
 * @property {Object} labels
 * @property {string} name
 * @property {string} objectTypeId
 * @property {string} [primaryObject]
 * @property {string} [primaryObjectId]
 * @property {Array} properties
 * @property {Array} propertyDefinitions
 * @property {Array} propertyOrder
 * @property {string} [trackingType]
 * @property {string} [updatedAt]
 * @property {number} [updatedUserId]
 */

/**
 * @typedef {Object} EventDefinitionLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EventDefinitionCreateData
 * @property {boolean} archived
 * @property {Array} associations
 * @property {Object} comboEventRules
 * @property {string} [createdAt]
 * @property {number} [createdUserId]
 * @property {Object} customMatchingId
 * @property {string} [description]
 * @property {string} [detailTemplate]
 * @property {string} fullyQualifiedName
 * @property {string} [headerTemplate]
 * @property {string} id
 * @property {boolean} includeDefaultProperties
 * @property {string} label
 * @property {Object} labels
 * @property {string} name
 * @property {string} objectTypeId
 * @property {string} [primaryObject]
 * @property {string} [primaryObjectId]
 * @property {Array} properties
 * @property {Array} propertyDefinitions
 * @property {Array} propertyOrder
 * @property {string} [trackingType]
 * @property {string} [updatedAt]
 * @property {number} [updatedUserId]
 */

/**
 * @typedef {Object} EventDefinitionUpdateData
 * @property {string} id
 * @property {boolean} [archived]
 * @property {Array} [associations]
 * @property {Object} [comboEventRules]
 * @property {string} [createdAt]
 * @property {number} [createdUserId]
 * @property {Object} [customMatchingId]
 * @property {string} [description]
 * @property {string} [detailTemplate]
 * @property {string} [fullyQualifiedName]
 * @property {string} [headerTemplate]
 * @property {boolean} [includeDefaultProperties]
 * @property {string} [label]
 * @property {Object} [labels]
 * @property {string} [name]
 * @property {string} [objectTypeId]
 * @property {string} [primaryObject]
 * @property {string} [primaryObjectId]
 * @property {Array} [properties]
 * @property {Array} [propertyDefinitions]
 * @property {Array} [propertyOrder]
 * @property {string} [trackingType]
 * @property {string} [updatedAt]
 * @property {number} [updatedUserId]
 */

/**
 * @typedef {Object} EventsCollectionResponseExternalUnifiedEvent
 * @property {string} eventType
 * @property {string} id
 * @property {string} objectId
 * @property {string} objectType
 * @property {string} occurredAt
 * @property {Object} properties
 */

/**
 * @typedef {Object} EventsCollectionResponseExternalUnifiedEventListMatch
 * @property {string} [after]
 * @property {string} [before]
 * @property {string} [event_type]
 * @property {Array} [id]
 * @property {number} [limit]
 * @property {number} [object_id]
 * @property {Object} ["object_property_{propname}"]
 * @property {string} [object_type]
 * @property {string} [occurred_after]
 * @property {string} [occurred_before]
 * @property {Array} [property]
 * @property {Object} ["property_{propname}"]
 * @property {Array} [sort]
 */

/**
 * @typedef {Object} EventsVisibleExternalEventTypeName
 * @property {Array} eventTypes
 */

/**
 * @typedef {Object} EventsVisibleExternalEventTypeNameListMatch
 * @property {Array} [eventTypes]
 */

/**
 * @typedef {Object} ManageEventDefinitionsCollectionResponseWithTotalExternal
 * @property {boolean} archived
 * @property {Array} associations
 * @property {Object} comboEventRules
 * @property {string} [createdAt]
 * @property {number} [createdUserId]
 * @property {Object} customMatchingId
 * @property {string} [description]
 * @property {string} [detailTemplate]
 * @property {string} fullyQualifiedName
 * @property {string} [headerTemplate]
 * @property {string} id
 * @property {Object} labels
 * @property {string} name
 * @property {string} objectTypeId
 * @property {string} [primaryObject]
 * @property {string} [primaryObjectId]
 * @property {Array} properties
 * @property {string} [trackingType]
 * @property {string} [updatedAt]
 * @property {number} [updatedUserId]
 */

/**
 * @typedef {Object} ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch
 * @property {string} [after]
 * @property {boolean} [include_property]
 * @property {number} [limit]
 * @property {string} [search_string]
 * @property {string} [sort_order]
 */

/**
 * @typedef {Object} Property
 * @property {string} [description]
 * @property {number} [displayOrder]
 * @property {boolean} [hidden]
 * @property {string} [id]
 * @property {string} label
 * @property {string} [name]
 * @property {Array} [options]
 * @property {string} type
 */

/**
 * @typedef {Object} PropertyCreateData
 * @property {string} event_name
 * @property {string} [description]
 * @property {number} [displayOrder]
 * @property {boolean} [hidden]
 * @property {string} [id]
 * @property {string} label
 * @property {string} [name]
 * @property {Array} [options]
 * @property {string} type
 */

/**
 * @typedef {Object} PropertyUpdateData
 * @property {string} event_definition_id
 * @property {string} id
 * @property {string} [description]
 * @property {number} [displayOrder]
 * @property {boolean} [hidden]
 * @property {string} [label]
 * @property {string} [name]
 * @property {Array} [options]
 * @property {string} [type]
 */

