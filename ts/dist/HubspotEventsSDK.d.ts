import { BasicEntity } from './entity/BasicEntity';
import { BatchEntity } from './entity/BatchEntity';
import { EventDefinitionEntity } from './entity/EventDefinitionEntity';
import { EventsCollectionResponseExternalUnifiedEventEntity } from './entity/EventsCollectionResponseExternalUnifiedEventEntity';
import { EventsVisibleExternalEventTypeNameEntity } from './entity/EventsVisibleExternalEventTypeNameEntity';
import { ManageEventDefinitionsCollectionResponseWithTotalExternalEntity } from './entity/ManageEventDefinitionsCollectionResponseWithTotalExternalEntity';
import { PropertyEntity } from './entity/PropertyEntity';
export type * from './HubspotEventsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HubspotEventsEntityBase } from './HubspotEventsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HubspotEventsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Basic(entopts?: Record<string, any>): BasicEntity;
    Batch(entopts?: Record<string, any>): BatchEntity;
    EventDefinition(entopts?: Record<string, any>): EventDefinitionEntity;
    EventsCollectionResponseExternalUnifiedEvent(entopts?: Record<string, any>): EventsCollectionResponseExternalUnifiedEventEntity;
    EventsVisibleExternalEventTypeName(entopts?: Record<string, any>): EventsVisibleExternalEventTypeNameEntity;
    ManageEventDefinitionsCollectionResponseWithTotalExternal(entopts?: Record<string, any>): ManageEventDefinitionsCollectionResponseWithTotalExternalEntity;
    Property(entopts?: Record<string, any>): PropertyEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HubspotEventsSDK;
    tester(testopts?: any, sdkopts?: any): HubspotEventsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HubspotEventsSDK;
export { stdutil, config, BaseFeature, HubspotEventsEntityBase, HubspotEventsSDK, SDK, };
