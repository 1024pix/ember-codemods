import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import {
  setupTranslations,
  setupSinonSandbox
} from '@freshdesk/test-helpers';

describe('Some test', () => {
  let hooks = setupTest();
  setupTranslations(hooks);
  setupSinonSandbox(hooks);
  setupIntl(hooks);

  setupSolution(hooks, {
    isDefaultLocale: true
  });

  setupSolution(hooks);

  it('Some test', function() {
    // ...
  });
});
