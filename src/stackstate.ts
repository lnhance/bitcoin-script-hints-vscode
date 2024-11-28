export interface StackState {
    main: string[];
    alt: string[];
    error?: string;
    if_result?: boolean;
}

export function formatState(state: StackState): string {
    if (state.error) {
        return `ERROR: ${state.error}`;
    }
    const mainStr = `[${state.main.join(', ')}]`;
    const altStr = `[${state.alt.join(', ')}]`;
    return `${mainStr}, ${altStr}`;
}