import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_IF(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for IF", state);
    }

    const new_state = structuredClone(state);
    const condition = new_state.main.pop();

    const [num_condition, error] = toNumber(condition!);
    if (error) {
        return makeError(error, state);
    }

    return {
        ...new_state,
        if_result: num_condition !== 0
    };
}