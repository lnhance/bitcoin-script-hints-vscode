import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_NOTIF(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for NOTIF", state);
    }

    const new_state = structuredClone(state);
    const condition = new_state.main.pop();

    const [num_condition, error] = toNumber(condition!);
    if (error) {
        return makeError(error, state);
    }

    // Opposite of IF - true when condition is 0
    return {
        ...new_state,
        if_result: num_condition === 0
    };
}