import Ember from 'ember';

export default Ember.Component.extend({

  date: function() {
    return moment(this.data).format('YYYY-MM-DD');
  }.property('data'),

  time: function() {
    return moment(this.data).format('HH:mm:ss');
  }.property('data')

});
