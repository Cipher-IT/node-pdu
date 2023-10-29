import { PDUType } from './PDUType';
export interface ReportParams {
    replyPath?: number;
    userDataHeader?: number;
    statusReportRequest?: number;
    mms?: number;
}
export declare class ReportType extends PDUType {
    readonly messageTypeIndicator = 2;
    constructor(params?: ReportParams);
}
