import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_TUCK(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for TUCK", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();   // top
    const b = new_state.main.pop();   // second

    new_state.main.push(a!);          // insert top item third
    new_state.main.push(b!);          // restore second
    new_state.main.push(a!);          // restore top
    return new_state;
}