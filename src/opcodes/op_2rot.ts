import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_2ROT(state: StackState): StackState {
    if (state.main.length < 6) {
        return makeError("Need six items for 2ROT", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();   // top
    const b = new_state.main.pop();   // second
    const c = new_state.main.pop();   // third
    const d = new_state.main.pop();   // fourth
    const e = new_state.main.pop();   // fifth
    const f = new_state.main.pop();   // sixth

    // Rotate three pairs
    new_state.main.push(d!);   // fourth
    new_state.main.push(c!);   // third
    new_state.main.push(b!);   // second
    new_state.main.push(a!);   // first
    new_state.main.push(f!);   // sixth
    new_state.main.push(e!);   // fifth
    return new_state;
}