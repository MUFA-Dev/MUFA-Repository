'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService.js');

  //GET user/{id}/song
  module.exports.userUser_idSongGET = function userUser_idSongGET (req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
    Default.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };
  
  //PUT user/{user_id}/following/{following_id}/post/{post_id}/song/{song_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT (req, res, next, user_id, following_id, post_id, song_id) {
     Default.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(user_id, following_id, post_id, song_id)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };
  //PUT user/{user_id}/following/{following_id}/post/{post_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idPUT = function userUser_idFollowingFollowing_idPostPost_idPUT (req, res, next, user_id, following_id, post_id, like, comment, report) {
    Default.userUser_idFollowingFollowing_idPostPost_idPUT(user_id, following_id, post_id, like, comment, report)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };
  //DEL user/{id}/post/{id}
  module.exports.userUser_idPostPost_idDELETE = function userUser_idPostPost_idDELETE (req, res, next, user_id, post_id) {
     Default.userUser_idPostPost_idDELETE(user_id, post_id)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };