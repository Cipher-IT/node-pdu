"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCA = void 0;
const Helper_1 = require("../Helper");
const SCAType_1 = require("./SCAType");
class SCA {
    constructor(isAddress = false, options = {}) {
        this._size = 0x00;
        this._encoded = '';
        this._phone = null;
        this.type = options.type || new SCAType_1.SCAType();
        this._isAddress = isAddress;
    }
    get isAddress() {
        return this._isAddress;
    }
    get size() {
        return this._size;
    }
    get encoded() {
        return this._encoded;
    }
    get phone() {
        return this._phone;
    }
    setPhone(phone, detectType = true, SC = false) {
        this._phone = phone.trim();
        this._isAddress = !SC;
        if (this._isAddress && detectType) {
            this.detectScaType(this._phone);
        }
        if (this.type.type === SCAType_1.SCAType.TYPE_ALPHANUMERICAL) {
            const tmp = Helper_1.Helper.encode7Bit(phone);
            this._size = Math.ceil((tmp.length * 7) / 4);
            this._encoded = tmp.result;
            return this;
        }
        const clear = this._phone.replace(/[^a-c0-9*#]/gi, '');
        this._size = SC ? 1 + Math.ceil(clear.length / 2) : clear.length;
        this._encoded = clear
            .split('')
            .map((s) => SCA.mapFilterEncode(s))
            .join('');
        return this;
    }
    detectScaType(phone) {
        const phoneSpaceless = phone.replace(/^\s+|\s+$/g, '');
        if (/\+\d+$/.test(phoneSpaceless)) {
            this._phone = phoneSpaceless.substring(1);
            this.type.setType(SCAType_1.SCAType.TYPE_INTERNATIONAL);
            return;
        }
        if (/00\d+$/.test(phoneSpaceless)) {
            this._phone = phoneSpaceless.substring(2);
            this.type.setType(SCAType_1.SCAType.TYPE_INTERNATIONAL);
            return;
        }
        if (/\d+$/.test(phoneSpaceless)) {
            this._phone = phoneSpaceless;
            this.type.setType(SCAType_1.SCAType.TYPE_UNKNOWN);
            return;
        }
        this.type.setType(SCAType_1.SCAType.TYPE_ALPHANUMERICAL);
    }
    getOffset() {
        return !this._size ? 2 : this._size + 4;
    }
    toString() {
        let str = Helper_1.Helper.toStringHex(this.size);
        if (this.size !== 0) {
            str += this.type.toString();
            if (this.type.type !== SCAType_1.SCAType.TYPE_ALPHANUMERICAL) {
                const l = this.encoded.length;
                for (let i = 0; i < l; i += 2) {
                    const b1 = this.encoded.substring(i, i + 1);
                    const b2 = i + 1 >= l ? 'F' : this.encoded.substring(i + 1, i + 2);
                    str += b2 + b1;
                }
            }
            else {
                str += this.encoded;
            }
        }
        return str;
    }
    static mapFilterDecode(letter) {
        const buffer = Buffer.from(letter, 'hex');
        switch (buffer[0]) {
            case 0x0a:
                return '*';
            case 0x0b:
                return '#';
            case 0x0c:
                return 'a';
            case 0x0d:
                return 'b';
            case 0x0e:
                return 'c';
            default:
                return letter;
        }
    }
    static mapFilterEncode(letter) {
        switch (letter) {
            case '*':
                return 'A';
            case '#':
                return 'B';
            case 'a':
                return 'C';
            case 'b':
                return 'D';
            case 'c':
                return 'E';
            default:
                return letter;
        }
    }
}
exports.SCA = SCA;
//# sourceMappingURL=SCA.js.map