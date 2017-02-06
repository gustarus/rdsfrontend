'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');
let icon = require('@core/templates/icon.jade');

module.exports = Backbone.View.extend({

  tagName: 'a',
  className: 'webulla',
  attributes: {
    href: 'http://webulla.ru',
    target: '_blank'
  },

  initialize: function() {
    this.$icon = $(icon({name: 'webulla', className: 'webulla__logo'}));
  },

  render: function() {
    this.$el.append(this.$icon);
  }
});
