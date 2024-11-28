import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_SIZE(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for SIZE", state);
    }

    const new_state = structuredClone(state);
    // Don't remove top item, just peek at it
    const val = new_state.main[new_state.main.length - 1].toString();
    new_state.main.push(val.length.toString());  // Push length of item's string representation
    return new_state;
}