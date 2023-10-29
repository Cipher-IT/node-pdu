import { Data } from './utils/Data/Data';
import { PDU, PDUOptions } from './utils/PDU';
import { SCA } from './utils/SCA/SCA';
import { SubmitType } from './utils/Type/SubmitType';
import { VP } from './utils/VP';
export interface SubmitOptions extends PDUOptions {
    type?: SubmitType;
    messageReference?: number;
    validityPeriod?: VP;
}
export declare class Submit extends PDU {
    private _type;
    private _data;
    private _messageReference;
    private _validityPeriod;
    constructor(address: string | SCA, data: string | Data, options?: SubmitOptions);
    get type(): SubmitType;
    get data(): Data;
    get messageReference(): number;
    get validityPeriod(): VP;
    setType(type: SubmitType): this;
    setData(data: string | Data): this;
    setMessageReference(messageReference: number): this;
    setValidityPeriod(value: VP | string | number): this;
    private findData;
    getParts(): import("./utils").Part[];
    getPartStrings(): string[];
    toString(): string;
    getStart(): string;
}
