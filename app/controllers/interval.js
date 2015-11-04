import Ember from 'ember';
import config from '../config/environment';

// In Ember 2.0, controllers are deprecated, but if you want to use
// query params, it seems like you must have a controller.

// The official guide (http://guides.emberjs.com/v2.1.0/controllers/)
// says, "Controllers are very much like components, so much so that
// in future versions of Ember, controllers will be replaced entirely
// with components. At the moment, components cannot be routed to, but
// when this changes, it will be recommended to replace all
// controllers with components."

// TL;DR this controller is a necessary evil!

let formatter = config.APP.formatter;

export default Ember.Controller.extend({

  queryParams: ['from', 'to'],
  from: null,
  to: null,

  // validation errors, if any.
  errors: Ember.A([]),

  validate (param) {
    if(param === null) {
      return false;
    }
    let regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (param.match(regex) === null) {
      return false;
    }
    // we match against an supported ISO-8601 string so moment can
    // automatically parse this string; nonetheless, it's better to
    // be explicit.
    let date = moment(param, formatter);
    return date.isValid() ? date : false;
  },

  // every time to/from changes, make sure the changes are valid; if
  // not, push the appropriate error message.
  updateQuery: function() {
    this.set('errors', Ember.A([]));
    let from = this.get('from');
    let to = this.get('to');

    let fromValid = this.validate(from);
    if(!fromValid) {
      let error = 'Could not parse "from": "' + from +
          '"; please use the format "' + formatter + '"';
      this.errors.pushObject(error);
    }
    let toValid = this.validate(to);
    if(!toValid) {
      let error = 'Could not parse "to": "' + to +
          '"; please use the format "' + formatter + '"';
      this.errors.pushObject(error);
    }
    if(fromValid && toValid) {
      if(fromValid.isAfter(toValid)) {
        this.errors.pushObject('"from" parameter cannot be after "to"');
      }
    }
  }.observes('from', 'to'),

  // if one (or both) of our query parameters happens to be blank,
  // fill it in with default values from the passed-in model.
  updateDefaults: function() {
    let model = this.get('model');
    if(this.get('from') === null) {
      this.set('from', model.from.format(formatter));
    }
    if(this.get('to') === null) {
      this.set('to', model.to.format(formatter));
    }
  }.observes('model'),

  // actions from child components that modify the date/time
  actions: {
    changeFromDate: function(from) {
      this.set('from', from);
    },
    changeToDate: function(to) {
      this.set('to', to);
    }
  }
});
