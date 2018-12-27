'use strict'
import * as cp from 'child_process'
import * as vscode from 'vscode'

let loadingStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
loadingStatus.text = 'Inspecting code...'

export function activate(ctx: vscode.ExtensionContext) {
    ctx.subscriptions.push(vscode.commands.registerCommand(
        'cargo-inspect.run', run))
}

function run() {
    // let configuration = vscode.workspace.getConfiguration('cargo-inspect')
    insertText("hello", true)
}

function insertText(content: string, openInNewEditor = true) {
    if (openInNewEditor) {
        let language = vscode.window.activeTextEditor.document.languageId
        vscode.workspace.openTextDocument({ language, content }).then(
            document => vscode.window.showTextDocument(document, vscode.ViewColumn.Two)
        )
    }
    else {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            vscode.window.showErrorMessage('There is no open editor window');
            return;
        }
        editor.edit(
            edit => editor.selections.forEach(
                selection => {
                    edit.insert(selection.end, "\n" + content);
                }
            )
        );
    }
}