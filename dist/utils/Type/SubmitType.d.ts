import { PDUType } from './PDUType';
export interface SubmitParams {
    replyPath?: number;
    userDataHeader?: number;
    statusReportRequest?: number;
    validityPeriodFormat?: number;
    rejectDuplicates?: number;
}
export declare class SubmitType extends PDUType {
    readonly messageTypeIndicator = 1;
    constructor(params?: SubmitParams);
}
