import { expect } from 'chai';
import { describe, it, context } from 'mocha';
import { setupTest, setupApplicationTest } from '@freshdesk/test-helpers';

describe('Integration | Component', function() {
  let hooks = setupApplicationTest();
  setupTest();

  it('Contains expects throw', function() {
    expect(areas.map((area) => area.get('code'))).to.deep.equal([1, 2]);
    expect(() => parseISODateOnly(dateStringWithInvertedDayAndMonth)).to.throw();
  });
});
