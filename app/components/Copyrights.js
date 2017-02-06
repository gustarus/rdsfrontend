'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');

module.exports = Backbone.View.extend({

  tagName: 'header',
  className: 'header',

  initialize: function() {
    this.$title = $('<h2 class="header__title"></h2>');
    this.$description = $('<h4 class="header__description"></h4>');
  },

  render: function() {
    this.$el.append(this.$title);
    this.$el.append(this.$description);
  },

  title: function(title) {
    this.$title.html(title);
  },

  description: function(description) {
    this.$description.html(description);
  }
});
