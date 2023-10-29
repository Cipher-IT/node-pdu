import { Data } from './utils/Data/Data';
import { PDU, PDUOptions } from './utils/PDU';
import { SCA } from './utils/SCA/SCA';
import { SCTS } from './utils/SCTS';
import { DeliverType } from './utils/Type/DeliverType';
export interface DeliverOptions extends PDUOptions {
    type?: DeliverType;
    serviceCenterTimeStamp?: SCTS;
}
export declare class Deliver extends PDU {
    private _type;
    private _data;
    private _serviceCenterTimeStamp;
    constructor(address: string | SCA, data: string | Data, options?: DeliverOptions);
    get type(): DeliverType;
    setType(type: DeliverType): this;
    get data(): Data;
    setData(data: string | Data): this;
    get serviceCenterTimeStamp(): SCTS;
    setServiceCenterTimeStamp(time?: Date | SCTS): this;
    private getDateTime;
    private findData;
    getParts(): import("./utils").Part[];
    getPartStrings(): string[];
    toString(): string;
    getStart(): string;
}
