import { StackState } from '../stackstate';

// OP_NOP does nothing - it just returns the state unchanged
export function OP_NOP(state: StackState): StackState {
    return state;
}