'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idPostPUT_Service');

module.exports.userUser_idPostPUT = async function userUser_idPostPUT (req, res, next, body, song_lyrics, song_album_cover, song_canvas, user_id) {
    await Default.userUser_idPostPUT(body, song_lyrics, song_album_cover, song_canvas, user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };