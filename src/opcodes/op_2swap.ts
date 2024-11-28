import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_2SWAP(state: StackState): StackState {
    if (state.main.length < 4) {
        return makeError("Need four items for 2SWAP", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();   // top
    const b = new_state.main.pop();   // second
    const c = new_state.main.pop();   // third
    const d = new_state.main.pop();   // fourth

    new_state.main.push(b!);          // second
    new_state.main.push(a!);          // first
    new_state.main.push(d!);          // fourth
    new_state.main.push(c!);          // third
    return new_state;
}