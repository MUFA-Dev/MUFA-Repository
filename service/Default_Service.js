'use strict';

// const { post } = require("..");

const posts_1 = []; 
const user_ids = [1, 7, 10, 30, 32, 40];
const following_ids = [3, 8, 15, 13, 39, 101, 117];
const post_ids = [12, 23, 54, 98, 123, 203, 205];
const comment_ids=[11, 24, 55, 99, 124, 204, 206];
const validUserIds = [1, 7, 10, 30, 32, 40]; // Υποθετικοί έγκυροι `user_id`
const spotifyData = {};
var posts = {};
    posts['application/json'] = [
      {
        "user_id": 1,
        "following_id": 100,
        "post_id":3 ,
        "likes": 0,
        "comments": [],
        "reports": 0,
        "message": "",
        "song_id": 1
      },
      {
        "user_id": 7,
        "following_id": 8,
        "post_id": 10,
        "likes": 3,
        "comments": ["Nice post!"],
        "reports": 1,
        "message": "",
        "song_id": 2
      }
    ];

function handleNotificationRequest(user_id, user_ids, examples) {
  return new Promise(function (resolve, reject) {
    // Check if user_id is valid
    if (!user_ids.includes(user_id)) {
      reject({
        body: { error: "User Not Found" },
        code: 404 // Not Found
      });
      return;
    }

    // Filter by user_id and return only the "message" field
    let result = examples['application/json']
      .filter(notification => notification.id === user_id)
      .map(notification => notification.message);

    if (result.length === 0) {
      reject({
        body: { error: "Notification Not Found" },
        code: 404 // Not Found
      });
      return;
    }

    resolve({
      body: result, // Return only the "message"
      code: 200 // Success
    });
  });
}

exports.userUser_idNotificationsPostsGET = function(user_id) {
  var examples = {};
  examples['application/json'] = [ 
    {
      "read": false,
      "created_at": "2024-12-01T12:00:00.000+00:00",
      "id": 1,
      "type": "like",
      "message": "Alex liked your post",
    },
    {
      "read": true,
      "created_at": "2024-12-02T08:30:00.000+00:00",
      "id": 7,
      "type": "comment",
      "message": "Emma commented: 'This song is fire! 🔥' ",
    },
    {
      "read": false,
      "created_at": "2024-12-05T09:00:00.000+00:00",
      "id": 10,
      "type": "share",
      "message": "Liam shared your post: 'Acoustic vibes for the weekend.'",
    },
    {
      "read": true,
      "created_at": "2024-12-02T08:30:00.000+00:00",
      "id": 32,
      "type": "comment",
      "message": "George commented: 'I didn't like that song.'",
    },
    {
      "read": false,
      "created_at": "2024-12-05T09:00:00.000+00:00",
      "id": 30,
      "type": "share",
      "message": "Dani shared your post: 'Shoutout to my brother. Love from Athens'",
    },
  ];

  return handleNotificationRequest(user_id, user_ids, examples);
};

exports.userUser_idNotificationsCommentsGET = function(user_id) {
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
      "id": 7,
      "type": "comment",
      "message": "Emma responded: 'It really is fire! 🔥' ",
    },
    {
      "read": true,
      "created_at": "2024-12-02T08:30:00.000+00:00",
      "id": 30,
      "type": "comment",
      "message": "George responded: 'I didn't like that song.'",
    },
    {
      "read": false,
      "created_at": "2024-12-05T09:00:00.000+00:00",
      "id": 32,
      "type": "share",
      "message": "Dani liked your post: 'All my fellas love Athens homie'",
    },
  ];

  return handleNotificationRequest(user_id, user_ids, examples);
};

exports.userUser_idSongGET = function (user_id, _, __, ___, ____) {
  return new Promise(function (resolve, reject) {
      const songs = [
          { id: 0, title: "title", artist: "artist", album: "album", genre: "genre" },
          { id: 1, title: "Nyxterides", artist: "LEX", album: "GTK", genre: "rap" }
      ];
      if (!user_ids.includes(user_id)) {
        return reject({
           code: 404,
           body:{ error:"Response code 404: User_id not found."},
        });
      }

      // Find the song matching the user_id (assuming id maps to user_id here for simplicity)
      const filteredsongs = songs.find(t => t.id === user_id);
      console.log(filteredsongs);
      // Check if the song exists for this user_id
      if (!filteredsongs) {
        return reject({
          code: 404,
          body: {error:"Response code 404: Song Not Found"},
        });
      }
      let response=filteredsongs;
      resolve(response);
  });
};

