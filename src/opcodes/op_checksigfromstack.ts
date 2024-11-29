import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_CHECKSIGFROMSTACK(state: StackState): StackState {
    if (state.main.length < 3) {
        return makeError("Need pubkey, message and signature for CHECKSIGFROMSTACK", state);
    }

    const new_state = structuredClone(state);
    // Remove pubkey and signature from stack
    new_state.main.pop();    // pubkey
    new_state.main.pop();    // message
    new_state.main.pop();    // signature

    // Always push 1 to simulate successful verification
    new_state.main.push("1");
    return new_state;
}