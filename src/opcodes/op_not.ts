import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_NOT(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for NOT", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();

    const [num_val, err_val] = toNumber(val!);
    if (err_val) {
        return makeError(err_val, state);
    }

    // Bitcoin script NOT: returns 1 if input is 0, 0 otherwise
    new_state.main.push((num_val === 0 ? 1 : 0).toString());
    return new_state;
}