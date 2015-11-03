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
  }.property('from', 'to')

});
