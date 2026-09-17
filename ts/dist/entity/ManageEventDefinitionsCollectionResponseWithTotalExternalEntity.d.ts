import { HubspotEventsEntityBase } from '../HubspotEventsEntityBase';
import type { HubspotEventsSDK } from '../HubspotEventsSDK';
import type { Control } from '../types';
import type { ManageEventDefinitionsCollectionResponseWithTotalExternal, ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch } from '../HubspotEventsTypes';
declare class ManageEventDefinitionsCollectionResponseWithTotalExternalEntity extends HubspotEventsEntityBase<ManageEventDefinitionsCollectionResponseWithTotalExternal> {
    constructor(client: HubspotEventsSDK, entopts: any);
    make(this: ManageEventDefinitionsCollectionResponseWithTotalExternalEntity): ManageEventDefinitionsCollectionResponseWithTotalExternalEntity;
    list(this: any, reqmatch?: ManageEventDefinitionsCollectionResponseWithTotalExternalListMatch, ctrl?: Control): Promise<ManageEventDefinitionsCollectionResponseWithTotalExternalEntity[]>;
}
export { ManageEventDefinitionsCollectionResponseWithTotalExternalEntity };
