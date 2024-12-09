'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/G_User_Service.js');
  //GET user/{id}/song
  module.exports.userUser_idSongGET = async function userUser_idSongGET (req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
    await User.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
  //PUT user/{user_id}/following/{following_id}/post/{post_id}/song/{song_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT =async function userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT (req, res, next, user_id, following_id, post_id, song_id) {
    await User.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(user_id, following_id, post_id, song_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
  //PUT user/{user_id}/following/{following_id}/post/{post_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idPUT =async function userUser_idFollowingFollowing_idPostPost_idPUT (req, res, next, user_id, following_id, post_id, like, comment, report) {
   await User.userUser_idFollowingFollowing_idPostPost_idPUT(user_id, following_id, post_id, like, comment, report)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
  //DEL user/{id}/post/{id}
  module.exports.userUser_idPostPost_idDELETE =async function userUser_idPostPost_idDELETE (req, res, next, user_id, post_id) {
    await User.userUser_idPostPost_idDELETE(user_id, post_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };