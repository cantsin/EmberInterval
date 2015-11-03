import Ember from 'ember';

// In Ember 2.0, controllers are deprecated, but if you want to use
// query params, it seems like you must have a controller.

// The official guide (http://guides.emberjs.com/v2.1.0/controllers/)
// says, "Controllers are very much like components, so much so that
// in future versions of Ember, controllers will be replaced entirely
// with components. At the moment, components cannot be routed to, but
// when this changes, it will be recommended to replace all
// controllers with components."

// TL;DR this controller is a necessary evil!

export default Ember.Controller.extend({

  queryParams: ['from', 'to'],
  from: null,
  to: null,

  // if one (or both) of our query parameters happens to be blank,
  // fill it in with default values from the default model.
  updateDefaults: function() {
    let model = this.get('model');
    if(this.get('from') === null) {
      this.set('from', model.from.format('YYYY-MM-DDTHH:mm:ss'));
    }
    if(this.get('to') === null) {
      this.set('to', model.to.format('YYYY-MM-DDTHH:mm:ss'));
    }
    console.log(this);
    // TODO refresh (only if null)?
  }.observes('model')

});
