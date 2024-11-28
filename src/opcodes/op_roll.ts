import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_ROLL(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need index for ROLL", state);
    }

    const new_state = structuredClone(state);
    const n = new_state.main.pop();   // get index

    const [num_n, err_n] = toNumber(n!);
    if (err_n) {
        return makeError(err_n, state);
    }

    if (new_state.main.length < num_n! + 1) {
        return makeError("Stack too small for ROLL", state);
    }

    // Move the n-th item to top (0 = top item)
    const item = new_state.main.splice(new_state.main.length - num_n! - 1, 1)[0];
    new_state.main.push(item);
    return new_state;
}