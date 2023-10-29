"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PID = void 0;
class PID {
    constructor(options = {}) {
        this._pid = options.pid || PID.PID_ASSIGNED;
        this._indicates = options.indicates || 0x00;
        this._type = options.type || PID.TYPE_IMPLICIT;
    }
    get pid() {
        return this._pid;
    }
    setPid(pid) {
        this._pid = 0x03 & pid;
        return this;
    }
    get indicates() {
        return this._indicates;
    }
    setIndicates(indicates) {
        this._indicates = 0x01 & indicates;
        return this;
    }
    get type() {
        return this._type;
    }
    setType(type) {
        this._type = 0x1f & type;
        return this;
    }
    getValue() {
        return (this._pid << 6) | (this._indicates << 5) | this._type;
    }
    toString() {
        return '' + this.getValue();
    }
}
exports.PID = PID;
PID.PID_ASSIGNED = 0x00;
PID.PID_GSM_03_40 = 0x01;
PID.PID_RESERVED = 0x02;
PID.PID_SPECIFIC = 0x03;
PID.TYPE_IMPLICIT = 0x00;
PID.TYPE_TELEX = 0x01;
PID.TYPE_TELEFAX = 0x02;
PID.TYPE_VOICE = 0x04;
PID.TYPE_ERMES = 0x05;
PID.TYPE_NPS = 0x06;
PID.TYPE_X_400 = 0x11;
PID.TYPE_IEM = 0x12;
//# sourceMappingURL=PID.js.map