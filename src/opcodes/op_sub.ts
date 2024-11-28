import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_SUB(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for SUB", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();
    const b = new_state.main.pop();

    const [num_a, err_a] = toNumber(a!);
    if (err_a) {
        return makeError(err_a, state);
    }

    const [num_b, err_b] = toNumber(b!);
    if (err_b) {
        return makeError(err_b, state);
    }

    new_state.main.push((num_b! - num_a!).toString());
    return new_state;
}