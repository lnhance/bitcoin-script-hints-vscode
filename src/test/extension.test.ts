import * as assert from 'assert';
import { StackState } from '../stackstate';
import { OP_ADD } from '../opcodes/op_add';

suite('Bitcoin Script Tests', () => {
    test('OP_ADD basic functionality', () => {
        // Test successful addition
        let state: StackState = {
            main: ['2', '3'],
            alt: [],
            error: undefined
        };
        
        let result = OP_ADD(state);
        assert.strictEqual(result.error, undefined);
        assert.strictEqual(result.main.length, 1);
        assert.strictEqual(result.main[0], '5');

        // Test error case - not enough items
        state = {
            main: ['1'],
            alt: [],
            error: undefined
        };
        
        result = OP_ADD(state);
        assert.notStrictEqual(result.error, undefined);
        assert.strictEqual(result.error, 'Need two items for ADD');
    });
});
