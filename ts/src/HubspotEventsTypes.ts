// Typed models for the HubspotEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Basic {
  email?: string
  eventName: string
  objectId?: string
  occurredAt?: string
  properties: Record<string, any>
  utk?: string
  uuid?: string
}

export interface BasicCreateData {
  email?: string
  eventName: string
  objectId?: string
  occurredAt?: string
  properties: Record<string, any>
  utk?: string
  uuid?: string
}

export interface BasicRemoveMatch {
  event_name: string
}

export interface Batch {
  inputs: any[]
}

export interface BatchCreateData {
  inputs: any[]
}

export interface EventDefinition {
  archived: boolean
  associations: any[]
  comboEventRules: Record<string, any>
  createdAt?: string
  createdUserId?: number
  customMatchingId: Record<string, any>
  description?: string
  detailTemplate?: string
  fullyQualifiedName: string
  headerTemplate?: string
  id: string
  includeDefaultProperties: boolean
  label: string
  labels: Record<string, any>
  name: string
  objectTypeId: string
  primaryObject?: string
  primaryObjectId?: string
  properties: any[]
  propertyDefinitions: any[]
  propertyOrder: any[]
  trackingType?: string
  updatedAt?: string
  updatedUserId?: number
}

export interface EventDefinitionLoadMatch {
  id: string
}

export interface EventDefinitionCreateData {
  archived: boolean
  associations: any[]
  comboEventRules: Record<string, any>
  createdAt?: string
  createdUserId?: number
  customMatchingId: Record<string, any>
  description?: string
  detailTemplate?: string
  fullyQualifiedName: string
  headerTemplate?: string
  id: string
  includeDefaultProperties: boolean
  label: string
  labels: Record<string, any>
  name: string
  objectTypeId: string
  primaryObject?: string
  primaryObjectId?: string
  properties: any[]
  propertyDefinitions: any[]
  propertyOrder: any[]
  trackingType?: string
  updatedAt?: string
  updatedUserId?: number
}

export interface EventDefinitionUpdateData {
  id: string
  archived?: boolean
  associations?: any[]
  comboEventRules?: Record<string, any>
  createdAt?: string
  createdUserId?: number
  customMatchingId?: Record<string, any>
  description?: string
  detailTemplate?: string
  fullyQualifiedName?: string
  headerTemplate?: string
  includeDefaultProperties?: boolean
  label?: string
  labels?: Record<string, any>
  name?: string
  objectTypeId?: string
  primaryObject?: string
  primaryObjectId?: string
  properties?: any[]
  propertyDefinitions?: any[]
  propertyOrder?: any[]
  trackingType?: string
  updatedAt?: string
  updatedUserId?: number
}

export interface EventsCollectionResponseExternalUnifiedEvent {
  eventType: string
  id: string
  objectId: string
  objectType: string
  occurredAt: string
  properties: Record<string, any>
}

export interface EventsCollectionResponseExternalUnifiedEventListMatch {
  after?: string
  before?: string
  event_type?: string
  id?: any[]
  limit?: number
  object_id?: number
  "object_property_{propname}"?: Record<string, any>
  object_type?: string
  occurred_after?: string
  occurred_before?: string
  property?: any[]
  "property_{propname}"?: Record<string, any>
  sort?: any[]
}

export interface EventsVisibleExternalEventTypeName {
  eventTypes: any[]
}

export interface EventsVisibleExternalEventTypeNameListMatch {
  eventTypes?: any[]
}

export interface ManageEventDefinitionsCollectionResponseWithTotalExternal {
  archived: boolean
  associations: any[]
  comboEventRules: Record<string, any>
  createdAt?: string
  createdUserId?: number
  customMatchingId: Record<string, any>
  description?: string
  detailTemplate?: string
  fullyQualifiedName: string
  headerTemplate?: string
  id: string
  labels: Record<string, any>
  name: string
  objectTypeId: string
  primaryObject?: string
  primaryObjectId?: string
  properties: any[]
  trackingType?: string
  updatedAt?: string
  updatedUserId?: number
}

export interface ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch {
  after?: string
  include_property?: boolean
  limit?: number
  search_string?: string
  sort_order?: string
}

export interface Property {
  description?: string
  displayOrder?: number
  hidden?: boolean
  id?: string
  label: string
  name?: string
  options?: any[]
  type: string
}

export interface PropertyCreateData {
  event_name: string
  description?: string
  displayOrder?: number
  hidden?: boolean
  id?: string
  label: string
  name?: string
  options?: any[]
  type: string
}

export interface PropertyUpdateData {
  event_definition_id: string
  id: string
  description?: string
  displayOrder?: number
  hidden?: boolean
  label?: string
  name?: string
  options?: any[]
  type?: string
}

