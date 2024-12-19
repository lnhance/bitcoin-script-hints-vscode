import { StackState } from '../stackstate';
import { makeError } from '../utils';

export function OP_CHECKSIG(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need pubkey and signature for CHECKSIG", state);
    }
    const new_state = structuredClone(state);

    // Remove pubkey and signature from stack
    new_state.main.pop(); // pubkey
    const sig = new_state.main.pop(); // signature

    // Check if signature starts with 0
    const success = !sig?.toString().startsWith("0");

    // Push 1 if signature is valid, otherwise push 0
    new_state.main.push(success ? "1" : "0");
    return new_state;
}