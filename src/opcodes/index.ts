import { StackState } from '../stackstate';
import { makeError, toNumber } from '../utils';
import { OP_NOP } from './op_nop';
import { OP_NUMBER } from './op_number';
import { OP_IF } from './op_if';
import { OP_NOTIF } from './op_notif';
import { OP_ELSE } from './op_else';
import { OP_ENDIF } from './op_endif';
import { OP_VERIFY } from './op_verify';

// Combining all opcodes into a map
export const opcodes: { [key: string]: (state: StackState) => StackState } = {
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
    OP_NOP,
    OP_IF,
    OP_NOTIF,
    OP_ELSE,
    OP_ENDIF,
    OP_VERIFY,

};

// Constants
export const OP_FALSE = OP_NUMBER(0);
export const OP_TRUE = OP_NUMBER(1);