"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OP_CLTV = OP_CLTV;
function OP_CLTV(state) {
    // Create a new state object to avoid mutating the original
    const new_state = structuredClone(state);
    // Leave the stack unchanged and move onto the next opcode
    return new_state;
}
//# sourceMappingURL=op_cltv.js.map