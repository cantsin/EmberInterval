import Ember from 'ember';

export default Ember.Component.extend({

  elapsed: function () {
    let from = moment(this.get('from'), 'YYYY-MM-DDTHH:mm:ss');
    let to = moment(this.get('to'), 'YYYY-MM-DDTHH:mm:ss');
    let difference = moment.duration(to.diff(from));
    let days = Math.floor(difference.asDays());
    let hours = Math.floor(difference.asHours()) - (days * 24);
    let minutes = Math.floor(difference.asMinutes()) - (days * 24 * 60) - (hours * 60);
    return {
      days: days,
      hours: hours,
      minutes: minutes
    };
  }.property('from', 'to'),

  options: function() {
    let elapsed = this.get('elapsed');
    if(elapsed.days < 0) {
      return [];
    } else if(elapsed.days < 7) {
      return [1,2,3,4,5];
    } else if(elapsed.days < 31) {
      return [2,3,4,5];
    } else if(elapsed.days < 366) {
      return [3,4,5];
    } else {
      return [4,5];
    }
  }.property('elapsed')

});
