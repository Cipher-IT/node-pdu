"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part = void 0;
const Helper_1 = require("../Helper");
class Part {
    constructor(data, size, text, header) {
        this.data = data;
        this.size = size;
        this.text = text;
        this.header = header || null;
    }
    getPduString(pdu) {
        return pdu.getStart();
    }
    getPartSize() {
        return Helper_1.Helper.toStringHex(this.size);
    }
    toString(pdu) {
        return this.getPduString(pdu) + this.getPartSize() + (this.header || '') + this.data;
    }
}
exports.Part = Part;
//# sourceMappingURL=Part.js.map