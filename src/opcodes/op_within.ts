import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_WITHIN(state: StackState): StackState {
    if (state.main.length < 3) {
        return makeError("Need three items for WITHIN", state);
    }

    const new_state = structuredClone(state);
    const max = new_state.main.pop();    // top item is maximum
    const min = new_state.main.pop();    // next item is minimum
    const x = new_state.main.pop();      // value to test

    const [num_max, err_max] = toNumber(max!);
    if (err_max) {
        return makeError(err_max, state);
    }

    const [num_min, err_min] = toNumber(min!);
    if (err_min) {
        return makeError(err_min, state);
    }

    const [num_x, err_x] = toNumber(x!);
    if (err_x) {
        return makeError(err_x, state);
    }

    // Returns 1 if min <= x < max, 0 otherwise
    new_state.main.push(((num_x! >= num_min! && num_x! < num_max!) ? 1 : 0).toString());
    return new_state;
}