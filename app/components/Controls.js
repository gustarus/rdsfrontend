'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');
let Man = require('@core/components/Man');
let Speaker = require('@core/components/Speaker');
let Woman = require('@core/components/Woman');

module.exports = Backbone.View.extend({

  className: 'controls',

  initialize: function() {
    this.man = new Man();
    this.speaker = new Speaker();
    this.woman = new Woman();
  },

  render: function() {
    this.man.render();
    this.$el.append(this.man.$el);

    this.speaker.render();
    this.$el.append(this.speaker.$el);

    this.woman.render();
    this.$el.append(this.woman.$el);
  }
});