exports.userUser_idPostPUT = function(body, _, __, ___, user_id) {
  return new Promise(function(resolve, reject) {
    // Initialize posts array with sample posts
    let posts_song = [
      { "user_id": 1, "song_lyrics": "Egw tairiazw mesthn polh san nekros ston bytho", "song_album_cover": "", "song_canvas": "" },
      { "user_id": 7, "song_lyrics": "", "song_album_cover": "", "song_canvas": "" }
    ];

    // Check if user_id is valid
    if (!user_ids.includes(user_id)) {
      return reject({
        body: { error: "User Not Found" },
        code: 404 // User not found
      });
    }

    // Find the post corresponding to the user_id
    const post = posts_song.find(p => p.user_id === user_id);
    if (!post) {
      // Handle case where post for user_id does not exist
      return reject({
        body: { error: "Post Not Found" },
        code: 404 // Post not found
      });
    }

    let message = "";

    if (body.song_lyrics && body.song_lyrics !== "") {
      post.song_lyrics = body.song_lyrics;
      message = "You successfully added song lyrics.";
    } 
    if (body.song_album_cover && body.song_album_cover !== "") {
      post.song_album_cover = body.song_album_cover;
      message = "You successfully added song album cover.";
    } 
    if (body.song_canvas && body.song_canvas !== "") {
      post.song_canvas = body.song_canvas;
      message = "You successfully added song canvas.";
    }

    if (!message) {
      message = "No updates provided.";
    }
    resolve({
      body: { message, updatedEntry: post },
      code: 200 // Success
    });
  });
};

exports.userUser_idFollowingFollowing_idPUT = function(user_id,following_id) {
  return new Promise(function(resolve, reject) {
    var Record={}; 
    Record['application/json'] = [
      {
          "user_id":1,
          "following_id":3,
          "follow": false,
          "message": ""
      },
      {
          "user_id":7,
          "following_id":8,
          "follow": true,
          "message": ""
      }
    ];
    if (!user_ids.includes(user_id)) {
      reject({
        body: { error: "User Not Found" },
        code: 404 
      });
    }
    if (!following_ids.includes(following_id)) {
      reject({
        body: { error: "Following User Not Found" },
        code: 404 
      });
    }
    let followRecord = Record['application/json'].find(t => t.user_id === user_id && t.following_id === following_id);
    if (!followRecord) {
      // If no matching follow record, return a 404
      return reject({
        body: { error: "Follow relationship not found" },
        code: 404
      });
    }

    // Toggle the follow status and set the appropriate message
    if (followRecord.follow) {
      followRecord.follow = false;
      followRecord.message = "You unfollowed the user";
    } else {
      followRecord.follow = true;
      followRecord.message = "You successfully followed the user";
    }
    resolve({
      body: followRecord.message,
      code: 200
      });
 });
}

exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = function ( like, reply, report,user_id, following_id, post_id, comment_id) {
  console.log(like,reply,report);
  return new Promise(function (resolve, reject) {
    const examples = {};
    examples['application/json'] = [
      {
        user_id: 1,
        following_id: 3,
        post_id: 12,
        comment_id: 11,
        like: false,
        reply: "",
        report: "",
        message: "",
      },
      {
        user_id: 7,
        following_id: 8,
        post_id: 23,
        comment_id: 24,
        like: true,
        reply: "",
        report: "",
        message: "",
      },
      {
        user_id: 10,
        following_id: 15,
        post_id: 54,
        comment_id: 55,
        like: false,
        reply: "",
        report: "",
        message: "",
      },
    ];

    // Validate input parameters
    if (!user_ids.includes(user_id)) {
      return reject({
        body: { error: "User Not Found" },
        code: 404,
      });
    }

    if (!following_ids.includes(following_id)) {
      return reject({
        body: { error: "Following User Not Found" },
        code: 404,
      });
    }

    if (!post_ids.includes(post_id)) {
      return reject({
        body: { error: "Post Not Found" },
        code: 404,
      });
    }

    if (!comment_ids.includes(comment_id)) {
      return reject({
        body: { error: "Comment Not Found" },
        code: 404,
      });
    }

    // Find the matching record
    let commentRecord = examples['application/json'].find(
      (t) =>
        t.user_id === user_id &&
        t.following_id === following_id &&
        t.post_id === post_id &&
        t.comment_id === comment_id
    );

    if (!commentRecord) {
      return reject({
        body: { error: "Comment interaction not found" },
        code: 404,
      });
    }

    // Track state changes
    let stateChanged = false;

    // Handle like, reply, and report
    if (typeof like !== "undefined" && commentRecord.like !== like) {
      commentRecord.like = like;
      commentRecord.message = like ? "You liked the comment." : "You unliked the comment.";
      stateChanged = true;
    }

    if (reply && commentRecord.reply !== reply) {
      commentRecord.reply = reply;
      commentRecord.message = `You replied to the comment: ${reply}`;
      stateChanged = true;
    }

    if (report) {
      commentRecord.report = report;
      commentRecord.message = `You reported the user`;
      stateChanged = true;
    }

    // Default message when no state changes
    if (!stateChanged) {
      commentRecord.message = "Nothing happened.";
    }

    resolve({
      body: commentRecord.message, // Return the message directly
      code: 200,
    });
  });
};



exports.userUser_idFollowingFollowing_idDELETE = function (user_id, following_id) {
  return new Promise(function (resolve, reject) {
    // Step 1: Έλεγχος αν το user_id είναι μεταξύ 1 και 120
    if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be an integer between 1 and 120.",
      });
    }

    // Step 2: Έλεγχος αν υπάρχει το user_id
    if (!user_ids.includes(user_id)) {
      return reject({
        code: 400,
        message: "Response code 400 (Unauthorized): User_id not found.",
      });
    }

    // Step 3: Έλεγχος αν το following_id είναι μεταξύ 1 και 120
    if (!Number.isInteger(following_id) || following_id < 1 || following_id > 120) {
      return reject({
        code: 400,
        message: "Invalid following_id. It must be an integer between 1 and 120.",
      });
    }

    // Step 4: Έλεγχος αν υπάρχει το following_id
    if (!following_ids.includes(following_id)) {
      return reject({
        code: 400,
        message: "Following_id not found.",
      });
    }

    // Επιτυχής απόκριση
    resolve({
      code: 200,
      message: {
        user_id,
        following_id,
      },
    });
  });
};

///////////      POST user/{user_id}/post      ////////////////

exports.userUser_idPostPOST = function (body, song_lyrics, song_album_cover, song_canvas, user_id) {
  return new Promise(function (resolve, reject) {
    // Έλεγχος αν το user_id είναι έγκυρο
    if (!Number.isInteger(user_id) || user_id <= 0) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be a positive integer.",
      });
    }
    // Έλεγχος αν το user_id υπάρχει
    if (!validUserIds.includes(user_id)) {
      return reject({
        code: 400,
        message: "User not found.",
      });
    }
    
     // Δημιουργία του νέου post
   const newPost = {
      id: posts_1.length + 1, // Auto-increment ID
      user_id,
      content: body.content,
      song_lyrics,
      song_album_cover,
      song_canvas,
    };
    posts_1.push(newPost); // Αποθήκευση στη μνήμη
    resolve(newPost); // Επιστροφή της απάντησης
  });
};

///////////      PUT user/{user_id}/Spotify      ////////////////



exports.userUser_idSpotifyPUT = function (body, user_id) {
  return new Promise(function (resolve, reject) {
    if (!Number.isInteger(user_id) || user_id <= 0) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be a positive integer.",
      });
    }
    // Έλεγχος αν το user_id υπάρχει
    if (!validUserIds.includes(user_id)) {
      return reject({
        code: 400,
        message: "User not found.",
      });
    }

    // Ενημέρωση των δεδομένων Spotify για τον χρήστη
    spotifyData[user_id] = {
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresIn: body.expiresIn,
      scope: body.scope,
    };

    resolve({
      message: `Spotify data synced successfully for user_id: ${user_id}`,
    });
  });
};

