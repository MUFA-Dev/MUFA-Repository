'use strict';

var utils = require('../utils/writer.js');
var user = require('../service/POSTpostService.js'); 

module.exports.userUser_idPostPOST = async function userUser_idPostPOST (req, res, next, body, song_lyrics, song_album_cover, song_canvas, user_id) {
  await user.userUser_idPostPOST(body, song_lyrics, song_album_cover, song_canvas, user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};