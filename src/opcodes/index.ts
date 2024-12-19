import { StackState } from '../stackstate';
import { OP_NOP } from './op_nop';
import { OP_NUMBER } from './op_number';
import { OP_IF } from './op_if';
import { OP_NOTIF } from './op_notif';
import { OP_ELSE } from './op_else';
import { OP_ENDIF } from './op_endif';
import { OP_VERIFY } from './op_verify';
import { OP_TOALTSTACK } from './op_toaltstack';
import { OP_FROMALTSTACK } from './op_fromaltstack';
import { OP_IFDUP } from './op_ifdup';
import { OP_DEPTH } from './op_depth';
import { OP_DROP } from './op_drop';
import { OP_DUP } from './op_dup';
import { OP_NIP } from './op_nip';
import { OP_OVER } from './op_over';
import { OP_PICK } from './op_pick';
import { OP_ROLL } from './op_roll';
import { OP_ROT } from './op_rot';
import { OP_SWAP } from './op_swap';
import { OP_TUCK } from './op_tuck';
import { OP_2DROP } from './op_2drop';
import { OP_2DUP } from './op_2dup';
import { OP_3DUP } from './op_3dup';
import { OP_2OVER } from './op_2over';
import { OP_2ROT } from './op_2rot';
import { OP_2SWAP } from './op_2swap';
import { OP_CAT } from './op_cat';
import { OP_SIZE } from './op_size';
import { OP_1ADD } from './op_1add';
import { OP_1SUB } from './op_1sub';
import { OP_NEGATE } from './op_negate';
import { OP_ABS } from './op_abs';
import { OP_NOT } from './op_not';
import { OP_0NOTEQUAL } from './op_0notequal';
import { OP_ADD } from './op_add';
import { OP_SUB } from './op_sub';
import { OP_BOOLAND } from './op_booland';
import { OP_BOOLOR } from './op_boolor';
import { OP_NUMEQUAL } from './op_numequal';
import { OP_NUMEQUALVERIFY } from './op_numequalverify';
import { OP_NUMNOTEQUAL } from './op_numnotequal';
import { OP_LESSTHAN } from './op_lessthan';
import { OP_GREATERTHAN } from './op_greaterthan';
import { OP_LESSTHANOREQUAL } from './op_lessthanorequal';
import { OP_GREATERTHANOREQUAL } from './op_greaterthanorequal';
import { OP_MIN } from './op_min';
import { OP_MAX } from './op_max';
import { OP_WITHIN } from './op_within';
import { OP_HASH } from './op_hash';
import { OP_CHECKSIG } from './op_checksig';
import { OP_CHECKSIGVERIFY } from './op_checksigverify';
import { OP_CHECKMULTISIG } from './op_checkmultisig';
import { OP_CHECKMULTISIGVERIFY } from './op_checkmultisigverify';
import { OP_CHECKSIGADD } from './op_checksigadd';
import { OP_CHECKSIGFROMSTACK } from './op_checksigfromstack';
import { OP_INTERNALKEY } from './op_internalkey';
import { OP_PAIRCOMMIT } from './op_paircommit';
import { OP_CLTV } from './op_cltv';

// Combining all opcodes into a map
export const opcodes: { [key: string]: (state: StackState) => StackState } = {
    // Constants
    OP_0: OP_NUMBER(0),
    OP_FALSE: OP_NUMBER(0),
    OP_PUSHDATA1: OP_NOP,
    OP_PUSHDATA2: OP_NOP,
    OP_PUSHDATA4: OP_NOP,
    OP_1NEGATE: OP_NUMBER(-1),
    OP_1: OP_NUMBER(1),
    OP_TRUE: OP_NUMBER(1),
    OP_2: OP_NUMBER(2),
    OP_3: OP_NUMBER(3),
    OP_4: OP_NUMBER(4),
    OP_5: OP_NUMBER(5),
    OP_6: OP_NUMBER(6),
    OP_7: OP_NUMBER(7),
    OP_8: OP_NUMBER(8),
    OP_9: OP_NUMBER(9),
    OP_10: OP_NUMBER(10),
    OP_11: OP_NUMBER(11),
    OP_12: OP_NUMBER(12),
    OP_13: OP_NUMBER(13),
    OP_14: OP_NUMBER(14),
    OP_15: OP_NUMBER(15),
    OP_16: OP_NUMBER(16),

    // Flow control
    OP_NOP,
    OP_IF,
    OP_NOTIF,
    OP_ELSE,
    OP_ENDIF,
    OP_VERIFY,
    OP_RETURN: OP_NOP,

    // Stack
    OP_TOALTSTACK,
    OP_FROMALTSTACK,
    OP_IFDUP,
    OP_DEPTH,
    OP_DROP,
    OP_DUP,
    OP_NIP,
    OP_OVER,
    OP_PICK,
    OP_ROLL,
    OP_ROT,
    OP_SWAP,
    OP_TUCK,
    OP_2DROP,
    OP_2DUP,
    OP_3DUP,
    OP_2OVER,
    OP_2ROT,
    OP_2SWAP,

    // Splice
    OP_CAT,
    OP_SIZE,

    // Bitwise logic
    OP_EQUAL: OP_NUMEQUAL,
    OP_EQUALVERIFY: OP_NUMEQUALVERIFY,

    // Arithmetic
    OP_1ADD,
    OP_1SUB,
    OP_NEGATE,
    OP_ABS,
    OP_NOT,
    OP_0NOTEQUAL,
    OP_ADD,
    OP_SUB,
    OP_BOOLAND,
    OP_BOOLOR,
    OP_NUMEQUAL,
    OP_NUMEQUALVERIFY,
    OP_NUMNOTEQUAL,
    OP_LESSTHAN,
    OP_GREATERTHAN,
    OP_LESSTHANOREQUAL,
    OP_GREATERTHANOREQUAL,
    OP_MIN,
    OP_MAX,
    OP_WITHIN,

    // Crypto
    OP_RIPEMD160: OP_HASH,
    OP_SHA1: OP_HASH,
    OP_SHA256: OP_HASH,
    OP_HASH160: OP_HASH,
    OP_HASH256: OP_HASH,
    OP_CODESEPARATOR: OP_NOP,
    OP_CHECKSIG,
    OP_CHECKSIGVERIFY,
    OP_CHECKMULTISIG,
    OP_CHECKMULTISIGVERIFY,
    OP_CHECKSIGADD,

    // Locktime
    OP_CHECKLOCKTIMEVERIFY: OP_CLTV,
    OP_CHECKSEQUENCEVERIFY: OP_NOP,

    // LNhance
    OP_CHECKTEMPLATEVERIFY: OP_NOP,
    OP_CHECKSIGFROMSTACK,
    OP_INTERNALKEY,
    OP_PAIRCOMMIT,
};
