import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_CAT(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need two items for CAT", state);
    }

    const new_state = structuredClone(state);
    const a = new_state.main.pop();
    const b = new_state.main.pop();

    new_state.main.push(`${b}|${a}`);
    return new_state;
}