import { module, test } from 'qunit';
import { setupTest, setupApplicationTest } from '@freshdesk/test-helpers';

module('Integration | Component', function(hooks) {
  setupApplicationTest(hooks);
  setupTest(hooks);

  test('Contains expects throw', function(assert) {
    assert.deepEqual(areas.map((area) => area.get('code')), [1, 2]);
    assert.throws(() => parseISODateOnly(dateStringWithInvertedDayAndMonth));
  });
});
