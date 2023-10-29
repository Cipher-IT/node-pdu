"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDUType = void 0;
const Helper_1 = require("../Helper");
class PDUType {
    constructor(params) {
        this.replyPath = params.replyPath;
        this._userDataHeader = params.userDataHeader;
        this._statusReportRequest = params.statusReportRequest;
        this._validityPeriodFormat = params.validityPeriodFormat;
        this.rejectDuplicates = params.rejectDuplicates;
    }
    get userDataHeader() {
        return this._userDataHeader;
    }
    setUserDataHeader(userDataHeader) {
        this._userDataHeader = 0x01 & userDataHeader;
        return this;
    }
    get statusReportRequest() {
        return this._statusReportRequest;
    }
    setStatusReportRequest(srr) {
        this._statusReportRequest = 0x01 & srr;
        return this;
    }
    get validityPeriodFormat() {
        return this._validityPeriodFormat;
    }
    setValidityPeriodFormat(validityPeriodFormat) {
        this._validityPeriodFormat = 0x03 & validityPeriodFormat;
        switch (this._validityPeriodFormat) {
            case PDUType.VPF_NONE:
                break;
            case PDUType.VPF_SIEMENS:
                break;
            case PDUType.VPF_RELATIVE:
                break;
            case PDUType.VPF_ABSOLUTE:
                break;
            default:
                throw new Error('node-pdu: Wrong validity period format!');
        }
        return this;
    }
    getValue() {
        return (((1 & this.replyPath) << 7) |
            ((1 & this._userDataHeader) << 6) |
            ((1 & this._statusReportRequest) << 5) |
            ((3 & this._validityPeriodFormat) << 3) |
            ((1 & this.rejectDuplicates) << 2) |
            (3 & this.messageTypeIndicator));
    }
    toString() {
        return Helper_1.Helper.toStringHex(this.getValue());
    }
}
exports.PDUType = PDUType;
PDUType.SMS_SUBMIT = 0x01;
PDUType.SMS_DELIVER = 0x00;
PDUType.SMS_REPORT = 0x02;
PDUType.VPF_NONE = 0x00;
PDUType.VPF_SIEMENS = 0x01;
PDUType.VPF_RELATIVE = 0x02;
PDUType.VPF_ABSOLUTE = 0x03;
//# sourceMappingURL=PDUType.js.map