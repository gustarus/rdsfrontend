'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Button = require('@core/components/Button');

let SoundCloudAudioSource = require('@core/soundcloud/SoundCloudAudioSource');
let SoundCloudLoader = require('@core/soundcloud/SoundCloudLoader');

module.exports = Button.extend({

  className: 'button beat',

  // equalizer configuration
  columnsFrequencies: [0, 20, 40, 60, 80],

  initialize: function() {
    Button.prototype.initialize.apply(this, arguments);

    // configure audio
    this.audio.volume = 0.7;
    this.audio.loop = true;

    // initialize components
    this.source = new SoundCloudAudioSource(this.audio);
    this.loader = new SoundCloudLoader(this.audio);

    // create equalizer
    this.$equalizer = $('<div class="beat__equalizer"/>');

    // create play icon
    this.$play = $('<div class="beat__play"/>');

    // create equalizer columns
    for (let i = 0; i < this.columnsFrequencies.length; i++) {
      let $column = $('<div class="beat__equalizer-value"/>').appendTo(this.$equalizer);
      this.bindEqualizerColumn(i, $column.get(0));
    }

    // listen events
    this.on('play', this.animationStart);
    this.on('pause', this.animationStop);
  },

  render: function() {
    Button.prototype.render.apply(this, arguments);
    this.$el.append(this.$equalizer);
    this.$el.append(this.$play);
  },

  play: function(silent) {
    let that = this;

    // stop all beats
    that.model.collection.each(function(model) {
      model.view.pause(true);
    });

    // start current beat
    if (!that._processed) {
      that._processed = true;
      that.loader.loadStream(that.model.get('url'), function() {
        // launch stream
        that.source.playStream(that.loader.streamUrl());

        // begin animation
        that.animationStart();

        // trigger event
        !silent && that.trigger('play');
      }, function() {
      });
    } else {
      // play sound
      that.audio.play();

      // begin animation
      that.animationStart();

      // trigger event
      !silent && that.trigger('play');
    }
  },

  pause: function(silent) {
    // pause sound
    this.audio.pause();

    // stop animation
    this.animationStop();

    // trigger event
    !silent && this.trigger('pause');
  },

  animationStart: function() {
    let that = this;

    that.$el.addClass('beat_playing');
    that._interval = setInterval(function() {
      // transform button with frequency channel value
      that.transformEqualizer(that.source.streamData);
    }, 50);
  },

  animationStop: function() {
    this.$el.removeClass('beat_playing');
    clearInterval(this._interval);
    for (let i = 0; i < this.columnsFrequencies.length; i++) {
      this.getEqualizerColumn(i).style.height = 0;
    }
  },

  transformEqualizer: function(frequencies) {
    for (let i = 0; i < this.columnsFrequencies.length; i++) {
      this.getEqualizerColumn(i).style.height = `${Math.floor(frequencies[this.columnsFrequencies[i]] * 0.10)}px`;
    }
  },

  bindEqualizerColumn: function(index, column) {
    !this._columnsCache && (this._columnsCache = []);
    this._columnsCache[index] = column;
  },

  getEqualizerColumn: function(index) {
    return this._columnsCache[index];
  }
});