exports.userUser_idFollowingFollowing_idPostPost_idPUT = function (like, comment, report, user_id, following_id, post_id) {
  return new Promise(function (resolve, reject) {
    console.log("user_id:", user_id, "following_id:", following_id, "post_id:", post_id, "like:", like, "comment:", comment, "report:", report);
    var posts_2 = {};
    posts_2['application/json'] = [
      {
        "user_id": 1,
        "following_id": 100,
        "post_id":3 ,
        "likes": 0,
        "comments": [],
        "reports": 0,
        "message": "",
        "song_id": 1
      },
      {
        "user_id": 7,
        "following_id": 8,
        "post_id": 10,
        "likes": 3,
        "comments": ["Nice post!"],
        "reports": 1,
        "message": "",
        "song_id": 2
      }
    ];

    // Validate inputs
    if (!user_ids.includes(user_id)) {
      return reject({
        error: "User Not Found.",
        code: 404
      });
    }
    // Find the post record matching the user_id, following_id, and post_id
    let postRecord = posts_2['application/json'].find(
      (t) => t.user_id === user_id && t.following_id === following_id && t.post_id === post_id
    );

    if (!postRecord) {
      // If no matching post record, return a 404
      return reject({
        error: "Post not found.",
        code: 404
      });
    }

    // Handle likes: only increment if like is true
    if (like) {
      postRecord.likes += like ? 1 : 0;
    }

    // Handle comments: only add if a comment is provided
    if (comment) {
      postRecord.comments.push(comment);
    }

    // Handle reports: increment reports if report is true
    if (report !== null && report !== undefined) {
      postRecord.reports += report ? 1 : 0;
    }

    resolve({
      body: postRecord,
      code: 200,
      message: 'Post interaction successfull.'
    });
  });
};


exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function (user_id, following_id, post_id, song_id) {
  return new Promise(function (resolve, reject) {
    console.log("user_id:", user_id, "following_id:", following_id, "post_id:", post_id, "song_id:", song_id);
    // Validate inputs
    if (!user_ids.includes(user_id)) {
      return reject({
        error: "User Not Found." ,
        code: 404
      });
    }
    // Check if the post exists
    let postRecord = posts['application/json'].find(
      (t) => t.user_id === user_id && t.following_id === following_id && t.post_id === post_id);
      
    if (!postRecord) {
       // If no matching post record, return a 404
      return reject({
        error: "Post not found." ,
        code: 404
       });
      }

    if(postRecord.song_id !== song_id) {
      return reject({
        error: "Song not found." ,
        code: 404
      });
    }
      // If everything matches, resolve with success
    resolve({
      body: postRecord.song_id,
      code: 200,
      message: "Song has been added to Spotify."
    });
  });
};


exports.userUser_idPostPost_idDELETE = function (user_id, post_id) {
  return new Promise((resolve, reject) => {
    // Sample posts array
    let posts = [
      {
        user_id: 1,
        following_id: 100,
        post_id: 3,
        likes: 0,
        comments: [],
        reports: 0,
        message: "",
        song_id: 1
      },
      {
        user_id: 7,
        following_id: 8,
        post_id: 10,
        likes: 3,
        comments: ["Nice post!"],
        reports: 1,
        message: "",
        song_id: 2
      }
    ];

    // Check if user_id exists in posts
    const userExists = posts.some((post) => post.user_id === user_id);
    if (!userExists) {
      return reject({
        code: 404,
        error: 'User not found.'
      });
    }

    // Check if post_id exists in posts
    const postExists = posts.some((post) => post.post_id === post_id);
    if (!postExists) {
      return reject({
        code: 404,
        error: 'Post not found.'
      });
    }

    // Check if user_id and post_id belong to the same post
    const postIndex = posts.findIndex(
      (post) => post.user_id === user_id && post.post_id === post_id
    );
    if (postIndex === -1) {
      return reject({
        code: 400,
        error: 'User does not own the post.'
      });
    }

    // Remove the post if all validations pass
    const deletedPost = posts.splice(postIndex, 1)[0];
    resolve({
      body: deletedPost,
      code: 200,
      message: "Post has been deleted successfully."
    });
  });
};