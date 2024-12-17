// https://mempool.space/tx/ec2767939a0821509db990e57c90e7334985293ebe6b1a312a57427059c85750

#![feature(proc_macro_hygiene)]

use bitcoin::blockdata::script::Builder;
use bitcoin::hashes::{sha256, Hash};
use bitcoin::opcodes::OP_0;
use bitcoin::script::PushBytesBuf;
use bitcoin::hex::FromHex;
use bitcoin_script::{script, define_pushable};

define_pushable!();
//[1, 0x30440220215fd965dcdeb375206975db7e9ce99c9c764b4e242a25df1a9fd4f475079de102206e9c71ff1c2509eb38ea01dd4a3999c06dc58d3e15b1299637207781f04ac07401,  0, 0x304402202f419e9e1ca7e30b1104b294ffe1e33318f0c68510d4d2b9a51c0cc3ca52b194022069e7db6dbd21604773cf0eb9df89728837ff847f1e5293d2cdf506ad658bb61101, 0, 0 , 0x3044022068410ea96afdc386c09f80c65caadfd45de77e50db987fcaf6899e2e2d0b20dd02207e7b5aa905ce28184e0796c765ce8def904b1e295262624ba04d25d710ae602e01, 0x304402207f577e4d463b7335cdfc894f0325000014e6b933f7461ccbc0c09f6c3f06d80e02201f7d3ef7be846e5da5dc6deca693780d4888cda3330446eb27aa3f0d6325b19001]
fn main() {
    let witness_script = script! {
        //[0x304402207f577e4d463b7335cdfc894f0325000014e6b933f7461ccbc0c09f6c3f06d80e02201f7d3ef7be846e5da5dc6deca693780d4888cda3330446eb27aa3f0d6325b19001, 0x3044022068410ea96afdc386c09f80c65caadfd45de77e50db987fcaf6899e2e2d0b20dd02207e7b5aa905ce28184e0796c765ce8def904b1e295262624ba04d25d710ae602e01, 0, 0, 0x304402202f419e9e1ca7e30b1104b294ffe1e33318f0c68510d4d2b9a51c0cc3ca52b194022069e7db6dbd21604773cf0eb9df89728837ff847f1e5293d2cdf506ad658bb61101, 0, 0x30440220215fd965dcdeb375206975db7e9ce99c9c764b4e242a25df1a9fd4f475079de102206e9c71ff1c2509eb38ea01dd4a3999c06dc58d3e15b1299637207781f04ac07401, 1]
        OP_2
        0x0262951e79a84b7a26391d5b41e0ede523c57cb95bcbf3cf8513bb08290ec8cb64
        0x024939981b060bdd215d228c02abe0c92c2fc43ac07ef1bad82804c5a12d69c7ed
        0x0243dfd28e78b1c1b23f56c8ae06da0dc79821f386719adc6d6a982afe2215771b
        OP_3
        OP_CHECKMULTISIG
        OP_TRUE
        OP_DROP
        OP_NOTIF
            OP_DUP
            OP_HASH160
            0xcad7301b8d56b4566ec0cec39b48de5c8b8fc81e
            OP_EQUALVERIFY
            OP_CHECKSIG
            OP_TOALTSTACK
            OP_DUP
            OP_HASH160
            0x2d26c2080f8034c9c3151a5c5bc566ed725712b6
            OP_EQUALVERIFY
            OP_CHECKSIG
            OP_FROMALTSTACK
            OP_ADD
            OP_TOALTSTACK
            OP_DUP
            OP_HASH160
            0xa3f1c526d5296122b6c85c7a8a28b5b2b79e0689
            OP_EQUALVERIFY
            OP_CHECKSIG
            OP_FROMALTSTACK
            OP_ADD
            OP_PUSHNUM_2
            OP_EQUALVERIFY
            0x80e93c68
            OP_CLTV
        OP_ELSE
            OP_IF
                OP_DUP
                OP_HASH160
                0x0c9d596182313b8b49f0bad8155c651c5c2c3bc7
                OP_EQUALVERIFY
                OP_CHECKSIGVERIFY
                0x00960168
                OP_CLTV
            OP_ELSE
                0x02c8bdda9bee158a8acf6e44afb184064b374cc7c4bedbcb5b1e5ce27a6017b0cd
                OP_CHECKSIG
                OP_SWAP
                0x03b14b714197d2f1ecb0b8f1581c2d31bf119f9ec51a59da943fd62175f853013c
                OP_CHECKSIG
                OP_ADD
                OP_SWAP
                0x0208780fef362fef9cda76a94636eea567caa1cce9118c3ee61a4118380a516128
                OP_CHECKSIG
                OP_ADD
                OP_SWAP
                OP_IF
                    0
                OP_ELSE
                    0x803d3567
                    OP_CLTV
                OP_ENDIF
                OP_0NOTEQUAL
                OP_ADD
                OP_PUSHNUM_2
                OP_EQUAL
            OP_ENDIF
        OP_ENDIF
    };

    let witness_stack = vec![
        Vec::from_hex("01").unwrap(),
        Vec::from_hex("30440220215fd965dcdeb375206975db7e9ce99c9c764b4e242a25df1a9fd4f475079de102206e9c71ff1c2509eb38ea01dd4a3999c06dc58d3e15b1299637207781f04ac07401").unwrap(),
        vec![],
        Vec::from_hex("304402202f419e9e1ca7e30b1104b294ffe1e33318f0c68510d4d2b9a51c0cc3ca52b194022069e7db6dbd21604773cf0eb9df89728837ff847f1e5293d2cdf506ad658bb61101").unwrap(),
        vec![],
        vec![],
        Vec::from_hex("3044022068410ea96afdc386c09f80c65caadfd45de77e50db987fcaf6899e2e2d0b20dd02207e7b5aa905ce28184e0796c765ce8def904b1e295262624ba04d25d710ae602e01").unwrap(),
        Vec::from_hex("304402207f577e4d463b7335cdfc894f0325000014e6b933f7461ccbc0c09f6c3f06d80e02201f7d3ef7be846e5da5dc6deca693780d4888cda3330446eb27aa3f0d6325b19001").unwrap(),
        witness_script.to_bytes(),
    ];

    let witness_script_hash = sha256::Hash::hash(&witness_script.to_bytes());
    let hash_buf = PushBytesBuf::from(witness_script_hash.to_byte_array());

    let p2wsh_script = Builder::new()
        .push_opcode(OP_0)
        .push_slice(&hash_buf)
        .into_script();

    println!("Witness Script: {:?}", witness_script);
    println!("P2WSH Script: {:?}", p2wsh_script);
    println!("Witness Stack Elements: {}", witness_stack.len());
}