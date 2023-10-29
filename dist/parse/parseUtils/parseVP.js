"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PDUType_1 = require("../../utils/Type/PDUType");
const VP_1 = require("../../utils/VP");
const parseSCTS_1 = tslib_1.__importDefault(require("./parseSCTS"));
function parseVP(type, getPduSubstr) {
    const vpf = type.validityPeriodFormat;
    const vp = new VP_1.VP();
    if (vpf === PDUType_1.PDUType.VPF_NONE) {
        return vp;
    }
    if (vpf === PDUType_1.PDUType.VPF_ABSOLUTE) {
        const scts = (0, parseSCTS_1.default)(getPduSubstr);
        vp.setDateTime(scts.getIsoString());
        return vp;
    }
    if (vpf === PDUType_1.PDUType.VPF_RELATIVE) {
        const buffer = Buffer.from(getPduSubstr(2), 'hex');
        const byte = buffer[0];
        if (byte <= 143) {
            vp.setInterval((byte + 1) * (5 * 60));
            return vp;
        }
        if (byte <= 167) {
            vp.setInterval(3600 * 24 * 12 + (byte - 143) * (30 * 60));
            return vp;
        }
        if (byte <= 196) {
            vp.setInterval((byte - 166) * (3600 * 24));
            return vp;
        }
        vp.setInterval((byte - 192) * (3600 * 24 * 7));
        return vp;
    }
    throw new Error('node-pdu: Unknown validity period format!');
}
exports.default = parseVP;
//# sourceMappingURL=parseVP.js.map