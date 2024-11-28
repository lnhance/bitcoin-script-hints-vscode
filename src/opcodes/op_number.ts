import { StackState } from '../stackstate';

export function OP_NUMBER(num: number) {
    return function(state: StackState): StackState {
        const new_state = structuredClone(state);
        new_state.main.push(num.toString());  // Convert number to string
        return new_state;
    };
}