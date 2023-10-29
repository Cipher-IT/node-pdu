"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliver = void 0;
const Data_1 = require("./utils/Data/Data");
const Helper_1 = require("./utils/Helper");
const PDU_1 = require("./utils/PDU");
const SCTS_1 = require("./utils/SCTS");
const DeliverType_1 = require("./utils/Type/DeliverType");
class Deliver extends PDU_1.PDU {
    constructor(address, data, options = {}) {
        super(address, options);
        this._type = options.type || new DeliverType_1.DeliverType();
        this._data = this.findData(data);
        this._serviceCenterTimeStamp = options.serviceCenterTimeStamp || new SCTS_1.SCTS(this.getDateTime());
    }
    get type() {
        return this._type;
    }
    setType(type) {
        this._type = type;
        return this;
    }
    get data() {
        return this._data;
    }
    setData(data) {
        this._data = this.findData(data);
        return this;
    }
    get serviceCenterTimeStamp() {
        return this._serviceCenterTimeStamp;
    }
    setServiceCenterTimeStamp(time = this.getDateTime()) {
        if (time instanceof SCTS_1.SCTS) {
            this._serviceCenterTimeStamp = time;
            return this;
        }
        this._serviceCenterTimeStamp = new SCTS_1.SCTS(time);
        return this;
    }
    getDateTime() {
        return new Date(Date.now() + 864000000);
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
        return this.getStart();
    }
    getStart() {
        let str = '';
        str += this.serviceCenterAddress.toString();
        str += this._type.toString();
        str += this.address.toString();
        str += Helper_1.Helper.toStringHex(this.protocolIdentifier.getValue());
        str += this.dataCodingScheme.toString();
        str += this._serviceCenterTimeStamp.toString();
        return str;
    }
}
exports.Deliver = Deliver;
//# sourceMappingURL=Deliver.js.map