import { StackState } from './stackState';
import { opcodes } from './opcodes';

export function parseInitialState(comment: string): StackState | null {
    const mainMatch = comment.match(/\[(.*?)\]/);
    if (!mainMatch) return null;

    const altMatch = comment.match(/\[(.*?)\],\s*\[(.*?)\]/);
    
    return {
        main: mainMatch[1].split(',').map(s => s.trim()).filter(s => s),
        alt: altMatch ? altMatch[2].split(',').map(s => s.trim()).filter(s => s) : [],
    };
}

export function processScript(content: string, initialState: StackState): string[] {
    const hints: string[] = [];
    let currentState = { ...initialState };
    
    const lines = content.split('\n');
    
    let branchState = {
        in_if: false,
        in_else: false,
        executing: true
    };

    for (const line of lines) {
        const opMatch = line.match(/OP_\w+/);
        if (!opMatch) continue;

        const op = opMatch[0];
        
        if (op === 'OP_IF' || op === 'OP_NOTIF') {
            branchState.in_if = true;
            currentState = opcodes[op](currentState);
            branchState.executing = !currentState.error && currentState.if_result;
            continue;
        }

        if (op === 'OP_ELSE') {
            branchState.in_if = false;
            branchState.in_else = true;
            branchState.executing = !branchState.executing;
            continue;
        }

        if (op === 'OP_ENDIF') {
            branchState.in_if = false;
            branchState.in_else = false;
            branchState.executing = true;
            continue;
        }

        if (branchState.executing && opcodes[op]) {
            currentState = opcodes[op](currentState);
            hints.push(formatState(currentState));
            
            if (currentState.error) {
                break;
            }
        }
    }

    return hints;
}