import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_FROMALTSTACK(state: StackState): StackState {
    if (state.alt.length === 0) {
        return makeError("Alt stack underflow", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.alt.pop();
    new_state.main.push(val!);
    return new_state;
}