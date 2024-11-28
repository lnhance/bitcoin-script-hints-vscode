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

// Combining all opcodes into a map
export const opcodes: { [key: string]: (state: StackState) => StackState } = {
    // Constants:
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

    // Flow control:
    OP_NOP,
    OP_IF,
    OP_NOTIF,
    OP_ELSE,
    OP_ENDIF,
    OP_VERIFY,

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

    // Arithmetic
    OP_1ADD,
    OP_1SUB,
    OP_NEGATE,
    OP_ABS,
    OP_NOT,
    OP_0NOTEQUAL,
    OP_ADD,
    OP_SUB,

};

// Constants
export const OP_FALSE = OP_NUMBER(0);
export const OP_TRUE = OP_NUMBER(1);