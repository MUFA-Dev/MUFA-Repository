'use strict';

var utils = require('../utils/writer.js');
var user = require('../service/DELETEuserfollowingService.js');

module.exports.userUser_idFollowingFollowing_idDELETE = async function userUser_idFollowingFollowing_idDELETE (req, res, next, user_id, following_id) {
  await user.userUser_idFollowingFollowing_idDELETE(user_id, following_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};