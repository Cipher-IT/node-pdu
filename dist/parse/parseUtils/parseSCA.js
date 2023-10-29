"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("../../utils/Helper");
const SCA_1 = require("../../utils/SCA/SCA");
const SCAType_1 = require("../../utils/SCA/SCAType");
function parseSCA(getPduSubstr, isAddress) {
    const buffer = Buffer.from(getPduSubstr(2), 'hex');
    const sca = new SCA_1.SCA(isAddress);
    let size = buffer[0];
    let octets;
    if (!size) {
        return sca;
    }
    if (isAddress) {
        octets = Math.ceil(size / 2);
    }
    else {
        size--;
        octets = size;
        size *= 2;
    }
    const bufferScaType = Buffer.from(getPduSubstr(2), 'hex');
    const type = new SCAType_1.SCAType(bufferScaType[0]);
    const hex = getPduSubstr(octets * 2);
    sca.type.setType(type.type);
    sca.type.setPlan(type.plan);
    if (sca.type.type === SCAType_1.SCAType.TYPE_ALPHANUMERICAL) {
        size = Math.floor((size * 4) / 7);
        return sca.setPhone(Helper_1.Helper.decode7Bit(hex, size), false, !isAddress);
    }
    if (!isAddress && hex.charAt(size - 2) === 'F') {
        size--;
    }
    const phone = (hex.match(/.{1,2}/g) || [])
        .map((b) => SCA_1.SCA.mapFilterDecode(b).split('').reverse().join(''))
        .join('')
        .slice(0, size);
    return sca.setPhone(phone, false, !isAddress);
}
exports.default = parseSCA;
//# sourceMappingURL=parseSCA.js.map