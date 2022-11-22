# mocha-to-qunit


## Usage

```
npx ember-freshdesk-codemods mocha-to-qunit path/of/files/ or/some**/*glob.js

# or

yarn global add ember-freshdesk-codemods
ember-freshdesk-codemods mocha-to-qunit path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [exception-cases](#exception-cases)
* [module-hooks](#module-hooks)
* [plain-expect](#plain-expect)
* [sinon-assert](#sinon-assert)
* [test-skips](#test-skips)
* [throw](#throw)
* [timeout](#timeout)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/mocha-to-qunit/__testfixtures__/basic.input.js)</small>):
```js
import { expect } from 'chai';
import { describe, it, context } from 'mocha';
import { find, findAll } from '@ember/test-helpers';
import { setupTest, setupWindowMock, setupApplicationTest } from '@freshdesk/test-helpers';

describe('Integration | Component', function() {
  let hooks = setupApplicationTest();
  setupTest();
  setupWindowMock(hooks);
  setupIntl();
  setupMirage();
  setupIntlRenderingTest();

  it('basic expect statements', async function() {
    // Simple true validation
    expect(true).to.be.true;
    expect(true, 'expect with message').to.be.true;
    expect('Test').to.be.ok;
    expect('Test', 'With message').to.be.ok;
    expect('Test').to.be.present;
    expect('Test', 'With message').to.be.present;

    // Simple false validation
    expect(false).to.be.false;
    expect(false, 'expect with message').to.be.false;

    // Negative cases with variance
    expect(result).to.be.empty;
    expect(result, 'With Message').to.be.empty;
    expect(undefined).to.be.undefined;

    // Variations in equal assertion
    expect(true).to.equal(true);
    expect(true).to.equals(true);
    expect(true).to.eq(true);
    expect(find('[data-test-id=page-title]').innerText.trim(), '[Message] Expression with message').to.equal('[Expected] Page Title');
    expect(window.location.pathname).to.be.equal('/support/login');
    expect({key: value}).to.eql({key: value});
    expect({key: value}, 'Assertion Message').to.eql({key: value});
    expect({key: value}).to.deep.equal({key: value});
    expect({key: value}).to.not.deep.equal({key: some_other_value});

    // Variations in length
    // Find out if its a dom present case or not present case
    expect(findAll('[data-test-id=page-title]'), '[Message] Multiple elements should be present').to.have.length(2);
    expect(findAll('[data-test-id=page-title]')).to.have.length(1);
    expect(findAll('[data-test-id=page-title]')).to.have.lengthOf(1);
    expect(findAll('[data-test-id=page-title]'), '[Message] One Element Present').to.have.length(1); // With message and length 1
    expect(findAll('[data-test-id=page-title]'), '[Message] Element not present').to.have.length(0);
    expect(findAll('[data-test-id=page-title]')).to.have.length(0); // Without message
    expect(findAll('[data-test-id=page-title]'), '[Message] Length Comparison with variable value').to.have.length(titles.length);
    expect(findAll('[data-test-id=page-title]')).to.have.length(titlesLength);

    expect(pageTitleSelector, 'Assertion Message').to.have.length(2);
    expect(pageTitleSelector, 'Assertion Message').to.have.lengthOf(titlesLength);
    expect(pageTitleSelector).to.have.length(titlesLength);
    expect(find('[data-test-id=page-titles]').querySelectorAll('[data-test-id=page-title]')).to.have.length(2);
    expect(find('[data-test-id=page-titles]').querySelector('[data-test-id=page-title]')).to.have.length(1);

    // Variations in dom assertions
    expect(find('[data-test-id=page-title]')).to.be.ok;
    expect(findAll('[data-test-id=page-title]')).to.be.empty;
    expect(find('[data-test-id=page-title]').getAttribute('href')).to.contain('/some/url');
    expect(find('[data-test-id=page-title]').className.includes('active')).to.be.true;
    expect(find('[data-test-id=page-titles]').querySelector('[data-test-id=page-title]')).to.exist;
  });

  // 'dom-specific-assertions'
  it('expects various dom specific assertions', function() {
    expect(find('[data-test-id=page-title]')).to.have.attr('href', 'link');
    expect(find('[data-test-id=page-title]'), 'Assertion Message').to.have.attribute('aria-label', 'label');
    expect(find('[data-test-id=page-title]')).to.have.attribute('disabled');
    expect(find('[data-test-id=page-title]')).to.have.class('text--bold');
    expect(findAll('[data-test-id=page-title]')[1]).to.have.class('text--bold');

    expect(find('[data-test-id=page-title]')).to.be.disabled;
    expect(find('[data-test-id=page-title]'), 'Assertion Message').to.be.visible;
    expect(find('[data-test-id=page-title]'), 'Assertion Message').to.have.text('input');
    expect(find('[data-test-id=page-title]')).to.have.trimmed.text('input');
    expect(find('[data-test-id=page-title]')).to.contain.text('input');
    expect(find('[data-test-id=page-title]'),'Assertion Message').to.contain.trimmed.text('input');
    expect(find('[data-test-id=page-title]')).to.have.value('input');
    expect(pageTitleSelector).to.have.attr('href', 'link');
    expect(find(prev_button), 'Validating Previous button').to.have.prop('disabled');
    expect(pageTitleSelector).to.be.disabled;
    expect(pageTitleSelector, 'Assertion Message').to.have.text(inputVariable);

    expect(find('[data-test-id=page-title]'), 'Assertion Message').to.not.have.attr('disabled');
    expect(find('[data-test-id=page-title]')).to.not.be.disabled;
    expect(find('[data-test-id=page-title]')).to.not.be.visible;
    expect(find(updateButton)).to.be.enabled;

    expect(find('[data-test-id=page-title]')).to.not.be.displayed;
    expect(find('[data-test-id=page-title]')).to.be.displayed;
  });

  // 'expected-contains'
  it('Contains expects expected-contains', function() {
    expect([1, 2]).not.to.contain(2);
    expect('Message has input').to.not.contain('input');
    expect('Message', 'Assertions Message').to.not.contains('input');
    expect('Message has input', 'Assertions Message').to.contain('input');
    expect('Message has input').to.contains('input');

    // Not include
    expect('Message has input').that.includes('input');
    expect('Message').to.not.include('input');
  });

  // expected-closeto
  it('Contains expects expected-match', function () {
    expect(165, 'check whether the given number exists within the provided delta').to.be.closeTo(168, 3);
    expect(2.5).to.be.closeTo(2, 0.5);
  });

  // expected-match
  it('Contains expects expected-match', function () {
    expect('Message-1234-message').to.match(/[a-zA-Z]+-\d+-[a-zA-Z]/);
    expect('Message-1234-message').to.match(new RegExp(/[a-zA-Z]+-\d+-[a-zA-Z]/));
  });

  // 'expected-null'
  it('Contains expects expected-null', function() {
    expect('Has Value', 'message').to.not.be.null;
    expect(['Has Value'], 'message').to.be.null;

    // or assert.dom('selector').doesNotExist(message);
    expect(find('dom-selector'), 'message').to.not.be.null;
    expect(find('dom-selector'), 'message').to.be.null;
    expect(domSelector, 'message').to.not.be.null;
    expect(domSelector, 'message').to.be.null;
    expect(subject.get('ticket.customFields.nested_field_item')).to.be.nil;
  });

  // 'expected-exists'
  it('Contains expects expected-exists', function() {
    let refrence = 'Some Value';
    expect('Value').to.exist;
    expect(['Has Value'], 'message').to.exist;
    expect(refrence, 'message').to.exist;
    expect(refrence, 'message').not.to.exist;

    // or assert.dom('selector').doesNotExist(message);
    expect(find('dom-selector')).to.exist;
    expect(find('dom-selector'), 'message').to.exist;
    expect(find('dom-selector'), 'message').to.not.exist;
    expect(findAll('dom-selector')[0]).to.exist;
    expect(findAll('dom-selector')[0]).to.not.exist;
    expect(domSelector).to.exist;
    expect(domSelector, 'message').to.not.exist;
  });

  // compare assertions
  it('Contains expects lt, lte, below, gt, gte, above', function() {
    expect(1).to.be.below(2);
    expect(2, 'assert message').to.be.lt(3);
    expect(2).to.be.lte(2);

    expect(1).to.be.above(2);
    expect(2, 'assert message').to.be.gt(3);
    expect(2).to.be.gte(2);
    expect(findAll('.ember-power-select-option').length).to.be.at.least(1);
  });

  // type check
  it('Contains expects a, an', function() {
    expect([1,2,3]).to.be.an('array');
    expect({x: 1}).to.be.an('object');
    let currentDateVar = new Date();
    expect(currentDateVar).to.be.a('date');
    expect([1, 2]).to.be.an.instanceof(Array);
    expect(blob).to.be.an.instanceof(Blob);
    expect(file).to.be.an.instanceof(File);
  });

  // DeepIncludes
  it('Contains expects keys, property', function() {
    expect(model).to.include.all.keys('content', 'products');
    expect(elementResize(2560, 1600)).to.have.all.keys(2, 3);
    expect(route.controller).to.have.property('emailToDisplay');
    expect(requestParams[0],'some message').to.not.have.any.keys('custom_fields');
    expect(this.get('data.company.domains')).to.have.members(fackDomains);
  });

  // Throws
  it('Contains expects throw', function() {
    expect(result).to.throw();
    expect(result).to.throw(customError);
    expect(fn1).to.not.throw(Error);
  });

  // Called
  it('Contains expects called', function() {
    expect(sinon.spy(), 'Assertion Message').to.have.been.called;
    expect(resultSpy).to.have.been.called;
    expect(sinon.spy(component.get('marketplace').trigger('click_ticket'))).to.have.been.called;
    expect(component.resultSpy).to.have.been.called;
    expect(route.flashMessages.danger).to.have.been.called;
    expect(get(telephony, 'marketplace').publishEvent).to.have.been.called;

    expect(sinon.spy()).to.not.have.been.called;
  });
});

