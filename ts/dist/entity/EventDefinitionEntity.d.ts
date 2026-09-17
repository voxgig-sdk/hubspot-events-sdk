import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { EventDefinition, EventDefinitionLoadMatch, EventDefinitionCreateData, EventDefinitionUpdateData } from '../HubspotEventsTypes';
declare class EventDefinitionEntity extends HubspotEventsEntityBase<EventDefinition> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: EventDefinitionEntity): EventDefinitionEntity;
    load(this: any, reqmatch?: EventDefinitionLoadMatch, ctrl?: Control): Promise<EventDefinitionEntity>;
    create(this: any, reqdata?: EventDefinitionCreateData, ctrl?: Control): Promise<EventDefinitionEntity>;
    update(this: any, reqdata?: EventDefinitionUpdateData, ctrl?: Control): Promise<EventDefinitionEntity>;
}
export { EventDefinitionEntity };
