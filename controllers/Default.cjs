'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService.js');

module.exports.apiGET = function apiGET(req, res, next) {
  Default.apiGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idFollowingFollowing_idDELETE = function userUser_idFollowingFollowing_idDELETE (req, res, next, user_id, following_id) {
  Default.userUser_idFollowingFollowing_idDELETE(user_id, following_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idFollowingFollowing_idPUT = function userUser_idFollowingFollowing_idPUT (req, res, next, user_id, following_id) {
  Default.userUser_idFollowingFollowing_idPUT(user_id, following_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = function userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT (req, res, next, user_id, following_id, post_id, comment_id, like, reply, report) {
  Default.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(user_id, following_id, post_id, comment_id, like, reply, report)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idFollowingFollowing_idPostPost_idPUT = function userUser_idFollowingFollowing_idPostPost_idPUT (req, res, next, user_id, following_id, post_id, like, comment, report) {
  Default.userUser_idFollowingFollowing_idPostPost_idPUT(user_id, following_id, post_id, like, comment, report)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT (req, res, next, user_id, following_id, post_id, song_id) {
  Default.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(user_id, following_id, post_id, song_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idNotificationsCommentsGET = function userUser_idNotificationsCommentsGET (req, res, next, user_id) {
  Default.userUser_idNotificationsCommentsGET(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idNotificationsPostsGET = function userUser_idNotificationsPostsGET (req, res, next, user_id) {
  Default.userUser_idNotificationsPostsGET(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idPostPOST = function userUser_idPostPOST (req, res, next, body, song_lyrics, song_album_cover, song_canvas, user_id) {
  Default.userUser_idPostPOST(body, song_lyrics, song_album_cover, song_canvas, user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idPostPUT = function userUser_idPostPUT (req, res, next, body, song_lyrics, song_album_cover, song_canvas, user_id) {
  Default.userUser_idPostPUT(body, song_lyrics, song_album_cover, song_canvas, user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idPostPost_idDELETE = function userUser_idPostPost_idDELETE (req, res, next, user_id, post_id) {
  Default.userUser_idPostPost_idDELETE(user_id, post_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idSongGET = function userUser_idSongGET (req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
  Default.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUser_idSpotifyPUT = function userUser_idSpotifyPUT (req, res, next, body, user_id) {
  Default.userUser_idSpotifyPUT(body, user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
