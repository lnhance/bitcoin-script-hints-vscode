import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_ELSE(state: StackState): StackState {
    if (state.if_result === undefined) {
        return makeError("ELSE without matching IF", state);
    }

    const new_state = structuredClone(state);
    // Just invert the if_result flag
    new_state.if_result = !new_state.if_result;
    return new_state;
}