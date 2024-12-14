'use strict';

exports.userUser_idFollowingFollowing_idDELETE = function(user_id, following_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [];
    // Έλεγχος αν το user_id είναι ακέραιος και εντός επιτρεπτού εύρους
    if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({
        statusCode: 400,
        message: 'Invalid user_id. It must be an integer between 1 and 120.',
      });
    }

    // Έλεγχος αν το following_id είναι ακέραιος και εντός επιτρεπτού εύρους
    if (!Number.isInteger(following_id) || following_id < 1 || following_id > 120) {
      return reject({
        statusCode: 400,
        message: 'Invalid following_id. It must be an integer between 1 and 120.',
      });
    }

    // Υποθετική επιτυχής απόκριση
    resolve({
      statusCode: 201,
      message:{
        user_id,
        following_id
        },
    });
  });
};
