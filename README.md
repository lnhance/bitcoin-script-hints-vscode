<h1 align="center">
vscode-bitcoin-script-hints 
</h1>

<p align="center">
🔮 A magical Visual Studio Code extension for Bitcoin Script 🪄
</p>

<p align="center">
<img src="https://github.com/russeree/bitcoin-script-hints-vscode/raw/master/assets/demo.gif" width="600" alt="Bitcoin Script Hints Demo">
</p>

## How does it work?
This VSCode extension is intended to be used in Rust projects that use the `script!` macro (from [rust-bitcoin-script](https://github.com/Bitcoin-Wildlife-Sanctuary/rust-bitcoin-script)).

The first line after the `script!` invocation must be in one of these formats:
- `[X, Y]` (just the main stack)
- `[X, Y], [Z]` (the main stack and the alt-stack)

## Example usage

```rust
use bitcoin_script::{define_pushable, script};

define_pushable!();

fn retrieve_hashed_leaf_item() -> ScriptBuf {
    script! {
        // [1, 2], [3] <-- Add this comment
        OP_DUP   // you should now see [1, 2, 2], [3] here
        OP_2     // and [1, 2, 2, 2], [3] here
        OP_ADD   // etc...
        OP_DEPTH
        OP_GREATERTHAN
        OP_IF
            OP_FROMALTSTACK
            OP_SWAP
        OP_ENDIF
    }
}
```

## Installation

You can install this extension in several ways:
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=portlandhodl.bitcoin-script-hints)

1. **VS Code Marketplace**
   - Open VS Code
   - Click on the Extensions icon in the Activity Bar
   - Search for "Rust Bitcoin Lib Script! Hints"
   - Click Install

2. **Quick Open**
   - Press `Ctrl+P` / `Cmd+P`
   - Paste `ext install bitcoin-script-hints`
   - Press Enter

3. **Manual Installation**
   - Download the `.vsix` file from the [latest release](https://github.com/russeree/bitcoin-script-hints-vscode/releases)
   - Open VS Code
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Type "Install from VSIX"
   - Select the downloaded file

## Requirements
- Visual Studio Code >= 1.80.0
- A Rust project using the `script!` macro

## Features
- Real-time stack visualization for Bitcoin Script operations
- Inline hints showing stack state after each operation
- Support for both main stack and alt-stack visualization
- Automatic updates as you type

## Acknowledgments

This extension is a port of the [bitcoin-script-hints.nvim](https://github.com/taproot-wizards/bitcoin-script-hints.nvim) plugin. Special thanks to the original plugin creators and the [Script Wiz IDE](https://ide.scriptwiz.app) team, which inspired both projects with their excellent stack visualization capabilities.
