import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_SWAP(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for SWAP", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();
    const b = new_state.main.pop();

    new_state.main.push(a!);
    new_state.main.push(b!);
    return new_state;
}