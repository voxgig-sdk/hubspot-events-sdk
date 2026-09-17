import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { Batch, BatchCreateData } from '../HubspotEventsTypes';
declare class BatchEntity extends HubspotEventsEntityBase<Batch> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: BatchEntity): BatchEntity;
    create(this: any, reqdata?: BatchCreateData, ctrl?: Control): Promise<BatchEntity>;
}
export { BatchEntity };
