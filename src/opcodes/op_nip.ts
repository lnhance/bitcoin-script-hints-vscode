import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_NIP(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for NIP", state);
    }

    const new_state = structuredClone(state);
    const top = new_state.main.pop();    // save top item
    new_state.main.pop();                // remove second item
    new_state.main.push(top!);           // restore top item
    return new_state;
}