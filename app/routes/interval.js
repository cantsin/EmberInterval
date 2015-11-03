import Ember from 'ember';

// dummy model with default data
import DateTimeModel from '../models/datetime';

export default Ember.Route.extend({
  model() {
    return DateTimeModel.create();
  }
});
