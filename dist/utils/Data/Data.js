"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const DCS_1 = require("../DCS");
const Helper_1 = require("../Helper");
const Header_1 = require("./Header");
const Part_1 = require("./Part");
class Data {
    constructor(options = {}) {
        this._size = options.size || 0;
        this._data = options.data || '';
        this._parts = options.parts || [];
        this._isUnicode = options.isUnicode || false;
    }
    get data() {
        return this._data;
    }
    get size() {
        return this._size;
    }
    get parts() {
        return this._parts;
    }
    get isUnicode() {
        return this._isUnicode;
    }
    setData(data, pdu) {
        this._data = data;
        this.checkData();
        this.prepareParts(pdu);
        return this;
    }
    checkData() {
        this._isUnicode = false;
        this._size = 0;
        for (let i = 0; i < this._data.length; i++) {
            const byte = Helper_1.Helper.order(this._data.substring(i, i + 1));
            if (byte > 0xc0) {
                this._isUnicode = true;
            }
            this._size++;
        }
    }
    prepareParts(pdu) {
        let headerSize = Data.HEADER_SIZE;
        let max = Helper_1.Helper.limitNormal;
        if (this._isUnicode) {
            max = Helper_1.Helper.limitUnicode;
            pdu.dataCodingScheme
                .setTextCompressed(false)
                .setTextAlphabet(DCS_1.DCS.ALPHABET_UCS2);
        }
        if (pdu.dataCodingScheme.compressedText) {
            max = Helper_1.Helper.limitCompress;
            headerSize++;
        }
        const parts = this.splitMessage(max, headerSize);
        const haveHeader = parts.length > 1;
        const uniqID = Math.floor(Math.random() * 0xffff);
        if (haveHeader) {
            pdu.type.setUserDataHeader(1);
        }
        parts.forEach((text, index) => {
            const header = haveHeader ? new Header_1.Header({ SEGMENTS: parts.length, CURRENT: index + 1, POINTER: uniqID }) : undefined;
            const tmp = (() => {
                switch (pdu.dataCodingScheme.textAlphabet) {
                    case DCS_1.DCS.ALPHABET_DEFAULT:
                        return Helper_1.Helper.encode7Bit(text);
                    case DCS_1.DCS.ALPHABET_8BIT:
                        return Helper_1.Helper.encode8Bit(text);
                    case DCS_1.DCS.ALPHABET_UCS2:
                        return Helper_1.Helper.encode16Bit(text);
                    default:
                        throw new Error('node-pdu: Unknown alphabet!');
                }
            })();
            let size = tmp.length;
            const data = tmp.result;
            if (haveHeader) {
                size += headerSize;
            }
            this._parts.push(new Part_1.Part(data, size, '', header));
        });
    }
    partExists(part) {
        for (const p of this._parts) {
            if (part.header === null || p.header === null) {
                throw new Error('node-pdu: Part is missing a header!');
            }
            if (part.header.getPointer() !== p.header.getPointer() || part.header.getSegments() !== p.header.getSegments()) {
                throw new Error('node-pdu: Part from different message!');
            }
            if (p.header.getCurrent() === part.header.getCurrent()) {
                return true;
            }
        }
        return false;
    }
    sortParts() {
        this._parts.sort((p1, p2) => {
            const index1 = p1.header?.getCurrent() || 1;
            const index2 = p2.header?.getCurrent() || 1;
            return index1 > index2 ? 1 : -1;
        });
        this._data = this._parts.map((part) => part.text).join('');
    }
    splitMessage(max, headerSize = Data.HEADER_SIZE) {
        if (this.size <= max) {
            return [this._data];
        }
        const data = [];
        const size = max - headerSize;
        let offset = 0;
        do {
            const part = this._data.substring(offset, offset + size);
            data.push(part);
            offset += size;
        } while (offset < this.size);
        return data;
    }
    getText() {
        return this.data;
    }
    append(pdu) {
        pdu.getParts().forEach((part) => {
            if (!this.partExists(part)) {
                this._parts.push(part);
            }
        });
        this.sortParts();
    }
}
exports.Data = Data;
Data.HEADER_SIZE = 7;
//# sourceMappingURL=Data.js.map