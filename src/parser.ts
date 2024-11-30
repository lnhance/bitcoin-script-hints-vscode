import { StackState } from './stackstate';
import { opcodes } from './opcodes/index';
import { formatState } from './utils';

export function parseInitialState(comment: string): StackState | null {
    const mainMatch = comment.match(/\[(.*?)\]/);
    if (!mainMatch) { return null; };

    const altMatch = comment.match(/\[(.*?)\],\s*\[(.*?)\]/);
    
    return {
        main: mainMatch[1].split(',').map(s => s.trim()).filter(s => s),
        alt: altMatch ? altMatch[2].split(',').map(s => s.trim()).filter(s => s) : [],
    };
}

interface BranchState {
    in_if: boolean;
    in_else: boolean;
    executing: boolean;
    condition: boolean;
}

export function processScript(content: string, initialState: StackState): string[] {
    const hints: string[] = [];
    let currentState = { ...initialState };
    
    const lines = content.split('\n');
    
    // Stack of branch states for nested if/else blocks
    const branchStack: BranchState[] = [];
    let currentBranch: BranchState = {
        in_if: false,
        in_else: false,
        executing: true,
        condition: true
    };

    function shouldExecute(): boolean {
        // Check if we're in a nested branch that's not executing
        for (const branch of branchStack) {
            if (!branch.executing) { return false; }
        }
        return currentBranch.executing;
    }

    for (const line of lines) {
        const opMatch = line.match(/OP_\w+/);
        if (!opMatch) {  hints.push(''); continue; };

        const op = opMatch[0];
        
        // Add NULL hints for control flow operations
        if (op === 'OP_IF' || op === 'OP_NOTIF' || op === 'OP_ELSE' || op === 'OP_ENDIF') {
            hints.push('NULL');
            
            if (op === 'OP_IF' || op === 'OP_NOTIF') {
                branchStack.push(currentBranch);
                if (shouldExecute()) {
                    currentState = opcodes[op](currentState);
                    const condition = !currentState.error && (currentState.if_result ?? false);
                    currentBranch = {
                        in_if: true,
                        in_else: false,
                        executing: condition,
                        condition: condition
                    };
                } else {
                    currentBranch = {
                        in_if: true,
                        in_else: false,
                        executing: false,
                        condition: false
                    };
                }
            } else if (op === 'OP_ELSE') {
                if (currentBranch.in_if) {
                    currentBranch.in_if = false;
                    currentBranch.in_else = true;
                    if (branchStack.every(b => b.executing)) {
                        currentBranch.executing = !currentBranch.condition;
                    }
                }
            } else if (op === 'OP_ENDIF') {
                currentBranch = branchStack.pop() || {
                    in_if: false,
                    in_else: false,
                    executing: true,
                    condition: true
                };
            }
            continue;
        }

        if (shouldExecute() && opcodes[op]) {
            currentState = opcodes[op](currentState);
            hints.push(formatState(currentState));
            
            if (currentState.error) {
                break;
            }
        } else {
            hints.push('');
        }
    }

    return hints;
}
