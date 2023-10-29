"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDU = void 0;
const DCS_1 = require("./DCS");
const PID_1 = require("./PID");
const SCA_1 = require("./SCA/SCA");
class PDU {
    constructor(address, options = {}) {
        this._address = this.findAddress(address);
        this._serviceCenterAddress = options.serviceCenterAddress || new SCA_1.SCA(false);
        this._protocolIdentifier = options.protocolIdentifier || new PID_1.PID();
        this._dataCodingScheme = options.dataCodingScheme || new DCS_1.DCS();
    }
    get address() {
        return this._address;
    }
    setAddress(address) {
        this._address = this.findAddress(address);
        return this;
    }
    get serviceCenterAddress() {
        return this._serviceCenterAddress;
    }
    setServiceCenterAddress(address) {
        if (address instanceof SCA_1.SCA) {
            this._serviceCenterAddress = address;
            return this;
        }
        this._serviceCenterAddress.setPhone(address, false, true);
        return this;
    }
    get protocolIdentifier() {
        return this._protocolIdentifier;
    }
    setProtocolIdentifier(pid) {
        this._protocolIdentifier = pid;
        return this;
    }
    get dataCodingScheme() {
        return this._dataCodingScheme;
    }
    setDataCodingScheme(dcs) {
        this._dataCodingScheme = dcs;
        return this;
    }
    findAddress(address) {
        if (address instanceof SCA_1.SCA) {
            return address;
        }
        return new SCA_1.SCA().setPhone(address);
    }
}
exports.PDU = PDU;
//# sourceMappingURL=PDU.js.map