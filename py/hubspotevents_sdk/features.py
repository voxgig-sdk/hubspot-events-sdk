# HubspotEvents SDK feature factory

from hubspotevents_sdk.feature.base_feature import HubspotEventsBaseFeature
from hubspotevents_sdk.feature.debug_feature import HubspotEventsDebugFeature
from hubspotevents_sdk.feature.idempotency_feature import HubspotEventsIdempotencyFeature
from hubspotevents_sdk.feature.metrics_feature import HubspotEventsMetricsFeature
from hubspotevents_sdk.feature.paging_feature import HubspotEventsPagingFeature
from hubspotevents_sdk.feature.ratelimit_feature import HubspotEventsRatelimitFeature
from hubspotevents_sdk.feature.retry_feature import HubspotEventsRetryFeature
from hubspotevents_sdk.feature.test_feature import HubspotEventsTestFeature
from hubspotevents_sdk.feature.timeout_feature import HubspotEventsTimeoutFeature


_FEATURES = {
    "base": lambda: HubspotEventsBaseFeature(),
    "debug": lambda: HubspotEventsDebugFeature(),
    "idempotency": lambda: HubspotEventsIdempotencyFeature(),
    "metrics": lambda: HubspotEventsMetricsFeature(),
    "paging": lambda: HubspotEventsPagingFeature(),
    "ratelimit": lambda: HubspotEventsRatelimitFeature(),
    "retry": lambda: HubspotEventsRetryFeature(),
    "test": lambda: HubspotEventsTestFeature(),
    "timeout": lambda: HubspotEventsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
