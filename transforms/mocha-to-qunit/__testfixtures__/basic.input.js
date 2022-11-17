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
