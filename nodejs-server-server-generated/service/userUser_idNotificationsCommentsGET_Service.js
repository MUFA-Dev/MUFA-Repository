'use strict';

exports.userUser_idNotificationsCommentsGET = function(user_id) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ 
        {
          "read": false,
          "created_at": "2024-12-01T12:00:00.000+00:00",
          "id": 1,
          "type": "like",
          "message": "Alex liked your comment",
        },
        {
          "read": true,
          "created_at": "2024-12-02T08:30:00.000+00:00",
          "id": 2,
          "type": "comment",
          "message": "Emma responded: 'It really is fire! 🔥' ",
        },
        {
          "read": true,
          "created_at": "2024-12-02T08:30:00.000+00:00",
          "id": 3,
          "type": "comment",
          "message": "George responded: 'I didn't like that song.'",
        },
        {
          "read": false,
          "created_at": "2024-12-05T09:00:00.000+00:00",
          "id": 4,
          "type": "share",
          "message": "Dani liked your post: 'All my fellas love Athens homie'",
        },
      ];

      // Check for missing or invalid user_id
     if (!user_id || typeof user_id !== "number" || user_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing user_id" },
          statusCode: 400 // Bad Request
        });
     }

      // If user_id is not found
     if (user_id <= 0 || user_id > 4) {
        reject({
          body: { error: "User Not Found" },
          statusCode: 404 // Not Found
        });
     }

      // Filter by user_id and return only the "message" field
      let result = examples['application/json'].filter(notification => notification.id === user_id)
                                               .map(notification => notification.message);

      resolve({
        body: result, // Return only the "message"
        statusCode: 200 // Success
      });
    });
};
  