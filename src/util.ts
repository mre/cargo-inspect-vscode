import * as vscode from 'vscode';
import * as path from 'path';
import * as process from 'child_process';

export interface Output {
    stdout: string;
    stderr: string;
    code: number;
}

export function exec(
    cmd: string,
    args?: string[],
    options?: process.SpawnOptions
): Promise<Output> {
    return new Promise((resolve, reject) => {
        let stdout = "";
        let stderr = "";

        const proc = process.spawn(cmd, args, options);

        proc.stdout.on('data', (data) => stdout += data);
        proc.stderr.on('data', (data) => stderr += data);
        proc.on('close', (code) => resolve({ stdout, stderr, code }));
        proc.on('error', (err) => reject(err));
    });
}

export function getCwd(): string {
    const editor = vscode.window.activeTextEditor;

    if (editor === undefined) {
        vscode.window.showErrorMessage("No open files");
        throw Error("No open files");
    }

    const cwd = path.dirname(editor.document.uri.fsPath);

    return cwd;
}