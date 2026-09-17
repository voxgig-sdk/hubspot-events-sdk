# HubspotEvents SDK utility: make_context

from projectname_sdk.core.context import HubspotEventsContext


def make_context_util(ctxmap, basectx):
    return HubspotEventsContext(ctxmap, basectx)
