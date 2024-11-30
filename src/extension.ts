import * as vscode from 'vscode';
import { parseInitialState, processScript } from './parser';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

const legend = new vscode.SemanticTokensLegend([
    'function', 'operator', 'keyword', 'parameter', 'variable',
    'constant', 'string', 'number', 'comment', 'macro',
    'type', 'class', 'enum', 'interface', 'struct'
], ['declaration', 'definition', 'readonly', 'static', 'bitcoin']);

export function activate(context: vscode.ExtensionContext) {
    let hintDecorationType = vscode.window.createTextEditorDecorationType({
        after: {
            color: new vscode.ThemeColor('editorLineNumber.foreground')
        }
    });

    // Register semantic tokens provider
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: 'rust' },
            new BitcoinScriptSemanticTokensProvider(),
            legend
        )
    );

    let activeEditor = vscode.window.activeTextEditor;

    function updateDecorations() {
        if (!activeEditor || activeEditor.document.languageId !== 'rust') {
            return;
        }

        const text = activeEditor.document.getText();
        const hintDecorations: vscode.DecorationOptions[] = [];

        // Find all script! macro invocations
        const scriptRegex = /script!\s*{([^}]*)}/g;
        let match;

        while (match = scriptRegex.exec(text)) {
            const scriptContent = match[1];
            const startPos = activeEditor.document.positionAt(match.index);
            const lines = scriptContent.split('\n');
            
            // Find initial state comment
            let initialState = null;
            let lineOffset = 0;
            
            for (const line of lines) {
                if (line.trim().startsWith('//') && line.includes('[')) {
                    initialState = parseInitialState(line);
                    break;
                }
                lineOffset++;
            }

            if (initialState) {
                const hints = processScript(scriptContent, initialState);
                
                hints.forEach((hint, index) => {
                    // Skip empty hints (non-executed lines)
                    if (!hint || hint === '') { return; }

                    const line = lines[lineOffset + index];
                    if (!line) { return; };
                    
                    const position = new vscode.Position(
                        startPos.line + lineOffset + index,
                        line.length
                    );
                    
                    // Skip decoration for NULL hints
                    if (hint === 'NULL') { return; }

                    const padding = '    '; // Fixed 4-space padding
                    
                    hintDecorations.push({
                        range: new vscode.Range(position, position),
                        renderOptions: {
                            after: {
                                contentText: `${padding}➡ ${hint}`,
                                color: hint.includes('ERROR') ? 'red' : undefined
                            }
                        }
                    });
                });
            }
        }

        activeEditor.setDecorations(hintDecorationType, hintDecorations);
    }

    if (activeEditor) {
        updateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            updateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            updateDecorations();
        }
    }, null, context.subscriptions);
}

class BitcoinScriptSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument
    ): Promise<vscode.SemanticTokens> {
        const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
        const text = document.getText();
        
        // Find all script! macro blocks
        const scriptRegex = /script!\s*{([^}]*)}/g;
        let match;

        while (match = scriptRegex.exec(text)) {
            const scriptContent = match[1];
            const startPos = document.positionAt(match.index);
            
            // Add semantic tokens for Bitcoin Script operations
            const opRegex = /\b(OP_[A-Z0-9]+)\b/g;
            let opMatch;
            
            while (opMatch = opRegex.exec(scriptContent)) {
                const opCode = opMatch[1];
                const opPos = document.positionAt(match.index + opMatch.index);
                
                // Determine token type based on opcode
                let tokenType = 'function';
                if (opCode.match(/^OP_(DROP|DUP|NIP|OVER|PICK|ROLL|ROT|SWAP|TUCK|2DROP|2DUP|3DUP|2OVER|2ROT|2SWAP|DEPTH|SIZE|TOALTSTACK|FROMALTSTACK|IFDUP)$/)) {
                    tokenType = 'string';
                } else if (opCode.match(/^OP_(IF|NOTIF|ELSE|ENDIF|VERIFY|RETURN|CODESEPARATOR|NOP)$/)) {
                    tokenType = 'keyword';
                } else if (opCode.match(/^OP_(1ADD|1SUB|NEGATE|ABS|NOT|0NOTEQUAL|ADD|SUB|MUL|DIV|MOD|LSHIFT|RSHIFT|MIN|MAX)$/)) {
                    tokenType = 'number';
                } else if (opCode.match(/^OP_(SHA256|SHA1|RIPEMD160|HASH160|HASH256|CHECKSIG|CHECKSIGVERIFY|CHECKMULTISIG|CHECKMULTISIGVERIFY|CHECKSIGADD)$/)) {
                    tokenType = 'type';
                } else if (opCode.match(/^OP_(EQUAL|EQUALVERIFY|BOOLAND|BOOLOR|NUMEQUAL|NUMEQUALVERIFY|NUMNOTEQUAL|LESSTHAN|GREATERTHAN|LESSTHANOREQUAL|GREATERTHANOREQUAL|WITHIN)$/)) {
                    tokenType = 'operator';
                } else if (opCode.match(/^OP_([0-9]|TRUE|FALSE)$/)) {
                    tokenType = 'constant';
                }
                
                tokensBuilder.push(
                    opPos.line,
                    opPos.character,
                    opCode.length,
                    legend.tokenTypes.indexOf(tokenType),
                    legend.tokenModifiers.indexOf('bitcoin')
                );
            }
        }
        
        return tokensBuilder.build();
    }
}
