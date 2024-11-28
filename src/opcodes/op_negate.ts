import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_NEGATE(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for NEGATE", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();

    const [num_val, err_val] = toNumber(val!);
    if (err_val) {
        return makeError(err_val, state);
    }

    new_state.main.push((-num_val!).toString());
    return new_state;
}