import Ember from 'ember';

export default Ember.Component.extend({

  date: function() {
    return moment(this.data, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD');
  }.property('data'),

  time: function() {
    return moment(this.data, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm:ss');
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