```

**Output** (<small>[basic.output.js](transforms/mocha-to-qunit/__testfixtures__/basic.output.js)</small>):
```js
import { module, test } from 'qunit';
import { find, findAll } from '@ember/test-helpers';
import {
  setupTest,
  setupWindowMock,
  setupApplicationTest
} from '@freshdesk/test-helpers';

module('Integration | Component', function(hooks) {
  setupApplicationTest(hooks);
  setupTest(hooks);
  setupWindowMock(hooks);
  setupIntl(hooks);
  setupMirage(hooks);
  setupIntlRenderingTest(hooks);

  test('basic expect statements', async function(assert) {
    // Simple true validation
    assert.equal(true, true);
    assert.equal(true, true, 'expect with message');
    assert.ok('Test');
    assert.ok('Test', 'With message');
    assert.ok('Test');
    assert.ok('Test', 'With message');

    // Simple false validation
    assert.equal(false, false);
    assert.equal(false, false, 'expect with message');

    // Negative cases with variance
    assert.notOk(result);
    assert.notOk(result, 'With Message');
    assert.notOk(undefined);

    // Variations in equal assertion
    assert.equal(true, true);
    assert.equal(true, true);
    assert.equal(true, true);
    assert.equal(find('[data-test-id=page-title]').innerText.trim(), '[Expected] Page Title', '[Message] Expression with message');
    assert.equal(window.location.pathname, '/support/login');
    assert.deepEqual({key: value}, {key: value});
    assert.deepEqual({key: value}, {key: value}, 'Assertion Message');
    assert.deepEqual({key: value}, {key: value});
    assert.notDeepEqual({key: value}, {key: some_other_value});

    // Variations in length
    // Find out if its a dom present case or not present case
    assert.dom('[data-test-id=page-title]').exists({ count: 2 }, '[Message] Multiple elements should be present');
    assert.dom('[data-test-id=page-title]').exists({ count: 1 });
    assert.dom('[data-test-id=page-title]').exists({ count: 1 });
    assert.dom('[data-test-id=page-title]').exists({ count: 1 }, '[Message] One Element Present'); // With message and length 1
    assert.dom('[data-test-id=page-title]').doesNotExist('[Message] Element not present');
    assert.dom('[data-test-id=page-title]').doesNotExist(); // Without message
    assert.dom('[data-test-id=page-title]').exists({ count: titles.length }, '[Message] Length Comparison with variable value');
    assert.dom('[data-test-id=page-title]').exists({ count: titlesLength });

    assert.equal(pageTitleSelector.length, 2, 'Assertion Message');
    assert.equal(pageTitleSelector.length, titlesLength, 'Assertion Message');
    assert.equal(pageTitleSelector.length, titlesLength);
    assert.equal(find('[data-test-id=page-titles]').querySelectorAll('[data-test-id=page-title]').length, 2);
    assert.equal(find('[data-test-id=page-titles]').querySelector('[data-test-id=page-title]').length, 1);

    // Variations in dom assertions
    assert.dom('[data-test-id=page-title]').exists();
    assert.dom('[data-test-id=page-title]').doesNotExist();
    assert.ok(find('[data-test-id=page-title]').getAttribute('href').includes('/some/url'));
    assert.equal(find('[data-test-id=page-title]').className.includes('active'), true);
    assert.ok(find('[data-test-id=page-titles]').querySelector('[data-test-id=page-title]'));
  });

  // 'dom-specific-assertions'
  test('expects various dom specific assertions', function(assert) {
    assert.dom('[data-test-id=page-title]').hasAttribute('href', 'link');
    assert.dom('[data-test-id=page-title]').hasAttribute('aria-label', 'label', 'Assertion Message');
    assert.dom('[data-test-id=page-title]').hasAttribute('disabled');
    assert.dom('[data-test-id=page-title]').hasClass('text--bold');
    assert.dom(findAll('[data-test-id=page-title]')[1]).hasClass('text--bold');

    assert.dom('[data-test-id=page-title]').isDisabled();
    assert.dom('[data-test-id=page-title]').isVisible('Assertion Message');
    assert.dom('[data-test-id=page-title]').hasText('input', 'Assertion Message');
    assert.dom('[data-test-id=page-title]').hasText('input');
    assert.dom('[data-test-id=page-title]').hasText('input');
    assert.dom('[data-test-id=page-title]').hasText('input', 'Assertion Message');
    assert.dom('[data-test-id=page-title]').hasValue('input');
    assert.dom(pageTitleSelector).hasAttribute('href', 'link');
    assert.dom(prev_button).hasAttribute('disabled', 'Validating Previous button');
    assert.dom(pageTitleSelector).isDisabled();
    assert.dom(pageTitleSelector).hasText(inputVariable, 'Assertion Message');

    assert.dom('[data-test-id=page-title]').doesNotHaveAttribute('disabled', 'Assertion Message');
    assert.dom('[data-test-id=page-title]').isNotDisabled();
    assert.dom('[data-test-id=page-title]').isNotVisible();
    assert.dom(updateButton).isNotDisabled();

    assert.dom('[data-test-id=page-title]').isNotVisible();
    assert.dom('[data-test-id=page-title]').isVisible();
  });

  // 'expected-contains'
  test('Contains expects expected-contains', function(assert) {
    assert.notOk([1, 2].includes(2));
    assert.notOk('Message has input'.includes('input'));
    assert.notOk('Message'.includes('input'), 'Assertions Message');
    assert.ok('Message has input'.includes('input'), 'Assertions Message');
    assert.ok('Message has input'.includes('input'));

    // Not include
    assert.ok('Message has input'.includes('input'));
    assert.notOk('Message'.includes('input'));
  });

  // expected-closeto
  test('Contains expects expected-match', function(assert) {
    assert.closeTo(165, 168, 3, 'check whether the given number exists within the provided delta');
    assert.closeTo(2.5, 2, 0.5);
  });

  // expected-match
  test('Contains expects expected-match', function(assert) {
    assert.ok(/[a-zA-Z]+-\d+-[a-zA-Z]/.test('Message-1234-message'));
    assert.ok(new RegExp(/[a-zA-Z]+-\d+-[a-zA-Z]/).test('Message-1234-message'));
  });

  // 'expected-null'
  test('Contains expects expected-null', function(assert) {
    assert.ok('Has Value', 'message');
    assert.notOk(['Has Value'], 'message');

    // or assert.dom('selector').doesNotExist(message);
    assert.dom('dom-selector').exists('message');
    assert.dom('dom-selector').doesNotExist('message');
    assert.ok(domSelector, 'message');
    assert.notOk(domSelector, 'message');
    assert.notOk(subject.get('ticket.customFields.nested_field_item'));
  });

  // 'expected-exists'
  test('Contains expects expected-exists', function(assert) {
    let refrence = 'Some Value';
    assert.ok('Value');
    assert.ok(['Has Value'], 'message');
    assert.ok(refrence, 'message');
    assert.notOk(refrence, 'message');

    // or assert.dom('selector').doesNotExist(message);
    assert.dom('dom-selector').exists();
    assert.dom('dom-selector').exists('message');
    assert.dom('dom-selector').doesNotExist('message');
    assert.ok(findAll('dom-selector')[0]);
    assert.notOk(findAll('dom-selector')[0]);
    assert.ok(domSelector);
    assert.notOk(domSelector, 'message');
  });

  // compare assertions
  test('Contains expects lt, lte, below, gt, gte, above', function(assert) {
    assert.lt(1, 2);
    assert.lt(2, 3, 'assert message');
    assert.lte(2, 2);

    assert.gt(1, 2);
    assert.gt(2, 3, 'assert message');
    assert.gte(2, 2);
    assert.gte(findAll('.ember-power-select-option').length, 1);
  });

  // type check
  test('Contains expects a, an', function(assert) {
    assert.instanceOf(Array, [1,2,3]);
    assert.instanceOf(Object, {x: 1});
    let currentDateVar = new Date();
    assert.instanceOf(Date, currentDateVar);
    assert.instanceOf(Array, [1, 2]);
    assert.instanceOf(Blob, blob);
    assert.instanceOf(File, file);
  });

  // DeepIncludes
  test('Contains expects keys, property', function(assert) {
    assert.deepIncludes(model, ['content','products']);
    assert.deepIncludes(elementResize(2560, 1600), [2,3]);
    assert.deepIncludes(route.controller, ['emailToDisplay']);
    assert.notDeepIncludes(requestParams[0], ['custom_fields'], 'some message');
    assert.deepIncludes(this.get('data.company.domains'), fackDomains);
  });

  // Throws
  test('Contains expects throw', function(assert) {
    assert.throws(result);
    assert.throws(result, customError);
    assert.ok(fn1);
  });

  // Called
  test('Contains expects called', function(assert) {
    assert.equal(sinon.spy().called, true, 'Assertion Message');
    assert.equal(resultSpy.called, true);
    assert.equal(sinon.spy(component.get('marketplace').trigger('click_ticket')).called, true);
    assert.equal(component.resultSpy.called, true);
    assert.equal(route.flashMessages.danger.called, true);
    assert.equal(get(telephony, 'marketplace').publishEvent.called, true);

    assert.equal(sinon.spy().called, false);
  });
});

