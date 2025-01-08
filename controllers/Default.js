'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/Default_Service.js');

module.exports.userUser_idNotificationsPostsGET = function userUser_idNotificationsPostsGET (_, res, __, user_id) {
     Default.userUser_idNotificationsPostsGET(user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };
  //GET user/{id}/song
module.exports.userUser_idSongGET = function userUser_idSongGET (_, res, __, song_name, song_artist, song_genre, song_album, user_id) {
    Default.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };

module.exports.userUser_idNotificationsCommentsGET = function userUser_idNotificationsCommentsGET (_, res, __, user_id) {
    Default.userUser_idNotificationsCommentsGET(user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };

module.exports.userUser_idPostPUT = function userUser_idPostPUT (_, res, __, body, song_lyrics, song_album_cover, song_canvas, user_id) {
    Default.userUser_idPostPUT(body, song_lyrics, song_album_cover, song_canvas, user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };

module.exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = function userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT (_, res, __, user_id, following_id, post_id, comment_id, like, reply, report) {
    Default.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(user_id, following_id, post_id, comment_id, like, reply, report)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };

module.exports.userUser_idFollowingFollowing_idPUT = function userUser_idFollowingFollowing_idPUT (_, res, __, user_id, following_id) {
    Default.userUser_idFollowingFollowing_idPUT(user_id, following_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.code);
      });
  };

  module.exports.userUser_idFollowingFollowing_idDELETE = function userUser_idFollowingFollowing_idDELETE(_, res, __, user_id, following_id) {
    Default.userUser_idFollowingFollowing_idDELETE(user_id, following_id)
      .then(function (response) {
        utils.writeJson(res, response, response.code);
      })
      .catch(function (err) {
        utils.writeJson(res, err, err.code);
      });
  };
  
  
  module.exports.userUser_idPostPOST = function userUser_idPostPOST(_, res, __, body, song_lyrics, song_album_cover, song_canvas, user_id) {
    Default.userUser_idPostPOST(body, song_lyrics, song_album_cover, song_canvas, user_id)
      .then(function (response) {
        utils.writeJson(res, response, 201); 
      })
      .catch(function (err) {
        utils.writeJson(res, { message: err.message }, err.code );
      });
  };
  
  module.exports.userUser_idSpotifyPUT = function userUser_idSpotifyPUT (_, res, __, body, user_id) {
   
    Default.userUser_idSpotifyPUT(body, user_id)
      .then(function (response) {
        utils.writeJson(res, response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res, { message: err.message }, err.code);
      });
  };
  
  //PUT user/{user_id}/following/{following_id}/post/{post_id}/song/{song_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT (_, res, __, user_id, following_id, post_id, song_id) {
     Default.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(user_id, following_id, post_id, song_id)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };
  //PUT user/{user_id}/following/{following_id}/post/{post_id}
  module.exports.userUser_idFollowingFollowing_idPostPost_idPUT = function userUser_idFollowingFollowing_idPostPost_idPUT (_, res, __, user_id, following_id, post_id, like, comment, report) {
    Default.userUser_idFollowingFollowing_idPostPost_idPUT(user_id, following_id, post_id, like, comment, report)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };
  //DEL user/{id}/post/{id}
  module.exports.userUser_idPostPost_idDELETE = function userUser_idPostPost_idDELETE (_, res, __, user_id, post_id) {
     Default.userUser_idPostPost_idDELETE(user_id, post_id)
      .then(function (response) {
        utils.writeJson(res,response,response.code);
      })
      .catch(function (err) {
        utils.writeJson(res,err,err.code);
      });
  };