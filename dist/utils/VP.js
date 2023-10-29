"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VP = void 0;
const Helper_1 = require("./Helper");
const SCTS_1 = require("./SCTS");
const PDUType_1 = require("./Type/PDUType");
class VP {
    constructor(options = {}) {
        this._datetime = options.datetime || null;
        this._interval = options.interval || null;
    }
    get dateTime() {
        return this._datetime;
    }
    setDateTime(datetime) {
        if (datetime instanceof Date) {
            this._datetime = datetime;
            return this;
        }
        this._datetime = new Date(Date.parse(datetime));
        return this;
    }
    get interval() {
        return this._interval;
    }
    setInterval(interval) {
        this._interval = interval;
        return this;
    }
    toString(pdu) {
        const type = pdu.type;
        if (this._datetime !== null) {
            type.setValidityPeriodFormat(PDUType_1.PDUType.VPF_ABSOLUTE);
            return new SCTS_1.SCTS(this._datetime).toString();
        }
        if (this._interval) {
            type.setValidityPeriodFormat(PDUType_1.PDUType.VPF_RELATIVE);
            const minutes = Math.ceil(this._interval / 60);
            const hours = Math.ceil(this._interval / 60 / 60);
            const days = Math.ceil(this._interval / 60 / 60 / 24);
            const weeks = Math.ceil(this._interval / 60 / 60 / 24 / 7);
            if (hours <= 12) {
                return Helper_1.Helper.toStringHex(Math.ceil(minutes / 5) - 1);
            }
            if (hours <= 24) {
                return Helper_1.Helper.toStringHex(Math.ceil((minutes - 720) / 30) + 143);
            }
            if (hours <= 30 * 24 * 3600) {
                return Helper_1.Helper.toStringHex(days + 166);
            }
            return Helper_1.Helper.toStringHex((weeks > 63 ? 63 : weeks) + 192);
        }
        type.setValidityPeriodFormat(PDUType_1.PDUType.VPF_NONE);
        return '';
    }
}
exports.VP = VP;
VP.PID_ASSIGNED = 0x00;
//# sourceMappingURL=VP.js.map