```
---
<a id="exception-cases">**exception-cases**</a>

**Input** (<small>[exception-cases.input.js](transforms/mocha-to-qunit/__testfixtures__/exception-cases.input.js)</small>):
```js
import { expect } from 'chai';
import { describe, it, context, beforeEach, afterEach, before, after } from 'mocha';
import { setupTest, setupWindowMock, setupApplicationTest } from '@freshdesk/test-helpers';
import { faker } from 'ember-cli-mirage';
import { run } from '@ember/runloop';
import {
  SWITCHER_OPTIONS as switcherOptions
} from 'freshdesk/constants/automations';
import toto from 'chai';

let name = faker.name.firstName();

describe('Integration | Component test', function() {
  let hooks;
  hooks = setupTest();

  switcherOptions();

  // ...
});

describe('Integration | Component test', function() {
  let hooks, router, route, transitionTo;
  hooks = setupTest();

  // ...
});

describe('Integration | Component', function() {
  let hooks = setupApplicationTest();
  setupTest();
  setupWindowMock(hooks);

  before(function() {
    // Testing for before
  });

  beforeEach(function() {
    // Testing for beforeEach with hooks
  });

  context('Context test turns to module', function() {

    before(function() {
      // Testing for before
    });

    beforeEach(function() {
      // Testing for beforeEach with hooks
    });

    it('Testing await done', async function(done) {
      expect(false).to.not.be.true;
      await done();
    });

    it('basic negative expect statements', async function() {
      expect(false).to.not.be.true;
      expect(false, 'Message').to.not.be.true;
      expect(true).to.not.be.false;
      expect(true, 'Message').to.not.be.false;
      expect(1).to.not.equal(2);
      await expect(1, 'Message').to.not.equal(2);

      expect('Test', 'Message').to.not.be.ok;
      expect('Test', 'not empty assertion').to.not.be.empty;

      // Variations in dom assertions
      await expect(find('[data-test-id=page-title]')).to.be.not.ok;

      return expect(findAll('[data-test-id=page-title]')).to.not.be.empty;
    });

    it('Method with return expression', function() {
      run.later(() => {
        try {
          expect(scrollSpy.calledOnce).to.be.true;
          done();
        } catch(err) {
          done(err);
        }
      }, 100);

      return wait(() => {
        expect(findAll('[data-test-id=page-title]')).to.not.be.empty;
      });
    });
  });

  context('Context test turns to module', function() {

    hooks.beforeEach(function() {
      // Testing for beforeEach with hooks
    });

    afterEach(function() {
      // Testing for afterEach without hooks attribute
    });

    after(function () {
      // Testing for after
    });

    it('Expect within a nested block', function(done) {
      // Comment
      [true, true].forEach((key) => {
        // Inner Comment
        expect(item).to.be.true;
      });

      [true, true].forEach(function(item) {
        // Inner Comment
        expect(item).to.be.true;
      });

      // Will this be a problem
      done();
    });

    [{
      test: '', result: '',
    }].forEach(({ test, result }) => {
      it(`Expect ${test} a nested block`, function() {
        expect(result).to.be.true;
      });
    });
  });
});

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
  });
});

