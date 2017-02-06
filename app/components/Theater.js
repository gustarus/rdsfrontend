'use strict';

let _ = require('underscore');
let Backbone = require('backbone');
let Video = require('@core/components/Video');
let Background = require('@core/components/Background');
let Beats = require('@core/components/Beats');
let Header = require('@core/components/Header');
let Controls = require('@core/components/Controls');
let Social = require('@core/components/Social');
let Webulla = require('@core/components/Webulla');

module.exports = Backbone.View.extend({

  components: {
    video: Video,
    background: Background,
    beats: Beats,
    header: Header,
    controls: Controls,
    social: Social,
    webulla: Webulla
  },

  initialize: function () {
    let that = this;
    that.walk(function (model, name) {
      that[name] = that.components[name] = new model();
    });

    that.beats.collection.each(function (model) {
      model.view.on('play', function () {
        that.trigger('play', model);
      });

      model.view.on('pause', function () {
        that.trigger('pause', model);
      });
    });

    that.on('play', function (beat) {
      that.video.play();
      that.header.render({title: `Голос Кореи vs. ${beat.get('author')}: ${beat.get('title')}`});
      that.header.animationStart();
    });

    that.on('pause', function (beat) {
      that.video.pause();
    });

    // initialize application guide scheme
    if (that.beats.collection.length) {
      setTimeout(function () {
        // cache beat view
        let view = that.beats.collection.at(0).view;

        // listen guide flow event on the beat
        view.once('guide:follow', function() {
          setTimeout(function() {
            that.controls.speaker.trigger('guide:focus')
          }, 2500);
        });

        // trigger guide focus event
        view.trigger('guide:focus');
      }, 3500);
    }
  },

  render: function () {
    let that = this;
    that.walk(function (component) {
      component.render();
      that.$el.append(component.$el);
    });
  },

  walk: function (handler) {
    _.each(this.components, _.bind(handler, this));
  }
});
