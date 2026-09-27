// Typed models for the HubspotEvents SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hubspot-events-sdk/go/core"
)

// Basic is the typed data model for the basic entity.
type Basic struct {
}

// BasicCreateData is the typed request payload for Basic.CreateTyped.
type BasicCreateData struct {
	Email *string `json:"email,omitempty"`
	EventName string `json:"eventName"`
	ObjectId *string `json:"objectId,omitempty"`
	OccurredAt *string `json:"occurredAt,omitempty"`
	Properties map[string]any `json:"properties"`
	Utk *string `json:"utk,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
}

// BasicRemoveMatch is the typed request payload for Basic.RemoveTyped.
type BasicRemoveMatch struct {
	EventName string `json:"event_name"`
}

// Batch is the typed data model for the batch entity.
type Batch struct {
}

// BatchCreateData is the typed request payload for Batch.CreateTyped.
type BatchCreateData struct {
	Inputs []any `json:"inputs"`
}

// EventDefinition is the typed data model for the event_definition entity.
type EventDefinition struct {
}

// EventDefinitionLoadMatch is the typed request payload for EventDefinition.LoadTyped.
type EventDefinitionLoadMatch struct {
	Id string `json:"id"`
}

// EventDefinitionCreateData is the typed request payload for EventDefinition.CreateTyped.
type EventDefinitionCreateData struct {
	Archived bool `json:"archived"`
	Associations []any `json:"associations"`
	ComboEventRules map[string]any `json:"comboEventRules"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CreatedUserId *int `json:"createdUserId,omitempty"`
	CustomMatchingId map[string]any `json:"customMatchingId"`
	Description *string `json:"description,omitempty"`
	DetailTemplate *string `json:"detailTemplate,omitempty"`
	FullyQualifiedName string `json:"fullyQualifiedName"`
	HeaderTemplate *string `json:"headerTemplate,omitempty"`
	Id string `json:"id"`
	IncludeDefaultProperties bool `json:"includeDefaultProperties"`
	Label string `json:"label"`
	Labels map[string]any `json:"labels"`
	Name string `json:"name"`
	ObjectTypeId string `json:"objectTypeId"`
	PrimaryObject *string `json:"primaryObject,omitempty"`
	PrimaryObjectId *string `json:"primaryObjectId,omitempty"`
	Properties []any `json:"properties"`
	PropertyDefinitions []any `json:"propertyDefinitions"`
	PropertyOrder []any `json:"propertyOrder"`
	TrackingType *string `json:"trackingType,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	UpdatedUserId *int `json:"updatedUserId,omitempty"`
}

// EventDefinitionUpdateData is the typed request payload for EventDefinition.UpdateTyped.
type EventDefinitionUpdateData struct {
	Id string `json:"id"`
	Archived *bool `json:"archived,omitempty"`
	Associations *[]any `json:"associations,omitempty"`
	ComboEventRules *map[string]any `json:"comboEventRules,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CreatedUserId *int `json:"createdUserId,omitempty"`
	CustomMatchingId *map[string]any `json:"customMatchingId,omitempty"`
	Description *string `json:"description,omitempty"`
	DetailTemplate *string `json:"detailTemplate,omitempty"`
	FullyQualifiedName *string `json:"fullyQualifiedName,omitempty"`
	HeaderTemplate *string `json:"headerTemplate,omitempty"`
	IncludeDefaultProperties *bool `json:"includeDefaultProperties,omitempty"`
	Label *string `json:"label,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	ObjectTypeId *string `json:"objectTypeId,omitempty"`
	PrimaryObject *string `json:"primaryObject,omitempty"`
	PrimaryObjectId *string `json:"primaryObjectId,omitempty"`
	Properties *[]any `json:"properties,omitempty"`
	PropertyDefinitions *[]any `json:"propertyDefinitions,omitempty"`
	PropertyOrder *[]any `json:"propertyOrder,omitempty"`
	TrackingType *string `json:"trackingType,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	UpdatedUserId *int `json:"updatedUserId,omitempty"`
}

// EventsCollectionResponseExternalUnifiedEvent is the typed data model for the events_collection_response_external_unified_event entity.
type EventsCollectionResponseExternalUnifiedEvent struct {
}

// EventsCollectionResponseExternalUnifiedEventListMatch is the typed request payload for EventsCollectionResponseExternalUnifiedEvent.ListTyped.
type EventsCollectionResponseExternalUnifiedEventListMatch struct {
	After *string `json:"after,omitempty"`
	Before *string `json:"before,omitempty"`
	EventType *string `json:"event_type,omitempty"`
	Id *[]any `json:"id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	ObjectId *int `json:"object_id,omitempty"`
	ObjectPropertyPropname *map[string]any `json:"object_property_{propname},omitempty"`
	ObjectType *string `json:"object_type,omitempty"`
	OccurredAfter *string `json:"occurred_after,omitempty"`
	OccurredBefore *string `json:"occurred_before,omitempty"`
	Property *[]any `json:"property,omitempty"`
	PropertyPropname *map[string]any `json:"property_{propname},omitempty"`
	Sort *[]any `json:"sort,omitempty"`
}

// EventsVisibleExternalEventTypeName is the typed data model for the events_visible_external_event_type_name entity.
type EventsVisibleExternalEventTypeName struct {
}

// EventsVisibleExternalEventTypeNameListMatch is the typed request payload for EventsVisibleExternalEventTypeName.ListTyped.
type EventsVisibleExternalEventTypeNameListMatch struct {
	EventTypes *[]any `json:"eventTypes,omitempty"`
}

// ManageEventDefinitionsCollectionResponseWithTotalExternal is the typed data model for the manage_event_definitions_collection_response_with_total_external entity.
type ManageEventDefinitionsCollectionResponseWithTotalExternal struct {
}

// ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch is the typed request payload for ManageEventDefinitionsCollectionResponseWithTotalExternal.ListTyped.
type ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch struct {
	After *string `json:"after,omitempty"`
	IncludeProperty *bool `json:"include_property,omitempty"`
	Limit *int `json:"limit,omitempty"`
	SearchString *string `json:"search_string,omitempty"`
	SortOrder *string `json:"sort_order,omitempty"`
}

// Property is the typed data model for the property entity.
type Property struct {
}

// PropertyCreateData is the typed request payload for Property.CreateTyped.
type PropertyCreateData struct {
	EventName string `json:"event_name"`
	Description *string `json:"description,omitempty"`
	DisplayOrder *int `json:"displayOrder,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Id *string `json:"id,omitempty"`
	Label string `json:"label"`
	Name *string `json:"name,omitempty"`
	Options *[]any `json:"options,omitempty"`
	Type string `json:"type"`
}

// PropertyUpdateData is the typed request payload for Property.UpdateTyped.
type PropertyUpdateData struct {
	EventDefinitionId string `json:"event_definition_id"`
	Id string `json:"id"`
	Description *string `json:"description,omitempty"`
	DisplayOrder *int `json:"displayOrder,omitempty"`
	Hidden *bool `json:"hidden,omitempty"`
	Label *string `json:"label,omitempty"`
	Name *string `json:"name,omitempty"`
	Options *[]any `json:"options,omitempty"`
	Type *string `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
