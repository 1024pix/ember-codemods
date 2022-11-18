import { describe, it, context, beforeEach, afterEach, before, after } from 'mocha';

describe('Integration | Component test', function() {
  setupTest();

  describe('Integration | Component test', function() {

    describe('foo', function() {
      beforeEach(function () {
        const foo = 'bar';
      });

      it('Testing await done', async function() {
        expect(false).not.equal(true);
      });
    });

    describe('foo2', function() {

      beforeEach(function () {
        const foo = 'bar';
      });

      it('Testing await done', async function() {
        expect(false).not.equal(true);
      });

      describe('foo3', function() {
        beforeEach(function () {
          const foo = 'bar';
        });

        it('Testing await done', async function() {
          expect(false).not.equal(true);
        });
      });
    });
  });
});