"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCS = void 0;
const Helper_1 = require("./Helper");
class DCS {
    constructor(options = {}) {
        this._encodeGroup = options.encodeGroup || 0x00;
        this._dataEncoding = options.dataEncoding || 0x00;
        this._compressedText = options.compressedText || false;
        this._textAlphabet = options.textAlphabet || DCS.ALPHABET_DEFAULT;
        this._useMessageClass = options.useMessageClass || false;
        this._classMessage = options.classMessage || DCS.CLASS_NONE;
        this._discardMessage = options.discardMessage || false;
        this._storeMessage = options.storeMessage || false;
        this._storeMessageUCS2 = options.storeMessageUCS2 || false;
        this._dataCodingAndMessageClass = options.dataCodingAndMessageClass || false;
        this._messageIndication = options.messageIndication || 0;
        this._messageIndicationType = options.messageIndicationType || 0;
    }
    get encodeGroup() {
        return this._encodeGroup;
    }
    get dataEncoding() {
        return this._dataEncoding;
    }
    get compressedText() {
        return this._compressedText;
    }
    get dataCodingAndMessageClass() {
        return this._dataCodingAndMessageClass;
    }
    get discardMessage() {
        return this._discardMessage;
    }
    setDiscardMessage() {
        this._discardMessage = true;
        return this;
    }
    get storeMessage() {
        return this._storeMessage;
    }
    setStoreMessage() {
        this._storeMessage = true;
        return this;
    }
    get storeMessageUCS2() {
        return this._storeMessageUCS2;
    }
    setStoreMessageUCS2() {
        this._storeMessageUCS2 = true;
        return this;
    }
    get messageIndication() {
        return this._messageIndication;
    }
    setMessageIndication(indication) {
        this._messageIndication = 1 & indication;
        return this;
    }
    get messageIndicationType() {
        return this._messageIndicationType;
    }
    setMessageIndicationType(type) {
        this._messageIndicationType = 0x03 & type;
        switch (this._messageIndicationType) {
            case DCS.INDICATION_TYPE_VOICEMAIL:
                break;
            case DCS.INDICATION_TYPE_FAX:
                break;
            case DCS.INDICATION_TYPE_EMAIL:
                break;
            case DCS.INDICATION_TYPE_OTHER:
                break;
            default:
                throw new Error('node-pdu: Wrong indication type!');
        }
        return this;
    }
    get textTextCompressed() {
        return this._compressedText;
    }
    setTextCompressed(compressed = true) {
        this._compressedText = compressed;
        return this;
    }
    get textAlphabet() {
        return this._textAlphabet;
    }
    setTextAlphabet(alphabet) {
        this._textAlphabet = 0x03 & alphabet;
        switch (this._textAlphabet) {
            case DCS.ALPHABET_DEFAULT:
                break;
            case DCS.ALPHABET_8BIT:
                break;
            case DCS.ALPHABET_UCS2:
                break;
            case DCS.ALPHABET_RESERVED:
                break;
            default:
                throw new Error('node-pdu: Wrong alphabet!');
        }
        return this;
    }
    get classMessage() {
        return this._classMessage;
    }
    setClass(cls) {
        this.setUseMessageClass();
        this._classMessage = 0x03 & cls;
        switch (this._classMessage) {
            case DCS.CLASS_NONE:
                this.setUseMessageClass(false);
                break;
            case DCS.CLASS_MOBILE_EQUIPMENT:
                break;
            case DCS.CLASS_SIM_SPECIFIC_MESSAGE:
                break;
            case DCS.CLASS_TERMINAL_EQUIPMENT:
                break;
            default:
                throw new Error('node-pdu: Wrong class type!');
        }
        return this;
    }
    get useMessageClass() {
        return this._useMessageClass;
    }
    setUseMessageClass(use = true) {
        this._useMessageClass = use;
        return this;
    }
    getValue() {
        this._encodeGroup = 0x00;
        this._dataEncoding = (this._textAlphabet << 2) | this._classMessage;
        if (this._useMessageClass) {
            this._encodeGroup |= 1 << 0;
        }
        if (this._compressedText) {
            this._encodeGroup |= 1 << 1;
        }
        if (this._discardMessage || this._storeMessage || this._storeMessageUCS2) {
            this._dataEncoding = 0x00;
            if (this._messageIndication) {
                this._dataEncoding |= 1 << 3;
                this._dataEncoding |= this._messageIndicationType;
            }
        }
        if (this._discardMessage) {
            this._encodeGroup = 0x0c;
        }
        if (this._storeMessage) {
            this._encodeGroup = 0x0d;
        }
        if (this._storeMessageUCS2) {
            this._encodeGroup = 0x0e;
        }
        if (this._dataCodingAndMessageClass) {
            this._encodeGroup = 0x0f;
            this._dataEncoding = 0x03 & this._classMessage;
            switch (this._textAlphabet) {
                case DCS.ALPHABET_8BIT:
                    this._dataEncoding |= 1 << 2;
                    break;
                case DCS.ALPHABET_DEFAULT:
                    break;
                default:
                    break;
            }
        }
        return ((0x0f & this._encodeGroup) << 4) | (0x0f & this._dataEncoding);
    }
    toString() {
        return Helper_1.Helper.toStringHex(this.getValue());
    }
}
exports.DCS = DCS;
DCS.CLASS_NONE = 0x00;
DCS.CLASS_MOBILE_EQUIPMENT = 0x01;
DCS.CLASS_SIM_SPECIFIC_MESSAGE = 0x02;
DCS.CLASS_TERMINAL_EQUIPMENT = 0x03;
DCS.INDICATION_TYPE_VOICEMAIL = 0x00;
DCS.INDICATION_TYPE_FAX = 0x01;
DCS.INDICATION_TYPE_EMAIL = 0x02;
DCS.INDICATION_TYPE_OTHER = 0x03;
DCS.ALPHABET_DEFAULT = 0x00;
DCS.ALPHABET_8BIT = 0x01;
DCS.ALPHABET_UCS2 = 0x02;
DCS.ALPHABET_RESERVED = 0x03;
//# sourceMappingURL=DCS.js.map