```

**Output** (<small>[exception-cases.output.js](transforms/mocha-to-qunit/__testfixtures__/exception-cases.output.js)</small>):
```js
import { module, test } from 'qunit';
import {
  setupTest,
  setupWindowMock,
  setupApplicationTest
} from '@freshdesk/test-helpers';
import { faker } from 'ember-cli-mirage';
import { run } from '@ember/runloop';
import {
  SWITCHER_OPTIONS as switcherOptions
} from 'freshdesk/constants/automations';

let name = faker.name.firstName();

module('Integration | Component test', function(hooks) {
  setupTest(hooks);

  switcherOptions();

  // ...
});

module('Integration | Component test', function(hooks) {
  let router, route, transitionTo;
  setupTest(hooks);

  // ...
});

module('Integration | Component', function(hooks) {
  setupApplicationTest(hooks);
  setupTest(hooks);
  setupWindowMock(hooks);

  hooks.before(function() {
    // Testing for before
  });

  hooks.beforeEach(function() {
    // Testing for beforeEach with hooks
  });

  module('Context test turns to module', function(hooks) {

    hooks.before(function() {
      // Testing for before
    });

    hooks.beforeEach(function() {
      // Testing for beforeEach with hooks
    });

    test('Testing await done', async function(assert) {
      assert.notEqual(false, true);
    });

    test('basic negative expect statements', async function(assert) {
      assert.notEqual(false, true);
      assert.notEqual(false, true, 'Message');
      assert.notEqual(true, false);
      assert.notEqual(true, false, 'Message');
      assert.notEqual(1, 2);
      await assert.notEqual(1, 2, 'Message');

      assert.notOk('Test', 'Message');
      assert.ok('Test', 'not empty assertion');

      // Variations in dom assertions
      await assert.dom('[data-test-id=page-title]').doesNotExist();

      return assert.dom('[data-test-id=page-title]').exists();
    });

    test('Method with return expression', function(assert) {
      run.later(() => {
        try {
          assert.equal(scrollSpy.calledOnce, true);
        } catch(err) {}
      }, 100);

      return wait(() => {
        assert.dom('[data-test-id=page-title]').exists();
      });
    });
  });

  module('Context test turns to module', function(hooks) {

    hooks.beforeEach(function() {
      // Testing for beforeEach with hooks
    });

    hooks.afterEach(function() {
      // Testing for afterEach without hooks attribute
    });

    hooks.after(function () {
      // Testing for after
    });

    test('Expect within a nested block', function(assert) {
      // Comment
      [true, true].forEach((key) => {
        // Inner Comment
        assert.equal(item, true);
      });

      [true, true].forEach(function(item) {
        // Inner Comment
        assert.equal(item, true);
      });
    });

    [{
      test: '', result: '',
    }].forEach(({ test, result }) => {
      test(`Expect ${test} a nested block`, function(assert) {
        assert.equal(result, true);
      });
    });
  });
});

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
  });
});

