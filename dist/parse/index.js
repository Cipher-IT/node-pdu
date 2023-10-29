"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const tslib_1 = require("tslib");
const Deliver_1 = require("../Deliver");
const Report_1 = require("../Report");
const Submit_1 = require("../Submit");
const DeliverType_1 = require("../utils/Type/DeliverType");
const ReportType_1 = require("../utils/Type/ReportType");
const SubmitType_1 = require("../utils/Type/SubmitType");
const parseData_1 = tslib_1.__importDefault(require("./parseUtils/parseData"));
const parseDCS_1 = tslib_1.__importDefault(require("./parseUtils/parseDCS"));
const parsePID_1 = tslib_1.__importDefault(require("./parseUtils/parsePID"));
const parseSCA_1 = tslib_1.__importDefault(require("./parseUtils/parseSCA"));
const parseSCTS_1 = tslib_1.__importDefault(require("./parseUtils/parseSCTS"));
const parseType_1 = tslib_1.__importDefault(require("./parseUtils/parseType"));
const parseVP_1 = tslib_1.__importDefault(require("./parseUtils/parseVP"));
function parse(str) {
    let pduParse = str.toUpperCase();
    const getSubstr = (length) => {
        const str = pduParse.substring(0, length);
        pduParse = pduParse.substring(length);
        return str;
    };
    const sca = (0, parseSCA_1.default)(getSubstr, false);
    const type = (0, parseType_1.default)(getSubstr);
    if (type instanceof DeliverType_1.DeliverType) {
        return parseDeliver(sca, type, getSubstr);
    }
    if (type instanceof ReportType_1.ReportType) {
        return parseReport(sca, type, getSubstr);
    }
    if (type instanceof SubmitType_1.SubmitType) {
        return parseSubmit(sca, type, getSubstr);
    }
    throw new Error('node-pdu: Unknown SMS type!');
}
exports.parse = parse;
function parseDeliver(serviceCenterAddress, type, getSubstr) {
    const address = (0, parseSCA_1.default)(getSubstr, true);
    const protocolIdentifier = (0, parsePID_1.default)(getSubstr);
    const dataCodingScheme = (0, parseDCS_1.default)(getSubstr);
    const serviceCenterTimeStamp = (0, parseSCTS_1.default)(getSubstr);
    const userDataLength = Buffer.from(getSubstr(2), 'hex')[0];
    const userData = (0, parseData_1.default)(type, dataCodingScheme, userDataLength, getSubstr);
    return new Deliver_1.Deliver(address, userData, { serviceCenterAddress, type, protocolIdentifier, dataCodingScheme, serviceCenterTimeStamp });
}
function parseReport(serviceCenterAddress, type, getSubstr) {
    const referencedBytes = Buffer.from(getSubstr(2), 'hex')[0];
    const address = (0, parseSCA_1.default)(getSubstr, true);
    const timestamp = (0, parseSCTS_1.default)(getSubstr);
    const discharge = (0, parseSCTS_1.default)(getSubstr);
    const status = Buffer.from(getSubstr(2), 'hex')[0];
    return new Report_1.Report(address, referencedBytes, timestamp, discharge, status, { serviceCenterAddress, type });
}
function parseSubmit(serviceCenterAddress, type, getSubstr) {
    const messageReference = Buffer.from(getSubstr(2), 'hex')[0];
    const address = (0, parseSCA_1.default)(getSubstr, true);
    const protocolIdentifier = (0, parsePID_1.default)(getSubstr);
    const dataCodingScheme = (0, parseDCS_1.default)(getSubstr);
    const validityPeriod = (0, parseVP_1.default)(type, getSubstr);
    const userDataLength = Buffer.from(getSubstr(2), 'hex')[0];
    const userData = (0, parseData_1.default)(type, dataCodingScheme, userDataLength, getSubstr);
    return new Submit_1.Submit(address, userData, {
        serviceCenterAddress,
        type,
        messageReference,
        protocolIdentifier,
        dataCodingScheme,
        validityPeriod
    });
}
//# sourceMappingURL=index.js.map