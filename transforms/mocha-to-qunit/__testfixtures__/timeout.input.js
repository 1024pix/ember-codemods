import { describe, it, context } from 'mocha';

describe('Integration | Component', function() {
  it('basic expect statements', async function() {
    this.timeout(500);
    const toto = 'ma superbe variable';

    await maFonction();

    expect(true).to.be.true;
  });
});
