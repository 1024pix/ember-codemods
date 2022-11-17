import {  context } from 'mocha';

describe('Integration | Component', function() {
  it('basic expect statements', async function() {
    const toto = 'ma superbe variable';

    await maFonction();

    sinon.assert.calledOnce(stub);
    sinon.assert.calledOnce(stub2);
  });

  it('basic expect statements', async function() {
    const toto = 'ma superbe variable';

    await maFonction();

    sinon.assert.calledOnce(stub2);
  });
});
