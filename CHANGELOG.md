# Change Log

All notable changes to the "bitcoin-script-hints" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
