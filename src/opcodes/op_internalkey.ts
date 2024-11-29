import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_INTERNALKEY(state: StackState): StackState {
    const new_state = structuredClone(state);
    // Don't remove top item, just peek at it
    new_state.main.push('IK');  // Push taproot internal key on stack
    return new_state;
}