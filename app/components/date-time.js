import Ember from 'ember';

let formatter = window.EmberInterval.formatter;

export default Ember.Component.extend({

  date: function() {
    return moment(this.data, formatter).format('YYYY-MM-DD');
  }.property('data'),

  time: function() {
    return moment(this.data, formatter).format('HH:mm:ss');
  }.property('data'),

  actions: {
    changeDate: function(date) {
      let newValue = date + 'T' + this.get('time');
      this.sendAction('action', newValue);
    },
    changeTime: function(time) {
      let newValue = this.get('date') + 'T' + time;
      this.sendAction('action', newValue);
    }
  }
});
