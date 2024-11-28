script! {
    // [5], []
    OP_TOALTSTACK
    OP_DEPTH
    OP_0
    OP_IF
        OP_SHA256
        OP_FROMALTSTACK
        OP_SWAP
        OP_TOALTSTACK
    OP_ELSE
        OP_FROMALTSTACK
    OP_ENDIF
}

script! {
    // [5, 1], []
    OP_TOALTSTACK
    OP_DEPTH
    OP_1
    OP_IF
        OP_SHA256
        OP_FROMALTSTACK
        OP_SWAP
        OP_TOALTSTACK
    OP_ELSE
        OP_FROMALTSTACK
    OP_ENDIF
}
