import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_1ADD(state: StackState): StackState {
    const new_state = structuredClone(state);
    const a = new_state.main.pop();

    const [num_a, err_a] = toNumber(a!);
    if (err_a) {
        return makeError(err_a, state);
    }

    new_state.main.push((num_a! + 1).toString());
    return new_state;
}