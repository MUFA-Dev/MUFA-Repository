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


module.exports.userUser_idPostPOST = function userUser_idPostPOST(req, res, next, body, song_lyrics, song_album_cover, song_canvas, user_id) {
  // Καλούμε το Service με όλα τα απαραίτητα πεδία
  DefaultService.userUser_idPostPOST(body, song_lyrics, song_album_cover, song_canvas, user_id)
    .then(function (response) {
      utils.writeJson(res, response, 201); // HTTP 201: Created
    })
    .catch(function (err) {
      utils.writeJson(res, { message: err.message }, err.code || 500);
    });
};

// module.exports.userUser_idSongGET = function userUser_idSongGET(req, res, next, user_id, song_name, song_artist, song_genre, song_album) {
//   DefaultService.userUser_idSongGET(user_id, song_name, song_artist, song_genre, song_album)
//     .then(function (response) {
//       utils.writeJson(res, response, response.code);
//     })
//     .catch(function (err) {
//       utils.writeJson(res, err, err.code );
//     });
// };
