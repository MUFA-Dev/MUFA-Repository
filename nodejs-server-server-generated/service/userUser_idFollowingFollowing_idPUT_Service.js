'use strict'

exports.userUser_idFollowingFollowing_idPUT = function(user_id,following_id) {
    return new Promise(function(resolve, reject) {
      var examples={}; 
      examples['application/json'] = [
        {
            "user_id":1,
            "following_id":10,
            "follow": false,
            "message": ""
        },
        {
            "user_id":2,
            "following_id":11,
            "follow": true,
            "message": ""
        }
      ];
      // Validation for inputs
      if (!user_id || typeof user_id !== "number" || user_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing user_id" },
          statusCode: 400 // Bad Request
        });
      }
      if (user_id < 1 || user_id > 2) {
        reject({
          body: { error: "User Not Found" },
          statusCode: 404 // Not Found
        });
      }
      if (!following_id || typeof following_id !== "number" || following_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing following_id" },
          statusCode: 400 // Bad Request
        });
      }
      if (following_id < 10 || following_id > 11) {
        reject({
          body: { error: "following Not Found" },
          statusCode: 404 // Not Found
        });
      }
      let result = null;
      examples['application/json'].forEach(t => {
        if (
            t.user_id === user_id &&
            t.following_id === following_id 
        ) {
            if (t.follow !== true) {
               t.follow = true; 
               t.message = "You successfully followed a user";
            }
            else{
               t.message = "You already follow this user";
            }
            result = t.message; // Assign the matching record to result
        }
      });
      resolve({
          body: result, // Return the updated record
          statusCode: 200 // Success
        });
   });
}