```
---
<a id="module-hooks">**module-hooks**</a>

**Input** (<small>[module-hooks.input.js](transforms/mocha-to-qunit/__testfixtures__/module-hooks.input.js)</small>):
```js
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
```

**Output** (<small>[module-hooks.output.js](transforms/mocha-to-qunit/__testfixtures__/module-hooks.output.js)</small>):
```js
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

```
---
<a id="plain-expect">**plain-expect**</a>

**Input** (<small>[plain-expect.input.js](transforms/mocha-to-qunit/__testfixtures__/plain-expect.input.js)</small>):
```js
it('Method with return expression', function() {
  expect(currentURL());
  expect('toto');
});

// Input
// it('Method with return expression', function() {
//   expect(currentURL(), 'Url page', '/url/param');
//   expect(find(ref)[0]);
//   expect(find('#element'));
//   expect(findAll('.elements').length, 1);
//   expect('[data-test-id="selector"]'.length, 0);
//   expect(calledSpy.calledWith(ref));
// });

// Output
// test('Method with return expression', function(assert) {
//   assert.equal(currentURL(), '/url/param', 'Url page');
//   assert.ok(find(ref)[0]);
//   assert.ok(find('#element'));
//   assert.equal(findAll('.elements').length, 1);
//   assert.equal('[data-test-id="selector"]'.length, 0);
//   assert.ok(calledSpy.calledWith(ref));
// });

