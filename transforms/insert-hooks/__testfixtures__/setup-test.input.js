import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import { setupTranslations, setupSinonSandbox } from '@freshdesk/test-helpers';

describe('Some test', () => {
  setupTest();
  setupTranslations(true);
  setupSinonSandbox();
  setupIntl();

  setupSolution({
    isDefaultLocale: true
  });

  setupSolution();

  it('Some test', function() {
    // ...
  });
});
