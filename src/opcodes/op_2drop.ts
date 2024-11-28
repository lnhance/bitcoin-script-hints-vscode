import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_2DROP(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for 2DROP", state);
    }

    const new_state = structuredClone(state);
    new_state.main.pop();  // remove top
    new_state.main.pop();  // remove second
    return new_state;
}