```

**Output** (<small>[plain-expect.output.js](transforms/mocha-to-qunit/__testfixtures__/plain-expect.output.js)</small>):
```js
test('Method with return expression', function(assert) {
  assert.ok(currentURL());
  assert.ok('toto');
});

// Input
// it('Method with return expression', function() {
//   expect(currentURL(), 'Url page', '/url/param');
//   expect(find(ref)[0]);
//   expect(find('#element'));
//   expect(findAll('.elements').length, 1);
//   expect('[data-test-id="selector"]'.length, 0);
//   expect(calledSpy.calledWith(ref));
// });

// Output
// test('Method with return expression', function(assert) {
//   assert.equal(currentURL(), '/url/param', 'Url page');
//   assert.ok(find(ref)[0]);
//   assert.ok(find('#element'));
//   assert.equal(findAll('.elements').length, 1);
//   assert.equal('[data-test-id="selector"]'.length, 0);
//   assert.ok(calledSpy.calledWith(ref));
// });

```
---
<a id="sinon-assert">**sinon-assert**</a>

**Input** (<small>[sinon-assert.input.js](transforms/mocha-to-qunit/__testfixtures__/sinon-assert.input.js)</small>):
```js
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

```

**Output** (<small>[sinon-assert.output.js](transforms/mocha-to-qunit/__testfixtures__/sinon-assert.output.js)</small>):
```js
import { module, test } from 'qunit';

