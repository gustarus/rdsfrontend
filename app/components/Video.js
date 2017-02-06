'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');

module.exports = Backbone.View.extend({

  className: 'video',

  // youtube video element
  player: null,

  // youtube video options
  key: 'JXRN_LkCa_o',
  quality: '144',
  ratio: 16 / 9,

  initialize: function() {
    this.$container = $('<div class="video__container"></div>');
  },

  render: function() {
    let that = this;

    // append container
    that.$container.appendTo(that.$el);

    // fetch youtube api
    $.getScript('https://www.youtube.com/iframe_api');

    // initialize player when api was loaded
    window.onYouTubeIframeAPIReady = function() {
      that.player = new window.YT.Player(that.$container.get(0), {
        videoId: that.key,
        width: $(document).width(),
        height: $(document).width() * that.ratio,
        playerVars: {
          autoplay: 0,
          autohide: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          showinfo: 0,
          loop: 1
        },
        events: {
          onReady: function(event) {
            that.$container = $(event.f);
            that.onPlayerReady(event);
          },
          onStateChange: function(event) {
            that.onPlayerStateChange(event);
          }
        }
      });
    };
  },

  play: function() {
    this.player.playVideo();
    this.trigger('play');
  },

  pause: function() {
    this.player.pauseVideo();
    this.trigger('pause');
  },

  refreshPositions: function() {
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();

    // when screen aspect ratio differs from video, video must center and underlay one dimension
    if (windowWidth / this.ratio < windowHeight) { // if new video height < window height (gap underneath)
      // calculate new player width
      let playerWidth = Math.ceil(windowHeight * this.ratio);

      // change player style
      this.$el.css({
        width: playerWidth,
        height: windowHeight,
        left: (windowWidth - playerWidth) / 2,
        top: 0
      });
    } else { // new video width < window width (gap to right)
      // calculate new player height
      let playerHeight = Math.ceil(windowWidth / this.ratio);

      // change player style
      this.$el.css({
        width: windowWidth,
        height: playerHeight,
        left: 0,
        top: (windowHeight - playerHeight) / 2
      });
    }
  },

  onPlayerReady: function(event) {
    // disable video sound
    this.player.setVolume(0);

    // set video quality
    event.target.setPlaybackQuality(this.quality);

    // listen window resize event
    this.refreshPositions();
    $(window).resize(_.bind(this.refreshPositions, this));
  },

  onPlayerStateChange: function(event) {
    switch (event.data) {
      case YT.PlayerState.BUFFERING:
        break;
      case YT.PlayerState.PLAYING:
        if (!this._done) {
          // set video quality
          event.target.setPlaybackQuality(this.quality);


          setTimeout(this.player.stopVideo, 6000);
          this._done = true;
        }
        break;
      case YT.PlayerState.ENDED:
        this.player.playVideo();
        break;
    }
  }
});
