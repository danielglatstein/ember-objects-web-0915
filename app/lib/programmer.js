import Ember from 'ember';

export default Ember.Object.extend({ 
  firstName: null,
  lastName: null,
  nickName: null,
  age: null,
  email: "",
  authorOf: "Ruby",
  conferences: [],

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  greet(){
    return `Hi, My name is ${this.get('firstName')} ${this.get('lastName')}. You can call me ${this.get('nickName')}`;
  },

  isOld: Ember.computed.gt("age", 30),
  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),
  addConference(conference){
    this.get("conferences").pushObject(conference);
  },

  keyNoteConferences: Ember.computed("conferences.@each.keyNote",function() {
      return this.get('conferences').filterBy('keyNote', this.get("fullName")); 
  }),

  conferenceNames: Ember.computed("conferences.@each.name",function() {
    return this.get("conferences").mapBy('name');
  }),

  conferenceTotal: Ember.computed("conferences", function() {
    return this.get('conferences').length;
  }),

  itinerary: Ember.computed('nickName', 'conferenceTotal', function(){
    return `${this.nickName} is speaking at ${this.get('conferenceTotal')} conferences`;
  }),

  hasValidEmail: Ember.computed('email', function(){
    return this.get('email').includes('@'); 
  }),

  hasFirstName: Ember.computed('firstName', function(){
    if(this.get('firstName')){ return true; }
  }),

  hasLastName: Ember.computed('lastName', function(){
    if(this.get('lastName')){ return true; }
  }),

  hasAge: Ember.computed('age', function(){
    if(this.get('age')){ return true; }
  }),

  isInvalid: Ember.computed('hasValidEmail', 'hasFirstName', 'hasLastName', 'hasAge', function(){
    return !(this.get('hasValidEmail') && this.get('hasFirstName') && this.get('hasLastName') && this.get('hasAge'));
  }),

  hasErrors: Ember.computed('errors', function(){
    return this.get('errors').length > 0;
  }),

  errors: Ember.computed('hasValidEmail', 'hasFirstName', 'hasLastName', 'hasAge', function(){
    var errors = [];
    if (!this.get('hasValidEmail')) {errors.push("email must be valid");}
    if (!this.get('hasFirstName')) {errors.push("firstName cannot be blank");}
    if (!this.get('hasLastName')) {errors.push("lastName cannot be blank");}
    if (!this.get('hasAge')) {errors.push("age cannot be blank");}
    return errors;
  }),

  isValid: Ember.computed('hasErrors', function(){
    return !this.get('hasErrors');
  })

});