module('Integration | Component', function() {
  test('basic expect statements', async function(assert) {
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

```
---
<a id="test-skips">**test-skips**</a>

**Input** (<small>[test-skips.input.js](transforms/mocha-to-qunit/__testfixtures__/test-skips.input.js)</small>):
```js
import { describe, it, context } from 'mocha';

describe('Integration | Component', function() {

  it('Defination of the test', function() {
    // ...
  });

  it.skip('Defination of the test', function() {
    // ...
  });

  context('Context test turns to module', function() {
    // ...

    it('Defination of the test', function() {
      // ...
    });
  });

  context.skip('Context test turns to module', function() {

    // Should only skip the tests within the context.
    it('Defination of the skipped test', function() {
      // ...
    });

    // Should only skip the tests within the context.
    it('Defination of the skipped test', function() {
      // ...
    });
  });
});

```

**Output** (<small>[test-skips.output.js](transforms/mocha-to-qunit/__testfixtures__/test-skips.output.js)</small>):
```js
import { module, test, skip } from 'qunit';

module('Integration | Component', function() {

  test('Defination of the test', function() {
    // ...
  });

  skip('Defination of the test', function() {
    // ...
  });

  module('Context test turns to module', function() {
    // ...

    test('Defination of the test', function() {
      // ...
    });
  });

  module('Context test turns to module', function() {

    // Should only skip the tests within the context.
    skip('Defination of the skipped test', function() {
      // ...
    });

    // Should only skip the tests within the context.
    skip('Defination of the skipped test', function() {
      // ...
    });
  });
});

```
---
<a id="throw">**throw**</a>

**Input** (<small>[throw.input.js](transforms/mocha-to-qunit/__testfixtures__/throw.input.js)</small>):
```js
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

```

**Output** (<small>[throw.output.js](transforms/mocha-to-qunit/__testfixtures__/throw.output.js)</small>):
```js
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

```
---
<a id="timeout">**timeout**</a>

**Input** (<small>[timeout.input.js](transforms/mocha-to-qunit/__testfixtures__/timeout.input.js)</small>):
```js
import { describe, it, context } from 'mocha';

describe('Integration | Component', function() {
  it('basic expect statements', async function() {
    this.timeout(500);
    const toto = 'ma superbe variable';

    await maFonction();

    expect(true).to.be.true;
  });
});

```

**Output** (<small>[timeout.output.js](transforms/mocha-to-qunit/__testfixtures__/timeout.output.js)</small>):
```js
import { module, test } from 'qunit';

module('Integration | Component', function() {
  test('basic expect statements', async function(assert) {
    assert.timeout(500);
    const toto = 'ma superbe variable';

    await maFonction();

    assert.equal(true, true);
  });
});

```
<!--FIXTURES_CONTENT_END-->
