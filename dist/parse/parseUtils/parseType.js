"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeliverType_1 = require("../../utils/Type/DeliverType");
const PDUType_1 = require("../../utils/Type/PDUType");
const ReportType_1 = require("../../utils/Type/ReportType");
const SubmitType_1 = require("../../utils/Type/SubmitType");
function parseType(getPduSubstr) {
    const buffer = Buffer.from(getPduSubstr(2), 'hex');
    const byte = buffer[0];
    const params = {
        replyPath: 1 & (byte >> 7),
        userDataHeader: 1 & (byte >> 6),
        statusReportRequest: 1 & (byte >> 5),
        validityPeriodFormat: 3 & (byte >> 3),
        rejectDuplicates: 1 & (byte >> 2),
        messageTypeIndicator: 3 & byte
    };
    switch (3 & byte) {
        case PDUType_1.PDUType.SMS_DELIVER:
            return new DeliverType_1.DeliverType(params);
        case PDUType_1.PDUType.SMS_SUBMIT:
            return new SubmitType_1.SubmitType(params);
        case PDUType_1.PDUType.SMS_REPORT:
            return new ReportType_1.ReportType(params);
        default:
            throw new Error('node-pdu: Unknown SMS type!');
    }
}
exports.default = parseType;
//# sourceMappingURL=parseType.js.map