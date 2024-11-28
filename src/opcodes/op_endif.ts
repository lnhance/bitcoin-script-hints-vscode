import { StackState } from '../stackstate';

export function OP_ENDIF(state: StackState): StackState {
    // Just remove the if_result flag, no stack changes
    const new_state = structuredClone(state);
    new_state.if_result = undefined;  // using undefined instead of Lua's nil
    return new_state;
}