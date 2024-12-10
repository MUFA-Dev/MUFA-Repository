'use strict';

var utils = require('../utils/writer.js');
var DefaultService = require('../service/DefaultService.js');

module.exports.userUser_idFollowingFollowing_idDELETE = function userUser_idFollowingFollowing_idDELETE(req, res, next, user_id, following_id) {
  DefaultService.userUser_idFollowingFollowing_idDELETE(user_id, following_id)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (err) {
      utils.writeJson(res, err, err.code || 500);
    });
};


module.exports.userUser_idSongGET = function userUser_idSongGET(req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
  DefaultService.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (err) {
      utils.writeJson(res, err, err.code || 500);
    });
};

module.exports.userUser_idNotificationsCommentsGET = function userUser_idNotificationsCommentsGET (req, res, next, user_id) {
  DefaultService.userUser_idNotificationsCommentsGET(user_id)
    .then(function (response) {
      utils.writeJson(res, response,response.code);
    })
    .catch(function (err) {
      utils.writeJson(res, response,err.code||500);
    });
};