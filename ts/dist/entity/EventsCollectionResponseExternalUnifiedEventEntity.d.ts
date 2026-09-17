import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { EventsCollectionResponseExternalUnifiedEvent, EventsCollectionResponseExternalUnifiedEventListMatch } from '../HubspotEventsTypes';
declare class EventsCollectionResponseExternalUnifiedEventEntity extends HubspotEventsEntityBase<EventsCollectionResponseExternalUnifiedEvent> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: EventsCollectionResponseExternalUnifiedEventEntity): EventsCollectionResponseExternalUnifiedEventEntity;
    list(this: any, reqmatch?: EventsCollectionResponseExternalUnifiedEventListMatch, ctrl?: Control): Promise<EventsCollectionResponseExternalUnifiedEventEntity[]>;
}
export { EventsCollectionResponseExternalUnifiedEventEntity };
