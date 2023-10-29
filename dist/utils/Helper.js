"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    static ucfirst(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    static order(char) {
        return char.charCodeAt(0);
    }
    static char(order) {
        return String.fromCharCode(order);
    }
    static decode16Bit(text) {
        return (text.match(/.{1,4}/g) || [])
            .map((hex) => {
            const buffer = Buffer.from(hex, 'hex');
            return Helper.char((buffer[0] << 8) | buffer[1]);
        })
            .join('');
    }
    static decode8Bit(text) {
        return (text.match(/.{1,2}/g) || [])
            .map((hex) => {
            const buffer = Buffer.from(hex, 'hex');
            return Helper.char(buffer[0]);
        })
            .join('');
    }
    static decode7Bit(text, inLen, alignBits) {
        const ret = [];
        const data = Buffer.from(text, 'hex');
        let dataPos = 0;
        let buf = 0;
        let bufLen = 0;
        let inDone = 0;
        let inExt = false;
        if (alignBits && data.length) {
            alignBits = alignBits % 7;
            buf = data[dataPos++];
            buf >>= alignBits;
            bufLen = 8 - alignBits;
        }
        while (!(bufLen < 7 && dataPos === data.length)) {
            if (bufLen < 7) {
                if (dataPos === data.length) {
                    break;
                }
                buf |= data[dataPos++] << bufLen;
                bufLen += 8;
            }
            let digit = buf & 0x7f;
            buf >>= 7;
            bufLen -= 7;
            inDone++;
            if (digit % 128 === 27) {
                inExt = true;
            }
            else {
                let c;
                if (inExt) {
                    c = Helper.EXTENDED_TABLE.charCodeAt(digit);
                    inExt = false;
                }
                else {
                    c = Helper.ALPHABET_7BIT.charCodeAt(digit);
                }
                if (c < 0x80) {
                    ret.push(c);
                }
                else if (c < 0x800) {
                    ret.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
                }
                else if ((c & 0xfc00) === 0xd800 &&
                    digit + 1 < Helper.EXTENDED_TABLE.length &&
                    (Helper.EXTENDED_TABLE.charCodeAt(digit + 1) & 0xfc00) === 0xdc00) {
                    c = 0x10000 + ((c & 0x03ff) << 10) + (Helper.EXTENDED_TABLE.charCodeAt(++digit) & 0x03ff);
                    ret.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
                }
                else {
                    ret.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
                }
            }
            if (inLen === undefined) {
                if (dataPos === data.length && bufLen === 7 && !buf) {
                    break;
                }
            }
            else {
                if (inDone >= inLen) {
                    break;
                }
            }
        }
        return Buffer.from(ret).toString();
    }
    static encode8Bit(text) {
        let length = 0;
        let pdu = '';
        const buffer = Buffer.from(text, 'ascii');
        for (let i = 0; i < buffer.length; i++) {
            pdu += this.toStringHex(buffer[i]);
            length++;
        }
        return { length, result: pdu };
    }
    static encode7Bit(text, alignBits) {
        let ret = '';
        let buf = 0;
        let bufLen = 0;
        let length = 0;
        if (alignBits) {
            bufLen += alignBits;
        }
        for (const symb of text) {
            let code;
            if ((code = Helper.ALPHABET_7BIT.indexOf(symb)) !== -1) {
                buf |= code << bufLen;
                bufLen += 7;
                length++;
            }
            else if ((code = Helper.EXTENDED_TABLE.indexOf(symb)) !== -1) {
                buf |= ((code << 7) | 27) << bufLen;
                bufLen += 14;
                length += 2;
            }
            else {
                buf |= 37 << bufLen;
                bufLen += 7;
                length++;
            }
            while (bufLen >= 8) {
                ret += this.toStringHex(buf & 0xff);
                buf >>= 8;
                bufLen -= 8;
            }
        }
        if (bufLen) {
            ret += this.toStringHex(buf);
        }
        return { length, result: ret };
    }
    static encode16Bit(text) {
        let length = 0;
        let pdu = '';
        for (let i = 0; i < text.length; i++) {
            const byte = Helper.order(text.substring(i, i + 1));
            pdu += this.toStringHex(byte, 4);
            length += 2;
        }
        return { length, result: pdu };
    }
    static toStringHex(number, fill = 2) {
        let str = number.toString(16);
        while (str.length < fill) {
            str = '0' + str;
        }
        return str.toUpperCase();
    }
}
exports.Helper = Helper;
Helper.ALPHABET_7BIT = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ\x1bÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ`¿abcdefghijklmnopqrstuvwxyzäöñüà';
Helper.EXTENDED_TABLE = '````````````````````^```````````````````{}`````\\````````````[~]`|````````````````````````````````````€``````````````````````````';
Helper.limitNormal = 140;
Helper.limitCompress = 160;
Helper.limitUnicode = 70;
//# sourceMappingURL=Helper.js.map