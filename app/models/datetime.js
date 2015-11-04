import Ember from 'ember';

export default Ember.Object.extend({
  from: moment().subtract(2, 'hours'),
  to: moment()
});
