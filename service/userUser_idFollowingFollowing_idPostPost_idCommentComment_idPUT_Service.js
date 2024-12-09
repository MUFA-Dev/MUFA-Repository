'use strict'

exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = function(user_id, following_id, post_id, comment_id, like, reply, report) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [
        {
            "user_id": 1,
            "following_id": 10,
            "post_id": 100,
            "comment_id": 1000,
            "like": false,
            "reply": "",
            "report": "",
            "message": "",  
        },{
            "user_id": 2,
            "following_id": 11,
            "post_id": 101,
            "comment_id": 1001,
            "like": false,
            "reply": "",
            "report": "",
            "message": "",  
        },{
            "user_id": 3,
            "following_id": 12,
            "post_id": 102,
            "comment_id": 1002,
            "like": false,
            "reply": "",
            "report": "",
            "message": "",  
        },
      ];
      
      // Validation for inputs
      if (!user_id || typeof user_id !== "number" || user_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing user_id" },
          statusCode: 400 // Bad Request
        });
      }
      if (user_id < 1 || user_id > 3) {
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
      if (following_id < 10 || following_id > 12) {
        reject({
          body: { error: "following Not Found" },
          statusCode: 404 // Not Found
        });
      }
      if (!post_id || typeof post_id !== "number" || post_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing post_id" },
          statusCode: 400 // Bad Request
        });
      }
      if (post_id != 100 && post_id != 101 && post_id != 102) {
        reject({
          body: { error: "Post Not Found" },
          statusCode: 404 // Not Found
        });
      }
      if (!comment_id || typeof comment_id !== "number" || comment_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing comment_id" },
          statusCode: 400 // Bad Request
        });
      }
      if (comment_id != 1000 && comment_id != 1001 && comment_id != 1002) {
        reject({
          body: { error: "Comment Not Found" },
          statusCode: 404 // Not Found
        });
      }

      // Matching and updating logic
      let result = null;
      examples['application/json'].forEach(t => {
        if (
            t.user_id === user_id &&
            t.following_id === following_id &&
            t.post_id === post_id &&
            t.comment_id === comment_id
        ) {
            if (t.like !== like) {
               t.like = like; 
               t.message = "You liked to a comment";
            }
            if (t.reply !== reply) {
               t.reply = reply;
               t.message = "You replied to a comment";
            }
            if (t.report !== report) {
               t.report = report;
               t.message = "You reported a comment";
            }
            result = t.message; // Assign the matching record to result
        }
      });

      // If no match found
      if (!result) {
        reject({
          body: { error: "No matching record found" },
          statusCode: 404, // Not Found
        });
      }

      // Resolve the updated record
      resolve({
        body: result, // Return the updated record
        statusCode: 200 // Success
      });
    });
};
