import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_2DUP(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for 2DUP", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main[new_state.main.length - 1];     // peek top item
    const b = new_state.main[new_state.main.length - 2];     // peek second item
    
    new_state.main.push(b);
    new_state.main.push(a);
    return new_state;
}