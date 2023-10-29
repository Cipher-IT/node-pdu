"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const Helper_1 = require("../Helper");
class Header {
    constructor(params) {
        this.ies = [];
        if (Array.isArray(params)) {
            for (const ie of params) {
                const buf = Buffer.from(ie.dataHex, 'hex');
                if (ie.type === Header.IE_CONCAT_8BIT_REF) {
                    this.concatIeIdx = this.ies.length;
                    this.ies.push({
                        type: ie.type,
                        dataHex: ie.dataHex,
                        data: {
                            msgRef: buf[0],
                            maxMsgNum: buf[1],
                            msgSeqNo: buf[2]
                        }
                    });
                    continue;
                }
                if (ie.type === Header.IE_CONCAT_16BIT_REF) {
                    this.concatIeIdx = this.ies.length;
                    this.ies.push({
                        type: ie.type,
                        dataHex: ie.dataHex,
                        data: {
                            msgRef: (buf[0] << 8) | buf[1],
                            maxMsgNum: buf[2],
                            msgSeqNo: buf[3]
                        }
                    });
                    continue;
                }
                this.ies.push({
                    type: ie.type,
                    dataHex: ie.dataHex
                });
            }
            return;
        }
        const dataHex = Helper_1.Helper.toStringHex(params.POINTER, 4) + Helper_1.Helper.toStringHex(params.SEGMENTS) + Helper_1.Helper.toStringHex(params.CURRENT);
        this.ies.push({
            type: Header.IE_CONCAT_16BIT_REF,
            dataHex: dataHex,
            data: {
                msgRef: params.POINTER,
                maxMsgNum: params.SEGMENTS,
                msgSeqNo: params.CURRENT
            }
        });
        this.concatIeIdx = this.ies.length - 1;
    }
    toJSON() {
        return {
            POINTER: this.getPointer(),
            SEGMENTS: this.getSegments(),
            CURRENT: this.getCurrent()
        };
    }
    getSize() {
        let udhl = 0;
        this.ies.forEach((ie) => {
            udhl += 2 + ie.dataHex.length / 2;
        });
        return udhl;
    }
    getType() {
        if (this.concatIeIdx !== undefined) {
            return this.ies[this.concatIeIdx].type;
        }
        return;
    }
    getPointerSize() {
        if (this.concatIeIdx !== undefined) {
            this.ies[this.concatIeIdx].dataHex.length / 2;
        }
        return 0;
    }
    getPointer() {
        if (this.concatIeIdx !== undefined) {
            return this.ies[this.concatIeIdx].data?.msgRef;
        }
        return 0;
    }
    getSegments() {
        if (this.concatIeIdx !== undefined) {
            return this.ies[this.concatIeIdx].data?.maxMsgNum;
        }
        return 1;
    }
    getCurrent() {
        if (this.concatIeIdx !== undefined) {
            return this.ies[this.concatIeIdx].data?.msgSeqNo;
        }
        return 1;
    }
    toString() {
        let udhl = 0;
        let head = '';
        this.ies.forEach((ie) => {
            udhl += 2 + ie.dataHex.length / 2;
            head += Helper_1.Helper.toStringHex(ie.type) + Helper_1.Helper.toStringHex(ie.dataHex.length / 2) + ie.dataHex;
        });
        return Helper_1.Helper.toStringHex(udhl) + head;
    }
}
exports.Header = Header;
Header.IE_CONCAT_8BIT_REF = 0x00;
Header.IE_CONCAT_16BIT_REF = 0x08;
//# sourceMappingURL=Header.js.map