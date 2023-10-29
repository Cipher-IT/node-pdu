"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitType = void 0;
const PDUType_1 = require("./PDUType");
class SubmitType extends PDUType_1.PDUType {
    constructor(params = {}) {
        super({
            replyPath: params.replyPath ? 1 & params.replyPath : 0,
            userDataHeader: params.userDataHeader ? 1 & params.userDataHeader : 0,
            statusReportRequest: params.statusReportRequest ? 1 & params.statusReportRequest : 0,
            validityPeriodFormat: params.validityPeriodFormat ? 3 & params.validityPeriodFormat : 0,
            rejectDuplicates: params.rejectDuplicates ? 1 & params.rejectDuplicates : 0
        });
        this.messageTypeIndicator = PDUType_1.PDUType.SMS_SUBMIT;
    }
}
exports.SubmitType = SubmitType;
//# sourceMappingURL=SubmitType.js.map