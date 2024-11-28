import { StackState } from '../stackstate';

export function OP_DEPTH(state: StackState): StackState {
    const new_state = structuredClone(state);
    new_state.main.push(new_state.main.length.toString());
    return new_state;
}