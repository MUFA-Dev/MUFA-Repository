'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idFollowingFollowing_idPUT_Service');

module.exports.userUser_idFollowingFollowing_idPUT = async function userUser_idFollowingFollowing_idPUT (req, res, next, user_id, following_id) {
    await Default.userUser_idFollowingFollowing_idPUT(user_id, following_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };