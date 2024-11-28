import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_CHECKSIGVERIFY(state: StackState): StackState {
    if (state.main.length < 2) {
        return makeError("Need pubkey and signature for CHECKSIGVERIFY", state);
    }

    const new_state = structuredClone(state);
    // Remove pubkey and signature from stack
    new_state.main.pop();    // pubkey
    new_state.main.pop();    // signature

    // Always push 1 to simulate successful verification
    new_state.main.push("1");

    const val = new_state.main.pop();
    const [num_val, err_val] = toNumber(val!);
    if (err_val) {
        return makeError(err_val, state);
    }

    if (num_val === 0) {
        return makeError("Verification failed", state);
    }

    return new_state;
}