'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');

module.exports = Backbone.View.extend({

  // set dom tag name
  tagName: 'a',

  // set dom class name
  className: 'button',

  // set dom default attributes
  attributes: {
    href: '#'
  },

  // listen dom events
  events: {
    click: 'onClick'
  },

  initialize: function(options) {
    // generate shadow audio class name based on view class name
    let className = this.className.split(' ').join('__audio ') + '__audio';

    // create audio dom node
    this.$audio = $(`<audio class="${className}"></audio>`);
    this.audio = this.$audio.get(0);

    // listen guide events
    this.on('guide:focus', this.onGuideFocus);
    this.on('guide:follow', this.onGuideFollow);
  },

  render: function() {
    this.$el.append(this.$audio);
  },

  play: function(silent) {
    this.audio.play();
    !silent && this.trigger('play');
  },

  pause: function(silent) {
    this.audio.pause();
    !silent && this.trigger('pause');
  },

  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger('guide:follow');
    this.audio.paused ? this.play() : this.pause();
  },

  onGuideFocus: function() {
    this.audio.paused && this.$el.addClass('button_guide');
  },

  onGuideFollow: function() {
    this.$el.removeClass('button_guide');
  }
});
