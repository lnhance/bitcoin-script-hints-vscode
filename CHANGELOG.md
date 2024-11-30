# Change Log

All notable changes to the "bitcoin-script-hints" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.4.2] - 2024-12-03

### Fixed
- Fixed line offset issues in hint positioning
- Fixed display name typo

## [0.4.0] - 2024-12-02

### Added
- Enhanced syntax highlighting for Bitcoin Script while preserving Rust syntax
- Added semantic token support for more precise highlighting
- Color-coded different operation types:
  - Stack operations (support.function.stack.bitcoin)
  - Flow control operations (keyword.control.flow.bitcoin)
  - Arithmetic operations (keyword.operator.arithmetic.bitcoin)
  - Cryptographic operations (support.function.crypto.bitcoin)
  - Comparison operations (keyword.operator.comparison.bitcoin)
  - Constants (constant.language.bitcoin)
- Added special rainbow highlighting for OP_CAT

## [0.3.9] - 2024-12-02

### Changed
- Removed max length calculation for hint positioning
- Fixed hint positioning to appear immediately after each line instead of having a 2-line gap

## [0.3.8] - 2024-12-01

### Removed
- Removed color theme functionality and configuration
- Removed Bitcoin Script color theme

## [0.3.7] - 2024-12-01

### Removed
- Removed color theme functionality and configuration
- Removed Bitcoin Script color theme

## [0.3.6] - 2024-12-01

### Removed
- Removed color theme functionality and configuration
- Removed Bitcoin Script color theme

## [0.3.5] - 2024-12-01

### Added
- Rainbow road mode highlighting for non-mainnet supported OP_CODES
- Visual distinction between mainnet and non-mainnet opcodes:
  - Non-mainnet opcodes now display with rainbow-colored syntax highlighting
  - Helps developers quickly identify non-standard operations
  - Improves code readability and safety by highlighting potentially unsupported operations

## [0.3.4] - 2024-11-30

### Added
- New color-coded syntax highlighting theme "Bitcoin Script"
- Categorized Bitcoin Script opcodes with distinct colors:
  - Stack Operations (Orange): OP_DROP, OP_DUP, OP_SWAP, OP_CAT, etc.
  - Flow Control (Purple): OP_IF, OP_ELSE, OP_ENDIF, OP_NOP, etc.
  - Arithmetic (Green): OP_ADD, OP_SUB, OP_MUL, OP_DIV, etc.
  - Cryptographic (Red): OP_SHA256, OP_CHECKSIG, H(n) syntax, etc.
  - Comparison (Blue): OP_EQUAL, OP_LESSTHAN, etc.
  - Constants (Yellow): OP_0 through OP_16, OP_TRUE, OP_FALSE

### Changed
- Improved syntax highlighting patterns for better accuracy
- Added missing opcodes to appropriate categories
- Added aliases (OP_TRUE/OP_FALSE) to constants category

## [0.3.3] - 2024-11-29

### Fixed
- Fixed OP Cat Ordering
- Updated version to 0.3.3

## [0.3.2] - 2024-11-28

### Added
- Implemented Bitcoin Script opcodes:
  - Stack Operations: OP_DUP, OP_NIP, OP_OVER, OP_PICK, OP_ROLL, OP_ROT, OP_SWAP, OP_2DROP, OP_2DUP, OP_2ROT
  - Arithmetic: OP_1SUB, OP_NEGATE, OP_ABS, OP_ADD, OP_SUB
  - Logic: OP_NOT, OP_NOTEQUAL, OP_BOOLOR, OP_NUMEQUAL, OP_NUMEQUALVERIFY
  - Comparison: OP_GREATERTHAN, OP_GREATERTHANOREQUAL, OP_MIN, OP_MAX, OP_WITHIN
  - Cryptographic: OP_HASH, OP_CHECKSIG, OP_CHECKMULTISIG, OP_CHECKMULTISIGVERIFY
- Added constants for script operations
- Added test for OP_ADD
- Added better build scripts
- Added icon for the extension
- Added demo video (GIF format)

### Fixed
- Fixed flow control implementation
- Parser fixes
- Removed warnings

### Changed
- Removed contributes section
- Package preparation updates

### Documentation
- Added MIT license
- Updated README.md framework
- Added local development instructions
- Added marketplace link to README
- Fixed formatting: newline marketplace link

## [0.1.0] - 2024-11-27

### Added
- Initial project setup
- Implemented flow control opcodes:
  - OP_ENDIF
  - OP_VERIFY
  - IF_DUP
