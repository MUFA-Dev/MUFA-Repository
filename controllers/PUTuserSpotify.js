'use strict';
var utils = require('../utils/writer.js');
var user = require('../service/PUTuserSpotifyService.js');

module.exports.userUser_idSpotifyPUT = async function userUser_idSpotifyPUT (req, res, next, body, user_id) {
    await user.userUser_idSpotifyPUT(body, user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };