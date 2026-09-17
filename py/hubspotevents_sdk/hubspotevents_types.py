# Typed models for the HubspotEvents SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BasicRequired(TypedDict):
    eventName: str
    properties: dict


class Basic(BasicRequired, total=False):
    email: str
    objectId: str
    occurredAt: str
    utk: str
    uuid: str


class BasicCreateDataRequired(TypedDict):
    eventName: str
    properties: dict


class BasicCreateData(BasicCreateDataRequired, total=False):
    email: str
    objectId: str
    occurredAt: str
    utk: str
    uuid: str


class BasicRemoveMatch(TypedDict):
    event_name: str


class Batch(TypedDict):
    inputs: list


class BatchCreateData(TypedDict):
    inputs: list


class EventDefinitionRequired(TypedDict):
    archived: bool
    associations: list
    comboEventRules: dict
    customMatchingId: dict
    fullyQualifiedName: str
    id: str
    includeDefaultProperties: bool
    label: str
    labels: dict
    name: str
    objectTypeId: str
    properties: list
    propertyDefinitions: list
    propertyOrder: list


class EventDefinition(EventDefinitionRequired, total=False):
    createdAt: str
    createdUserId: int
    description: str
    detailTemplate: str
    headerTemplate: str
    primaryObject: str
    primaryObjectId: str
    trackingType: str
    updatedAt: str
    updatedUserId: int


class EventDefinitionLoadMatch(TypedDict):
    id: str


class EventDefinitionCreateDataRequired(TypedDict):
    archived: bool
    associations: list
    comboEventRules: dict
    customMatchingId: dict
    fullyQualifiedName: str
    id: str
    includeDefaultProperties: bool
    label: str
    labels: dict
    name: str
    objectTypeId: str
    properties: list
    propertyDefinitions: list
    propertyOrder: list


class EventDefinitionCreateData(EventDefinitionCreateDataRequired, total=False):
    createdAt: str
    createdUserId: int
    description: str
    detailTemplate: str
    headerTemplate: str
    primaryObject: str
    primaryObjectId: str
    trackingType: str
    updatedAt: str
    updatedUserId: int


class EventDefinitionUpdateDataRequired(TypedDict):
    id: str


class EventDefinitionUpdateData(EventDefinitionUpdateDataRequired, total=False):
    archived: bool
    associations: list
    comboEventRules: dict
    createdAt: str
    createdUserId: int
    customMatchingId: dict
    description: str
    detailTemplate: str
    fullyQualifiedName: str
    headerTemplate: str
    includeDefaultProperties: bool
    label: str
    labels: dict
    name: str
    objectTypeId: str
    primaryObject: str
    primaryObjectId: str
    properties: list
    propertyDefinitions: list
    propertyOrder: list
    trackingType: str
    updatedAt: str
    updatedUserId: int


class EventsCollectionResponseExternalUnifiedEvent(TypedDict):
    eventType: str
    id: str
    objectId: str
    objectType: str
    occurredAt: str
    properties: dict


class EventsCollectionResponseExternalUnifiedEventListMatch(TypedDict, total=False):
    after: str
    before: str
    event_type: str
    id: list
    limit: int
    object_id: int
    object_type: str
    occurred_after: str
    occurred_before: str
    property: list
    sort: list


class EventsVisibleExternalEventTypeName(TypedDict):
    eventTypes: list


class EventsVisibleExternalEventTypeNameListMatch(TypedDict, total=False):
    eventTypes: list


class ManageEventDefinitionsCollectionResponseWithTotalExternalRequired(TypedDict):
    archived: bool
    associations: list
    comboEventRules: dict
    customMatchingId: dict
    fullyQualifiedName: str
    id: str
    labels: dict
    name: str
    objectTypeId: str
    properties: list


class ManageEventDefinitionsCollectionResponseWithTotalExternal(ManageEventDefinitionsCollectionResponseWithTotalExternalRequired, total=False):
    createdAt: str
    createdUserId: int
    description: str
    detailTemplate: str
    headerTemplate: str
    primaryObject: str
    primaryObjectId: str
    trackingType: str
    updatedAt: str
    updatedUserId: int


class ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch(TypedDict, total=False):
    after: str
    include_property: bool
    limit: int
    search_string: str
    sort_order: str


class ManageEventDefinitionsPropertyRequired(TypedDict):
    label: str
    type: str


class ManageEventDefinitionsProperty(ManageEventDefinitionsPropertyRequired, total=False):
    description: str
    displayOrder: int
    hidden: bool
    id: str
    name: str
    options: list


class ManageEventDefinitionsPropertyCreateDataRequired(TypedDict):
    event_name: str
    label: str
    type: str


class ManageEventDefinitionsPropertyCreateData(ManageEventDefinitionsPropertyCreateDataRequired, total=False):
    description: str
    displayOrder: int
    hidden: bool
    id: str
    name: str
    options: list


class ManageEventDefinitionsPropertyUpdateDataRequired(TypedDict):
    event_definition_id: str
    id: str


class ManageEventDefinitionsPropertyUpdateData(ManageEventDefinitionsPropertyUpdateDataRequired, total=False):
    description: str
    displayOrder: int
    hidden: bool
    label: str
    name: str
    options: list
    type: str
