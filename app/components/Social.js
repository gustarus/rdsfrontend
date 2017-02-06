'use strict';

let _ = require('underscore');
let $ = window.jQuery = require('jquery');
require('@core/vendors/jquery.rrssb');
let Backbone = require('backbone');

let template = require('@core/templates/social.jade');

let getOpenGraphValue = function(tag) {
  return $(`meta[property="og:${tag}"]:first`).attr('content');
};

module.exports = Backbone.View.extend({

  className: 'social',

  initialize: function() {
    let url = 'http://koreanhiphop.webulla.ru';

    this.$container = $(template({
      url: getOpenGraphValue('url'),
      title: getOpenGraphValue('title'),
      image: getOpenGraphValue('image'),
      description: getOpenGraphValue('description'),
      content: getOpenGraphValue('content')
    }));
  },

  render: function() {
    this.$container.appendTo(this.$el);
  }
});
