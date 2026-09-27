import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { Property, PropertyCreateData, PropertyUpdateData } from '../HubspotEventsTypes';
declare class PropertyEntity extends HubspotEventsEntityBase<Property> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: PropertyEntity): PropertyEntity;
    create(this: any, reqdata?: PropertyCreateData, ctrl?: Control): Promise<PropertyEntity>;
    update(this: any, reqdata?: PropertyUpdateData, ctrl?: Control): Promise<PropertyEntity>;
}
export { PropertyEntity };
