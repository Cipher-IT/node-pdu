"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submit = void 0;
const Data_1 = require("./utils/Data/Data");
const Helper_1 = require("./utils/Helper");
const PDU_1 = require("./utils/PDU");
const SubmitType_1 = require("./utils/Type/SubmitType");
const VP_1 = require("./utils/VP");
class Submit extends PDU_1.PDU {
    constructor(address, data, options = {}) {
        super(address, options);
        this._type = options.type || new SubmitType_1.SubmitType();
        this._data = this.findData(data);
        this._messageReference = options.messageReference || 0x00;
        this._validityPeriod = options.validityPeriod || new VP_1.VP();
    }
    get type() {
        return this._type;
    }
    get data() {
        return this._data;
    }
    get messageReference() {
        return this._messageReference;
    }
    get validityPeriod() {
        return this._validityPeriod;
    }
    setType(type) {
        this._type = type;
        return this;
    }
    setData(data) {
        this._data = this.findData(data);
        return this;
    }
    setMessageReference(messageReference) {
        this._messageReference = messageReference;
        return this;
    }
    setValidityPeriod(value) {
        if (value instanceof VP_1.VP) {
            this._validityPeriod = value;
            return this;
        }
        this._validityPeriod = new VP_1.VP();
        if (typeof value === 'string') {
            this._validityPeriod.setDateTime(value);
        }
        else {
            this._validityPeriod.setInterval(value);
        }
        return this;
    }
    findData(data) {
        if (data instanceof Data_1.Data) {
            return data;
        }
        return new Data_1.Data().setData(data, this);
    }
    getParts() {
        return this._data.parts;
    }
    getPartStrings() {
        return this._data.parts.map((part) => part.toString(this));
    }
    toString() {
        return this.getParts()
            .map((part) => part.toString(this))
            .join('\n');
    }
    getStart() {
        let str = '';
        str += this.serviceCenterAddress.toString();
        str += this._type.toString();
        str += Helper_1.Helper.toStringHex(this._messageReference);
        str += this.address.toString();
        str += Helper_1.Helper.toStringHex(this.protocolIdentifier.getValue());
        str += this.dataCodingScheme.toString();
        str += this._validityPeriod.toString(this);
        return str;
    }
}
exports.Submit = Submit;
//# sourceMappingURL=Submit.js.map