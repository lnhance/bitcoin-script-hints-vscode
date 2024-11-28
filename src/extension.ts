import * as vscode from 'vscode';
import { parseInitialState, processScript } from './parser';

export function activate(context: vscode.ExtensionContext) {
    let decorationType = vscode.window.createTextEditorDecorationType({
        after: {
            margin: '0 0 0 1em',
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

        // Find script! macro invocations
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
                    const position = new vscode.Position(
                        startPos.line + lineOffset + index, 
                        0
                    );
                    
                    decorations.push({
                        range: new vscode.Range(position, position),
                        renderOptions: {
                            after: {
                                contentText: ` → ${hint}`,
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