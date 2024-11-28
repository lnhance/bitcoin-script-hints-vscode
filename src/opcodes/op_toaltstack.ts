import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_TOALTSTACK(state: StackState): StackState {
    if (state.main.length === 0) {
        return makeError("Stack underflow", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();
    new_state.alt.push(val!);
    return new_state;
}