import { StackState } from '../stackstate';

export function OP_CLTV(state: StackState): StackState {
    // Create a new state object to avoid mutating the original
    const new_state = structuredClone(state);
    // Leave the stack unchanged and move onto the next opcode
    return new_state;
}
