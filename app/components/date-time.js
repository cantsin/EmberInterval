import Ember from 'ember';

export default Ember.Component.extend({

  date: function() {
    return moment(this.data, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD');
  }.property('data'),

  time: function() {
    return moment(this.data, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss');
  }.property('data')

});
