import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_DUP(state: StackState): StackState {
    if (state.main.length === 0) {
        return makeError("Stack underflow", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main[new_state.main.length - 1];  // peek at top value
    new_state.main.push(val);
    return new_state;
}