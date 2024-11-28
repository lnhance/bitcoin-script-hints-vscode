import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_3DUP(state: StackState): StackState {
    if (state.main.length < 3) {
        return makeError("Need three items for 3DUP", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main[new_state.main.length - 1];     // peek top item
    const b = new_state.main[new_state.main.length - 2];     // peek second item
    const c = new_state.main[new_state.main.length - 3];     // peek third item
    
    new_state.main.push(c);
    new_state.main.push(b);
    new_state.main.push(a);
    return new_state;
}