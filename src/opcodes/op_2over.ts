import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_2OVER(state: StackState): StackState {
    if (state.main.length < 4) {
        return makeError("Need four items for 2OVER", state);
    }

    const new_state = structuredClone(state);
    const third = new_state.main[new_state.main.length - 3];    // peek third item
    const fourth = new_state.main[new_state.main.length - 4];   // peek fourth item
    
    new_state.main.push(fourth);                                // copy fourth to top
    new_state.main.push(third);                                 // copy third to top
    return new_state;
}