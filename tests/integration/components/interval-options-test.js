import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('interval-options', 'Integration | Component | interval options', {
  integration: true
});

test('it renders with default values', function(assert) {
  assert.expect(6);

  this.set('from', '2015-10-20T11:00:00');
  this.set('to', '2015-10-27T13:15:00');

  this.render(hbs`{{interval-options from=from to=to}}`);

  let text = this.$().text();
  assert.equal(text.indexOf('7 days 2 hours 15 minutes') >= 0, true);
  assert.equal(text.indexOf('Option 1') >= 0, false);
  assert.equal(text.indexOf('Option 2') >= 0, true);
  assert.equal(text.indexOf('Option 3') >= 0, true);
  assert.equal(text.indexOf('Option 4') >= 0, true);
  assert.equal(text.indexOf('Option 5') >= 0, true);
});

test('given nonsensical values, return zero', function(assert) {
  assert.expect(1);

  this.set('from', 'somewhen');
  this.set('to', 'another somewhen');

  this.render(hbs`{{interval-options from=from to=to}}`);

  let text = this.$().text();
  // even though the values are nonsensical we should get zero.
  assert.equal(text.indexOf('0 days 0 hours 0 minutes') >= 0, true);
});
