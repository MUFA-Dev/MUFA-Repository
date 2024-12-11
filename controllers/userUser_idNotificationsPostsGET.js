'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idNotificationsPostsGET_Service');

module.exports.userUser_idNotificationsPostsGET = async function userUser_idNotificationsPostsGET (req, res, next, user_id) {
    await Default.userUser_idNotificationsPostsGET(user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };