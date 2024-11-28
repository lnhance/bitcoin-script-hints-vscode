import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_HASH(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Stack underflow", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();

    // Create hashed representation by wrapping in H()
    new_state.main.push(`H(${val})`);
    return new_state;
}