import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-time', 'Integration | Component | date time', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('data', '2015-10-20T11:00:00');
  this.render(hbs`{{date-time label="Test" data=data}}`);

  let text = this.$().text();
  assert.equal(text.indexOf("Test") >= 0, true);
});

test('date was formatted properly', function(assert) {
  assert.expect(1);

  this.set('data', '2015-10-20T11:00:00');
  this.render(hbs`{{date-time label="Test" data=data}}`);

  assert.equal(this.$('input:first').val(), '2015-10-20');
});

test('given invalid values, date returns "Invalid date"', function(assert) {
  assert.expect(1);

  this.set('data', 'something invalid');
  this.render(hbs`{{date-time label="Test" data=data}}`);

  assert.equal(this.$('input:first').val(), 'Invalid date');
});

test('time was formatted properly', function(assert) {
  assert.expect(1);

  this.set('data', '2015-10-20T11:00:00');
  this.render(hbs`{{date-time label="Test" data=data}}`);

  assert.equal(this.$('input:last').val(), '11:00:00');
});

test('given invalid values, time returns "Invalid date"', function(assert) {
  assert.expect(1);

  this.set('data', 'something invalid');
  this.render(hbs`{{date-time label="Test" data=data}}`);

  assert.equal(this.$('input:last').val(), 'Invalid date');
});
