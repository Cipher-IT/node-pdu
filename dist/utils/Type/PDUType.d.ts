export interface TypeParams {
    replyPath: number;
    userDataHeader: number;
    statusReportRequest: number;
    validityPeriodFormat: number;
    rejectDuplicates: number;
}
export declare abstract class PDUType {
    abstract messageTypeIndicator: number;
    static readonly SMS_SUBMIT = 1;
    static readonly SMS_DELIVER = 0;
    static readonly SMS_REPORT = 2;
    static readonly VPF_NONE = 0;
    static readonly VPF_SIEMENS = 1;
    static readonly VPF_RELATIVE = 2;
    static readonly VPF_ABSOLUTE = 3;
    private readonly replyPath;
    private readonly rejectDuplicates;
    private _userDataHeader;
    private _statusReportRequest;
    private _validityPeriodFormat;
    constructor(params: TypeParams);
    get userDataHeader(): number;
    setUserDataHeader(userDataHeader: number): this;
    get statusReportRequest(): number;
    setStatusReportRequest(srr: number): this;
    get validityPeriodFormat(): number;
    setValidityPeriodFormat(validityPeriodFormat: number): this;
    getValue(): number;
    toString(): string;
}
