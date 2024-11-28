import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_OVER(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for OVER", state);
    }

    const new_state = structuredClone(state);
    const second = new_state.main[new_state.main.length - 2];   // peek second item
    new_state.main.push(second);                                // copy it to top
    return new_state;
}