"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCAType = void 0;
const Helper_1 = require("../Helper");
class SCAType {
    constructor(value = 0x91) {
        this._type = 0x07 & (value >> 4);
        this._plan = 0x0f & value;
    }
    get type() {
        return this._type;
    }
    setType(type) {
        this._type = 0x07 & type;
        return this;
    }
    get plan() {
        return this._plan;
    }
    setPlan(plan) {
        this._plan = 0x0f & plan;
        return this;
    }
    getValue() {
        return (1 << 7) | (this._type << 4) | this._plan;
    }
    toString() {
        return Helper_1.Helper.toStringHex(this.getValue());
    }
}
exports.SCAType = SCAType;
SCAType.TYPE_UNKNOWN = 0x00;
SCAType.TYPE_INTERNATIONAL = 0x01;
SCAType.TYPE_NATIONAL = 0x02;
SCAType.TYPE_ACCEPTER_INTO_NET = 0x03;
SCAType.TYPE_SUBSCRIBER_NET = 0x04;
SCAType.TYPE_ALPHANUMERICAL = 0x05;
SCAType.TYPE_TRIMMED = 0x06;
SCAType.TYPE_RESERVED = 0x07;
SCAType.PLAN_UNKNOWN = 0x00;
SCAType.PLAN_ISDN = 0x01;
SCAType.PLAN_X_121 = 0x02;
SCAType.PLAN_TELEX = 0x03;
SCAType.PLAN_NATIONAL = 0x08;
SCAType.PLAN_INDIVIDUAL = 0x09;
SCAType.PLAN_ERMES = 0x0a;
SCAType.PLAN_RESERVED = 0x0f;
//# sourceMappingURL=SCAType.js.map