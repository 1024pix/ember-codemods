import { module, test } from 'qunit';

module('Integration | Component test', function(hooks) {
  setupTest(hooks);

  module('Integration | Component test', function() {

    module('foo', function(hooks) {
      hooks.beforeEach(function () {
        const foo = 'bar';
      });

      test('Testing await done', async function(assert) {
        assert.notEqual(false, true);
      });
    });

    module('foo2', function(hooks) {

      hooks.beforeEach(function () {
        const foo = 'bar';
      });

      test('Testing await done', async function(assert) {
        assert.notEqual(false, true);
      });

      module('foo3', function(hooks) {
        hooks.beforeEach(function () {
          const foo = 'bar';
        });

        test('Testing await done', async function(assert) {
          assert.notEqual(false, true);
        });
      });
    });
  });
});
