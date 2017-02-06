'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');
let template = require('@core/templates/header.jade');

module.exports = Backbone.View.extend({

  tagName: 'header',
  className: 'header',

  defaults: {
    title: 'Радио «Hip-Hop Голос Кореи»',
    description: 'Замиксуй эфир радио «Голос Кореи» и избранные Hip-Hop биты'
  },

  messages: [
    'Замиксуй эфир радио «Голос Кореи» и избранные Hip-Hop биты',
    'Биты: <a href="https://soundcloud.com/freehiphopbeatsforyou" target="_blank">Free Hip Hop Beats</a>',
    'Видео на фоне: <a href="https://www.youtube.com/watch?v=JXRN_LkCa_o" target="_blank">Chris Brown - Loyal</a>',
    'Запись используемого эфира: <a href="https://golos-korei.podfm.ru/northk/277/" target="_blank">Радио «Голос Кореи»</a>'
  ],

  render: function(data) {
    this.$el.html(template(_.extend(this.defaults, data)));
  },

  animationStart: function() {
    let that = this;
    if (!this._interval) {
      let index = 0;
      this._interval = setInterval(function() {
        index = index === that.messages.length - 1 ? 0 : index + 1;
        that.render({description: that.messages[index]});
      }, 5000);
    }
  },

  animationStop: function() {
    clearInterval(this._interval);
    this.render({description: this.messages[0]});
  }
});
