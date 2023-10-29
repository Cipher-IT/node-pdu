"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCTS = void 0;
const Helper_1 = require("./Helper");
class SCTS {
    constructor(date, tzOff) {
        this.time = date.getTime() / 1000;
        this.tzOff = tzOff || -1 * date.getTimezoneOffset();
    }
    getDateTime() {
        const tzAbs = Math.floor(Math.abs(this.tzOff) / 15);
        const x = Math.floor(tzAbs / 10) * 16 + (tzAbs % 10) + (this.tzOff < 0 ? 0x80 : 0x00);
        return this.getDateWithOffset().toISOString().replace(/[-T:]/g, '').slice(2, 14) + Helper_1.Helper.toStringHex(x);
    }
    getDateWithOffset() {
        return new Date(this.time * 1000 + this.tzOff * 60 * 1000);
    }
    getIsoString() {
        const datetime = this.getDateWithOffset()
            .toISOString()
            .replace(/.\d{3}Z$/, '');
        const offset = Math.abs(this.tzOff / 60)
            .toString()
            .padStart(2, '0');
        return datetime + (this.tzOff > 0 ? '+' : '-') + offset + ':00';
    }
    toString() {
        return (this.getDateTime().match(/.{1,2}/g) || []).map((s) => s.split('').reverse().join('')).join('');
    }
}
exports.SCTS = SCTS;
//# sourceMappingURL=SCTS.js.map