"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../../utils/Data/Data");
const Header_1 = require("../../utils/Data/Header");
const Part_1 = require("../../utils/Data/Part");
const DCS_1 = require("../../utils/DCS");
const Helper_1 = require("../../utils/Helper");
function parseData(type, dataCodingScheme, userDataLength, getPduSubstr) {
    const dataOptions = {};
    if (dataCodingScheme.textAlphabet === DCS_1.DCS.ALPHABET_UCS2) {
        dataOptions.isUnicode = true;
    }
    const tmp = parsePart(type, dataCodingScheme, userDataLength, getPduSubstr);
    dataOptions.data = tmp.text;
    dataOptions.size = tmp.size;
    dataOptions.parts = [tmp.part];
    return new Data_1.Data(dataOptions);
}
exports.default = parseData;
function parsePart(type, dataCodingScheme, userDataLength, getPduSubstr) {
    let length = 0;
    if (dataCodingScheme.textAlphabet === DCS_1.DCS.ALPHABET_DEFAULT) {
        length = Math.ceil((userDataLength * 7) / 8);
    }
    else {
        length = userDataLength;
    }
    let header;
    let hdrSz = 0;
    if (type.userDataHeader === 1) {
        header = parseHeader(getPduSubstr);
        hdrSz = 1 + header.getSize();
        length -= hdrSz;
    }
    const hex = getPduSubstr(length * 2);
    const text = (() => {
        if (dataCodingScheme.textAlphabet === DCS_1.DCS.ALPHABET_DEFAULT) {
            const inLen = userDataLength - Math.ceil((hdrSz * 8) / 7);
            const alignBits = Math.ceil((hdrSz * 8) / 7) * 7 - hdrSz * 8;
            return Helper_1.Helper.decode7Bit(hex, inLen, alignBits);
        }
        if (dataCodingScheme.textAlphabet === DCS_1.DCS.ALPHABET_8BIT) {
            return Helper_1.Helper.decode8Bit(hex);
        }
        if (dataCodingScheme.textAlphabet === DCS_1.DCS.ALPHABET_UCS2) {
            return Helper_1.Helper.decode16Bit(hex);
        }
        throw new Error('node-pdu: Unknown alpabet!');
    })();
    const part = new Part_1.Part(hex, userDataLength, text, header);
    return { text, size: userDataLength, part };
}
function parseHeader(getPduSubstr) {
    let buf = Buffer.from(getPduSubstr(2), 'hex');
    let ieLen = 0;
    const ies = [];
    for (let udhl = buf[0]; udhl > 0; udhl -= 2 + ieLen) {
        buf = Buffer.from(getPduSubstr(4), 'hex');
        ieLen = buf[1];
        ies.push({ type: buf[0], dataHex: getPduSubstr(ieLen * 2) });
    }
    return new Header_1.Header(ies);
}
//# sourceMappingURL=parseData.js.map