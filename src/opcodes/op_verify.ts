import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';

export function OP_VERIFY(state: StackState): StackState {
    if (state.main.length < 1) {
        return makeError("Need one item for VERIFY", state);
    }

    const new_state = structuredClone(state);
    const val = new_state.main.pop();

    const [num_val, error] = toNumber(val!);
    if (error) {
        return makeError(error, state);
    }

    if (num_val === 0) {
        return makeError("Verification failed", state);
    }

    return new_state;
}