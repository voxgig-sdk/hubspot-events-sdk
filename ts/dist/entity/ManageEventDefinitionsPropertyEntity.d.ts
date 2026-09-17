import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { ManageEventDefinitionsProperty, ManageEventDefinitionsPropertyCreateData, ManageEventDefinitionsPropertyUpdateData } from '../HubspotEventsTypes';
declare class ManageEventDefinitionsPropertyEntity extends HubspotEventsEntityBase<ManageEventDefinitionsProperty> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: ManageEventDefinitionsPropertyEntity): ManageEventDefinitionsPropertyEntity;
    create(this: any, reqdata?: ManageEventDefinitionsPropertyCreateData, ctrl?: Control): Promise<ManageEventDefinitionsPropertyEntity>;
    update(this: any, reqdata?: ManageEventDefinitionsPropertyUpdateData, ctrl?: Control): Promise<ManageEventDefinitionsPropertyEntity>;
}
export { ManageEventDefinitionsPropertyEntity };
