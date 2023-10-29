"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PID_1 = require("../../utils/PID");
function parsePID(getPduSubstr) {
    const buffer = Buffer.from(getPduSubstr(2), 'hex');
    const byte = buffer[0];
    const pid = new PID_1.PID();
    pid.setPid(byte >> 6);
    pid.setIndicates(byte >> 5);
    pid.setType(byte);
    return pid;
}
exports.default = parsePID;
//# sourceMappingURL=parsePID.js.map