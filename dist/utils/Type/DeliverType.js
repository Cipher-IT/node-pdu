"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverType = void 0;
const PDUType_1 = require("./PDUType");
class DeliverType extends PDUType_1.PDUType {
    constructor(params = {}) {
        super({
            replyPath: params.replyPath ? 1 & params.replyPath : 0,
            userDataHeader: params.userDataHeader ? 1 & params.userDataHeader : 0,
            statusReportRequest: params.statusReportRequest ? 1 & params.statusReportRequest : 0,
            rejectDuplicates: params.mms ? 1 & params.mms : 0,
            validityPeriodFormat: 0x00
        });
        this.messageTypeIndicator = PDUType_1.PDUType.SMS_DELIVER;
    }
}
exports.DeliverType = DeliverType;
//# sourceMappingURL=DeliverType.js.map