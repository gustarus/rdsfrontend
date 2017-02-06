'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Button = require('@core/components/Button');

let track = require('@core/audio/speaker.mp3');

module.exports = Button.extend({

  className: 'button speaker',

  initialize: function() {
    Button.prototype.initialize.apply(this, arguments);

    // configure audio
    this.audio.volume = 0.7;
    this.audio.loop = true;

    // bind audio source
    this.$audio.append(`<source src="${track}" type="audio/ogg"/>`);

    // initialize content icon
    this.$icon = $('<svg class="speaker__icon" viewBox="0 0 16 22"><use xlink:href=""></use></svg>');

    // set initial icon state
    this.setIconState(3);

    // listen events
    this.on('play', this.animationStart);
    this.on('pause', this.animationStop);
  },

  render: function() {
    Button.prototype.render.apply(this, arguments);

    // bind icon
    this.$el.append(this.$icon);
  },

  setIconState: function(number) {
    this._state = number;
    this.$icon.find('use').attr('xlink:href', `#icon-radio-${number}`);
  },

  getIconState: function() {
    return this._state;
  },

  animationStart: function() {
    let that = this;
    this._interval = setInterval(function() {
      that.setIconState(that.getIconState() == 3 ? 0 : that.getIconState() + 1);
    }, 400);
  },

  animationStop: function() {
    clearInterval(this._interval);
    this.setIconState(3);
  }
});
