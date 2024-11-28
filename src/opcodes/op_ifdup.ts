import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_IFDUP(state: StackState): StackState {
    if (state.main.length === 0) {
        return makeError("Need one item for IFDUP", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main[new_state.main.length - 1];  // peek at top value

    const [num_condition, error] = toNumber(val);
    if (error) {
        return makeError(error, state);
    }

    if (num_condition !== 0) {
        new_state.main.push(val);
    }

    return new_state;
}