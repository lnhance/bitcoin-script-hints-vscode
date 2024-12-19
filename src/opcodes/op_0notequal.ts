import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_0NOTEQUAL(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for 0NOTEQUAL", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();
    // Check if the value is 0 (numeric or string)
    const isZero = val === "0" || val?.toString() === "0";

    // Push 1 if the value is not 0, push 0 if the value is 0
    new_state.main.push(isZero ? "0" : "1");

    return new_state;
}