import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { Basic, BasicCreateData, BasicRemoveMatch } from '../HubspotEventsTypes';
declare class BasicEntity extends HubspotEventsEntityBase<Basic> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: BasicEntity): BasicEntity;
    create(this: any, reqdata?: BasicCreateData, ctrl?: Control): Promise<BasicEntity>;
    remove(this: any, reqmatch?: BasicRemoveMatch, ctrl?: Control): Promise<BasicEntity>;
}
export { BasicEntity };
