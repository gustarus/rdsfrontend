'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Button = require('@core/components/Button');

let track = require('@core/audio/man.mp3');

module.exports = Button.extend({

  className: 'button man',

  initialize: function() {
    Button.prototype.initialize.apply(this, arguments);

    // configure audio
    this.audio.volume = 0.6;

    // bind audio source
    this.$audio.append(`<source src="${track}" type="audio/ogg"/>`);

    // initialize content icon
    this.$icon = $('<svg class="speaker__icon" viewBox="0 0 16 22"><use xlink:href="#icon-man"></use></svg>');
  },

  render: function() {
    Button.prototype.render.apply(this, arguments);

    // bind icon
    this.$el.append(this.$icon);
  }
});
