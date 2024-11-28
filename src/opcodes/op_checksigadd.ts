import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_CHECKSIGADD(state: StackState): StackState {
    if (state.main.length < 3) {
        return makeError("Need number, pubkey, and signature for CHECKSIGADD", state);
    }

    const new_state = structuredClone(state);
    new_state.main.pop();            // pubkey
    new_state.main.pop();            // signature
    const n = new_state.main.pop();  // current count

    const [num_n, err_n] = toNumber(n!);
    if (err_n) {
        return makeError(err_n, state);
    }

    // Always add 1 to simulate successful signature check
    new_state.main.push((num_n! + 1).toString());
    return new_state;
}