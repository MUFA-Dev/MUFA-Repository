'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/userUser_idNotificationsCommentsGET_Service');

module.exports.userUser_idNotificationsCommentsGET = async function userUser_idNotificationsCommentsGET (req, res, next, user_id) {
    await Default.userUser_idNotificationsCommentsGET(user_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };