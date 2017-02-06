'use strict';

let _ = require('underscore');
let $ = require('jquery');
let Backbone = require('backbone');
let Beat = require('@core/components/Beat');
let BeatModel = require('@core/models/BeatModel');
let BeatCollection = require('@core/collections/BeatCollection');

module.exports = Backbone.View.extend({

  className: 'beats',

  data: [
    {author: 'Hip Hop Beats For You', title: 'Mujahibeats', url: 'https://soundcloud.com/freehiphopbeatsforyou/the-passion-hifi-mujahibeats'},
    {author: 'Hip Hop Beats For You', title: 'Friday', url: 'https://soundcloud.com/freehiphopbeatsforyou/free-the-passion-hifi-friday-boombap-old-school-beat'},
    {author: 'Hip Hop Beats For You', title: 'Hit Em Hard', url: 'https://soundcloud.com/freehiphopbeatsforyou/free-the-passion-hifi-hit-em-hard-rap-beat-instrumental'},
    {author: 'Hip Hop Beats For You', title: 'While The World Sleeps', url: 'https://soundcloud.com/freehiphopbeatsforyou/free-the-passion-hifi-while-the-world-sleeps-chilled-beat-instrumental'},
    {author: 'Hip Hop Beats For You', title: 'The Two Twenty Seven', url: 'https://soundcloud.com/freehiphopbeatsforyou/free-the-passion-hifi-the-two-twenty-seven-boombap-beat-instrumental'},
    {author: 'Hip Hop Beats For You', title: 'The Seige', url: 'https://soundcloud.com/freehiphopbeatsforyou/free-the-passion-hifi-the-seige-boom-bap-beat-instrumental'}
  ],

  initialize: function() {
    this.collection = new BeatCollection(this.data);
    this.collection.each(function(model) {
      model.view = new Beat({model: model});
    });
  },

  render: function() {
    let that = this;
    that.collection.each(function(model) {
      model.view.render();
      that.$el.append(model.view.$el);
    });
  }
});
