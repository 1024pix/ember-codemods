import { module, test } from 'qunit';

module('Integration | Component', function() {
  test('basic expect statements', async function(assert) {
    assert.timeout(500);
    const toto = 'ma superbe variable';

    await maFonction();

    assert.equal(true, true);
  });
});
