import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:interval', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('default values are given', function(assert) {
  assert.expect(4);

  var controller = this.subject();
  assert.equal(controller.get('from'), null);
  assert.equal(controller.get('to'), null);

  // we shim in the date because we do not have access to the moment
  // library (it is not importable and is a global variable)
  let date1 = '2015-10-20T11:00:00';
  let date2 = '2015-10-27T13:15:00';
  let from = {
    format: function() { return date1; }
  };
  let to = {
    format: function() { return date2; }
  };
  let model = Ember.Object.create({ from: from, to: to});
  controller.set('model', model);
  assert.equal(controller.get('from'), date1);
  assert.equal(controller.get('to'), date2);
});

test('invalid values yield error messages', function(assert) {
  assert.expect(1);

  var controller = this.subject();
  controller.set('from', 'invalid date');
  controller.set('to', 'another invalid date');

  assert.equal(controller.get('errors').length, 2);
});

test('from > to yields an error message', function(assert) {
  assert.expect(1);

  var controller = this.subject();
  controller.set('from', '2018-10-20T11:00:00');
  controller.set('to', '2015-10-20T11:00:00');

  assert.equal(controller.get('errors').length, 1);
});

test('setting correct dates does not yield an error message', function(assert) {
  assert.expect(1);

  var controller = this.subject();
  controller.set('from', '2015-10-20T11:00:00');
  controller.set('to', '2018-10-20T11:00:00');

  assert.equal(controller.get('errors').length, 0);
});
