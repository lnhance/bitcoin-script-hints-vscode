import * as vscode from 'vscode';
import { parseInitialState, processScript } from './parser';

export function activate(context: vscode.ExtensionContext) {
    let decorationType = vscode.window.createTextEditorDecorationType({
        after: {
            color: new vscode.ThemeColor('editorLineNumber.foreground')
        }
    });

    let activeEditor = vscode.window.activeTextEditor;

    function updateDecorations() {
        if (!activeEditor || activeEditor.document.languageId !== 'rust') {
            return;
        }

        const text = activeEditor.document.getText();
        const decorations: vscode.DecorationOptions[] = [];

        // Find all script! macro invocations first to get global max length
        const scriptRegex = /script!\s*{([^}]*)}/g;
        let globalMaxLength = 0;
        let match;
        
        // First pass: calculate global max length
        while (match = scriptRegex.exec(text)) {
            const scriptContent = match[1];
            const lines = scriptContent.split('\n');
            
            // Check every line in the script block
            for (const line of lines) {
                if (line && !line.trim().startsWith('//')) {
                    const lineLength = line.length;
                    globalMaxLength = Math.max(globalMaxLength, lineLength);
                }
            }
        }

        // Add fixed padding to global max length
        const targetPosition = globalMaxLength + 4;

        // Reset regex to start over
        scriptRegex.lastIndex = 0;

        // Second pass: apply decorations using global max length
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
                    if (!hint || hint === '') return;

                    const line = lines[lineOffset + index + 1];
                    if (!line) { return; };
                    
                    const position = new vscode.Position(
                        startPos.line + lineOffset + index + 1,
                        line.length
                    );
                    
                    // Skip decoration for NULL hints
                    if (hint === 'NULL') return;

                    // Calculate padding based on global max length
                    const currentLength = line.length;
                    const padding = ' '.repeat(Math.max(0, targetPosition - currentLength));
                    
                    decorations.push({
                        range: new vscode.Range(position, position),
                        renderOptions: {
                            after: {
                                contentText: `${padding} ➡ ${hint}`,
                                color: hint.includes('ERROR') ? 'red' : undefined
                            }
                        }
                    });
                });
            }
        }

        activeEditor.setDecorations(decorationType, decorations);
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
