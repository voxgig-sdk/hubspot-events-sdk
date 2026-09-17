-- Typed models for the HubspotEvents SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Basic
---@field email? string
---@field eventName string
---@field objectId? string
---@field occurredAt? string
---@field properties table
---@field utk? string
---@field uuid? string

---@class BasicCreateData
---@field email? string
---@field eventName string
---@field objectId? string
---@field occurredAt? string
---@field properties table
---@field utk? string
---@field uuid? string

---@class BasicRemoveMatch
---@field event_name string

---@class Batch
---@field inputs table

---@class BatchCreateData
---@field inputs table

---@class EventDefinition
---@field archived boolean
---@field associations table
---@field comboEventRules table
---@field createdAt? string
---@field createdUserId? number
---@field customMatchingId table
---@field description? string
---@field detailTemplate? string
---@field fullyQualifiedName string
---@field headerTemplate? string
---@field id string
---@field includeDefaultProperties boolean
---@field label string
---@field labels table
---@field name string
---@field objectTypeId string
---@field primaryObject? string
---@field primaryObjectId? string
---@field properties table
---@field propertyDefinitions table
---@field propertyOrder table
---@field trackingType? string
---@field updatedAt? string
---@field updatedUserId? number

---@class EventDefinitionLoadMatch
---@field id string

---@class EventDefinitionCreateData
---@field archived boolean
---@field associations table
---@field comboEventRules table
---@field createdAt? string
---@field createdUserId? number
---@field customMatchingId table
---@field description? string
---@field detailTemplate? string
---@field fullyQualifiedName string
---@field headerTemplate? string
---@field id string
---@field includeDefaultProperties boolean
---@field label string
---@field labels table
---@field name string
---@field objectTypeId string
---@field primaryObject? string
---@field primaryObjectId? string
---@field properties table
---@field propertyDefinitions table
---@field propertyOrder table
---@field trackingType? string
---@field updatedAt? string
---@field updatedUserId? number

---@class EventDefinitionUpdateData
---@field id string
---@field archived? boolean
---@field associations? table
---@field comboEventRules? table
---@field createdAt? string
---@field createdUserId? number
---@field customMatchingId? table
---@field description? string
---@field detailTemplate? string
---@field fullyQualifiedName? string
---@field headerTemplate? string
---@field includeDefaultProperties? boolean
---@field label? string
---@field labels? table
---@field name? string
---@field objectTypeId? string
---@field primaryObject? string
---@field primaryObjectId? string
---@field properties? table
---@field propertyDefinitions? table
---@field propertyOrder? table
---@field trackingType? string
---@field updatedAt? string
---@field updatedUserId? number

---@class EventsCollectionResponseExternalUnifiedEvent
---@field eventType string
---@field id string
---@field objectId string
---@field objectType string
---@field occurredAt string
---@field properties table

---@class EventsCollectionResponseExternalUnifiedEventListMatch
---@field after? string
---@field before? string
---@field event_type? string
---@field id? table
---@field limit? number
---@field object_id? number
---@field ["object_property_{propname}"]? table
---@field object_type? string
---@field occurred_after? string
---@field occurred_before? string
---@field property? table
---@field ["property_{propname}"]? table
---@field sort? table

---@class EventsVisibleExternalEventTypeName
---@field eventTypes table

---@class EventsVisibleExternalEventTypeNameListMatch
---@field eventTypes? table

---@class ManageEventDefinitionsCollectionResponseWithTotalExternal
---@field archived boolean
---@field associations table
---@field comboEventRules table
---@field createdAt? string
---@field createdUserId? number
---@field customMatchingId table
---@field description? string
---@field detailTemplate? string
---@field fullyQualifiedName string
---@field headerTemplate? string
---@field id string
---@field labels table
---@field name string
---@field objectTypeId string
---@field primaryObject? string
---@field primaryObjectId? string
---@field properties table
---@field trackingType? string
---@field updatedAt? string
---@field updatedUserId? number

---@class ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch
---@field after? string
---@field include_property? boolean
---@field limit? number
---@field search_string? string
---@field sort_order? string

---@class ManageEventDefinitionsProperty
---@field description? string
---@field displayOrder? number
---@field hidden? boolean
---@field id? string
---@field label string
---@field name? string
---@field options? table
---@field type string

---@class ManageEventDefinitionsPropertyCreateData
---@field event_name string
---@field description? string
---@field displayOrder? number
---@field hidden? boolean
---@field id? string
---@field label string
---@field name? string
---@field options? table
---@field type string

---@class ManageEventDefinitionsPropertyUpdateData
---@field event_definition_id string
---@field id string
---@field description? string
---@field displayOrder? number
---@field hidden? boolean
---@field label? string
---@field name? string
---@field options? table
---@field type? string

local M = {}

return M
