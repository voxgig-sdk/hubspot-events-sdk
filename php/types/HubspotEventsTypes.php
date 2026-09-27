<?php
declare(strict_types=1);

// Typed models for the HubspotEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Basic entity data model. */
class Basic
{
    public ?string $email = null;
    public string $eventName;
    public ?string $objectId = null;
    public ?string $occurredAt = null;
    public array $properties;
    public ?string $utk = null;
    public ?string $uuid = null;
}

/** Request payload for Basic#create. */
class BasicCreateData
{
    public ?string $email = null;
    public string $eventName;
    public ?string $objectId = null;
    public ?string $occurredAt = null;
    public array $properties;
    public ?string $utk = null;
    public ?string $uuid = null;
}

/** Request payload for Basic#remove. */
class BasicRemoveMatch
{
    public string $event_name;
}

/** Batch entity data model. */
class Batch
{
    public array $inputs;
}

/** Request payload for Batch#create. */
class BatchCreateData
{
    public array $inputs;
}

/** EventDefinition entity data model. */
class EventDefinition
{
    public bool $archived;
    public array $associations;
    public array $comboEventRules;
    public ?string $createdAt = null;
    public ?int $createdUserId = null;
    public array $customMatchingId;
    public ?string $description = null;
    public ?string $detailTemplate = null;
    public string $fullyQualifiedName;
    public ?string $headerTemplate = null;
    public string $id;
    public bool $includeDefaultProperties;
    public string $label;
    public array $labels;
    public string $name;
    public string $objectTypeId;
    public ?string $primaryObject = null;
    public ?string $primaryObjectId = null;
    public array $properties;
    public array $propertyDefinitions;
    public array $propertyOrder;
    public ?string $trackingType = null;
    public ?string $updatedAt = null;
    public ?int $updatedUserId = null;
}

/** Request payload for EventDefinition#load. */
class EventDefinitionLoadMatch
{
    public string $id;
}

/** Request payload for EventDefinition#create. */
class EventDefinitionCreateData
{
    public bool $archived;
    public array $associations;
    public array $comboEventRules;
    public ?string $createdAt = null;
    public ?int $createdUserId = null;
    public array $customMatchingId;
    public ?string $description = null;
    public ?string $detailTemplate = null;
    public string $fullyQualifiedName;
    public ?string $headerTemplate = null;
    public string $id;
    public bool $includeDefaultProperties;
    public string $label;
    public array $labels;
    public string $name;
    public string $objectTypeId;
    public ?string $primaryObject = null;
    public ?string $primaryObjectId = null;
    public array $properties;
    public array $propertyDefinitions;
    public array $propertyOrder;
    public ?string $trackingType = null;
    public ?string $updatedAt = null;
    public ?int $updatedUserId = null;
}

/** Request payload for EventDefinition#update. */
class EventDefinitionUpdateData
{
    public string $id;
    public ?bool $archived = null;
    public ?array $associations = null;
    public ?array $comboEventRules = null;
    public ?string $createdAt = null;
    public ?int $createdUserId = null;
    public ?array $customMatchingId = null;
    public ?string $description = null;
    public ?string $detailTemplate = null;
    public ?string $fullyQualifiedName = null;
    public ?string $headerTemplate = null;
    public ?bool $includeDefaultProperties = null;
    public ?string $label = null;
    public ?array $labels = null;
    public ?string $name = null;
    public ?string $objectTypeId = null;
    public ?string $primaryObject = null;
    public ?string $primaryObjectId = null;
    public ?array $properties = null;
    public ?array $propertyDefinitions = null;
    public ?array $propertyOrder = null;
    public ?string $trackingType = null;
    public ?string $updatedAt = null;
    public ?int $updatedUserId = null;
}

/** EventsCollectionResponseExternalUnifiedEvent entity data model. */
class EventsCollectionResponseExternalUnifiedEvent
{
    public string $eventType;
    public string $id;
    public string $objectId;
    public string $objectType;
    public string $occurredAt;
    public array $properties;
}

/** Request payload for EventsCollectionResponseExternalUnifiedEvent#list. */
class EventsCollectionResponseExternalUnifiedEventListMatch
{
    public ?string $after = null;
    public ?string $before = null;
    public ?string $event_type = null;
    public ?array $id = null;
    public ?int $limit = null;
    public ?int $object_id = null;
    public ?string $object_type = null;
    public ?string $occurred_after = null;
    public ?string $occurred_before = null;
    public ?array $property = null;
    public ?array $sort = null;
}

/** EventsVisibleExternalEventTypeName entity data model. */
class EventsVisibleExternalEventTypeName
{
    public array $eventTypes;
}

/** Request payload for EventsVisibleExternalEventTypeName#list. */
class EventsVisibleExternalEventTypeNameListMatch
{
    public ?array $eventTypes = null;
}

/** ManageEventDefinitionsCollectionResponseWithTotalExternal entity data model. */
class ManageEventDefinitionsCollectionResponseWithTotalExternal
{
    public bool $archived;
    public array $associations;
    public array $comboEventRules;
    public ?string $createdAt = null;
    public ?int $createdUserId = null;
    public array $customMatchingId;
    public ?string $description = null;
    public ?string $detailTemplate = null;
    public string $fullyQualifiedName;
    public ?string $headerTemplate = null;
    public string $id;
    public array $labels;
    public string $name;
    public string $objectTypeId;
    public ?string $primaryObject = null;
    public ?string $primaryObjectId = null;
    public array $properties;
    public ?string $trackingType = null;
    public ?string $updatedAt = null;
    public ?int $updatedUserId = null;
}

/** Request payload for ManageEventDefinitionsCollectionResponseWithTotalExternal#list. */
class ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch
{
    public ?string $after = null;
    public ?bool $include_property = null;
    public ?int $limit = null;
    public ?string $search_string = null;
    public ?string $sort_order = null;
}

/** Property entity data model. */
class Property
{
    public ?string $description = null;
    public ?int $displayOrder = null;
    public ?bool $hidden = null;
    public ?string $id = null;
    public string $label;
    public ?string $name = null;
    public ?array $options = null;
    public string $type;
}

/** Request payload for Property#create. */
class PropertyCreateData
{
    public string $event_name;
    public ?string $description = null;
    public ?int $displayOrder = null;
    public ?bool $hidden = null;
    public ?string $id = null;
    public string $label;
    public ?string $name = null;
    public ?array $options = null;
    public string $type;
}

/** Request payload for Property#update. */
class PropertyUpdateData
{
    public string $event_definition_id;
    public string $id;
    public ?string $description = null;
    public ?int $displayOrder = null;
    public ?bool $hidden = null;
    public ?string $label = null;
    public ?string $name = null;
    public ?array $options = null;
    public ?string $type = null;
}

