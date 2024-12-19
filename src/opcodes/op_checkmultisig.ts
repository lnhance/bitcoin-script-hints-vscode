import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_CHECKMULTISIG(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need number of pubkeys for CHECKMULTISIG", state);
    }

    const new_state = structuredClone(state);
    
    // Get number of pubkeys
    const n_pubkeys = new_state.main.pop();
    const [num_pubkeys, err_pubkeys] = toNumber(n_pubkeys!);
    if (err_pubkeys) {
        return makeError(err_pubkeys, state);
    }

    // Check if we have enough items for pubkeys
    if (new_state.main.length < num_pubkeys!) {
        return makeError("Stack underflow: not enough pubkeys", state);
    }

    // Remove pubkeys
    for (let i = 0; i < num_pubkeys!; i++) {
        new_state.main.pop();
    }

    // Get number of signatures
    if (new_state.main.length < 1) {
        return makeError("Need number of signatures", state);
    }
    const n_sigs = new_state.main.pop();
    const [num_sigs, err_sigs] = toNumber(n_sigs!);
    if (err_sigs) {
        return makeError(err_sigs, state);
    }

    // Check if we have enough items for signatures
    if (new_state.main.length < num_sigs!) {
        return makeError("Stack underflow: not enough signatures", state);
    }

    // Remove signatures
    for (let i = 0; i < num_sigs!; i++) {
        new_state.main.pop();
    }

    // Remove the extra dummy element that Bitcoin requires
    if (new_state.main.length < 1) {
        return makeError("Need dummy element", state);
    }
    new_state.main.pop();

    // Always push 1 to simulate successful verification
    new_state.main.push("1");
    return new_state;
}