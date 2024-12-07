'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT_Service');

module.exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = async function userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT (req, res, next, user_id, following_id, post_id, comment_id, like, reply, report) {
    await Default.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(user_id, following_id, post_id, comment_id, like, reply, report)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };