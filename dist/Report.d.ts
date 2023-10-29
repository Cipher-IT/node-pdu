import { PDU, PDUOptions } from './utils/PDU';
import { SCA } from './utils/SCA/SCA';
import { SCTS } from './utils/SCTS';
import { ReportType } from './utils/Type/ReportType';
export interface ReportOptions extends PDUOptions {
    type?: ReportType;
}
export declare class Report extends PDU {
    private _type;
    private _reference;
    private _dateTime;
    private _discharge;
    private _status;
    constructor(address: string | SCA, reference: number, dateTime: SCTS, discharge: SCTS, status: number, options?: ReportOptions);
    get type(): ReportType;
    setType(type: ReportType): this;
    get reference(): number;
    setReference(reference: number): this;
    get dateTime(): SCTS;
    setDateTime(dateTime: SCTS): this;
    get discharge(): SCTS;
    setDischarge(discharge: SCTS): this;
    get status(): number;
    setStatus(status: number): this;
}
