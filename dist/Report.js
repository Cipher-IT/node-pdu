"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const PDU_1 = require("./utils/PDU");
const ReportType_1 = require("./utils/Type/ReportType");
class Report extends PDU_1.PDU {
    constructor(address, reference, dateTime, discharge, status, options = {}) {
        super(address, options);
        this._type = options.type || new ReportType_1.ReportType();
        this._reference = reference;
        this._dateTime = dateTime;
        this._discharge = discharge;
        this._status = status;
    }
    get type() {
        return this._type;
    }
    setType(type) {
        this._type = type;
        return this;
    }
    get reference() {
        return this._reference;
    }
    setReference(reference) {
        this._reference = reference;
        return this;
    }
    get dateTime() {
        return this._dateTime;
    }
    setDateTime(dateTime) {
        this._dateTime = dateTime;
        return this;
    }
    get discharge() {
        return this._discharge;
    }
    setDischarge(discharge) {
        this._discharge = discharge;
        return this;
    }
    get status() {
        return this._status;
    }
    setStatus(status) {
        this._status = status;
        return this;
    }
}
exports.Report = Report;
//# sourceMappingURL=Report.js.map