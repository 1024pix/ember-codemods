import { module, test } from 'qunit';

module('Integration | Component', function() {
  test('basic expect statements', async function() {
    const toto = 'ma superbe variable';

    await maFonction();

    sinon.assert.calledOnce(stub);
    sinon.assert.calledOnce(stub2);
    assert.ok(true);
  });

  test('basic expect statements', async function(assert) {
    const toto = 'ma superbe variable';

    await maFonction();

    sinon.assert.calledOnce(stub2);
    assert.ok(true);
  });
});
