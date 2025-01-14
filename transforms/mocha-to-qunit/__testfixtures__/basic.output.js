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
