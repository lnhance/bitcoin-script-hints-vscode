import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_ROT(state: StackState): StackState {
    if (state.main.length < 3) {
        return makeError("Need three items for ROT", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();  // top
    const b = new_state.main.pop();  // second
    const c = new_state.main.pop();  // third

    new_state.main.push(b!);         // second -> bottom
    new_state.main.push(a!);         // top -> middle
    new_state.main.push(c!);         // third -> top
    return new_state;
}