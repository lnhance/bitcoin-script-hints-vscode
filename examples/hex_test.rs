use bitcoin_script::script;

fn main() {
    let test_script = script! {
        // [1234]
        0x1234
        OP_DUP
        0xabcd
        OP_ADD
    };
}
