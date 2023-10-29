"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SCTS_1 = require("../../utils/SCTS");
function parseSCTS(getPduSubstr) {
    const hex = getPduSubstr(14);
    const params = [];
    if (!hex) {
        throw new Error('node-pdu: Not enough bytes!');
    }
    (hex.match(/.{1,2}/g) || []).map((s) => {
        if ((params.length < 6 && /\D+/.test(s)) || (params.length === 6 && /[^0-9A-Fa-f]/.test(s))) {
            params.push(0);
            return;
        }
        params.push(parseInt(s.split('').reverse().join(''), params.length < 6 ? 10 : 16));
    });
    if (params.length < 6) {
        throw new Error('node-pdu: Parsing failed!');
    }
    let tzOff = params[6] & 0x7f;
    tzOff = (tzOff >> 4) * 10 + (tzOff & 0x0f);
    tzOff = tzOff * 15;
    if (params[6] & 0x80) {
        tzOff *= -1;
    }
    const isoTime = new Date(Date.UTC(params[0] > 70 ? 1900 + params[0] : 2000 + params[0], params[1] - 1, params[2], params[3], params[4], params[5]));
    isoTime.setUTCMinutes(isoTime.getUTCMinutes() - tzOff);
    return new SCTS_1.SCTS(isoTime, tzOff);
}
exports.default = parseSCTS;
//# sourceMappingURL=parseSCTS.js.map