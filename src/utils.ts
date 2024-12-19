import { StackState } from './stackstate';

export const makeError = (message: string, state: StackState): StackState => ({
    ...state,
    error: message
});

export function toNumber(val: string | number): [number | string, string | null] {
    if (typeof val === 'string' && val.startsWith('H(') && val.endsWith(')')) {
        return [val, null];
    }

    if (typeof val === 'number') {
        return [val, null];
    }

    const num = Number(val);
    if (isNaN(num)) {
        return [null, `Cannot convert '${val}' to number`];
    }

    return [num, null];
}

export const formatState = (state: StackState): string => {
    const mainStack = state.main.join(', ');
    const altStack = state.alt.length > 0 ? ` [${state.alt.join(', ')}]` : '';
    const error = state.error ? ` Error: ${state.error}` : '';
    const stackSizes = `[${state.main.length}:${state.alt.length}] ➡ `;
    return `${stackSizes}[${mainStack}]${altStack}${error}`;
};
