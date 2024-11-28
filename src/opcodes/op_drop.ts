import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_DROP(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for DROP", state);
    }

    const new_state = structuredClone(state);
    new_state.main.pop();
    return new_state;
}