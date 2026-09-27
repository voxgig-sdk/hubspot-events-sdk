package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBasicEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewBatchEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewEventDefinitionEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewEventsCollectionResponseExternalUnifiedEventEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewEventsVisibleExternalEventTypeNameEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewManageEventDefinitionsCollectionResponseWithTotalExternalEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

var NewPropertyEntityFunc func(client *HubspotEventsSDK, entopts map[string]any) HubspotEventsEntity

