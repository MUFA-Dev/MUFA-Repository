'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idSongGET_Service');

module.exports.userUser_idSongGET = async function userUser_idSongGET (req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
    await Default.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };