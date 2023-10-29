import { PDUType } from './PDUType';
export interface DeliverParams {
    replyPath?: number;
    userDataHeader?: number;
    statusReportRequest?: number;
    mms?: number;
}
export declare class DeliverType extends PDUType {
    readonly messageTypeIndicator = 0;
    constructor(params?: DeliverParams);
}
