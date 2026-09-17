package voxgighubspoteventssdk

import (
	"github.com/voxgig-sdk/hubspot-events-sdk/go/core"
	"github.com/voxgig-sdk/hubspot-events-sdk/go/entity"
	"github.com/voxgig-sdk/hubspot-events-sdk/go/feature"
	_ "github.com/voxgig-sdk/hubspot-events-sdk/go/utility"
)

// Type aliases preserve external API.
type HubspotEventsSDK = core.HubspotEventsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HubspotEventsEntity = core.HubspotEventsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HubspotEventsError = core.HubspotEventsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBasicEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewBasicEntity(client, entopts)
	}
	core.NewBatchEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewBatchEntity(client, entopts)
	}
	core.NewEventDefinitionEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewEventDefinitionEntity(client, entopts)
	}
	core.NewEventsCollectionResponseExternalUnifiedEventEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewEventsCollectionResponseExternalUnifiedEventEntity(client, entopts)
	}
	core.NewEventsVisibleExternalEventTypeNameEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewEventsVisibleExternalEventTypeNameEntity(client, entopts)
	}
	core.NewManageEventDefinitionsCollectionResponseWithTotalExternalEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewManageEventDefinitionsCollectionResponseWithTotalExternalEntity(client, entopts)
	}
	core.NewManageEventDefinitionsPropertyEntityFunc = func(client *core.HubspotEventsSDK, entopts map[string]any) core.HubspotEventsEntity {
		return entity.NewManageEventDefinitionsPropertyEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHubspotEventsSDK = core.NewHubspotEventsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHubspotEventsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *HubspotEventsSDK  { return NewHubspotEventsSDK(nil) }
func Test() *HubspotEventsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
