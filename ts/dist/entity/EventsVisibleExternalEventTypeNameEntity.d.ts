import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { EventsVisibleExternalEventTypeName, EventsVisibleExternalEventTypeNameListMatch } from '../HubspotEventsTypes';
declare class EventsVisibleExternalEventTypeNameEntity extends HubspotEventsEntityBase<EventsVisibleExternalEventTypeName> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: EventsVisibleExternalEventTypeNameEntity): EventsVisibleExternalEventTypeNameEntity;
    list(this: any, reqmatch?: EventsVisibleExternalEventTypeNameListMatch, ctrl?: Control): Promise<EventsVisibleExternalEventTypeNameEntity[]>;
}
export { EventsVisibleExternalEventTypeNameEntity };
