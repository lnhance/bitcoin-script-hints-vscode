import { StackState } from '../stackstate';
import { makeError } from '../utils';
export function OP_PAIRCOMMIT(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for PAIRCOMMIT", state);
    }
    const new_state = structuredClone(state);
    const b = new_state.main.pop();
    const a = new_state.main.pop();
    new_state.main.push(`H(${a},${b})`);
    return new_state;
}