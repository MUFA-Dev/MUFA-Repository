'use strict';


/**
 * Unfollow a user
 *
 * user_id Integer 
 * following_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idFollowingFollowing_idDELETE = function(user_id,following_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Follow a user
 *
 * user_id Integer 
 * following_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idFollowingFollowing_idPUT = function(user_id,following_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Interact with a following user's post comment
 *
 * user_id Integer 
 * following_id Integer 
 * post_id Integer 
 * comment_id Integer 
 * like Boolean  (optional)
 * reply String  (optional)
 * report Boolean  (optional)
 * no response value expected for this operation
 **/
exports.userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT = function(user_id,following_id,post_id,comment_id,like,reply,report) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Interact with a following user's post
 *
 * user_id Integer 
 * following_id Integer 
 * post_id Integer 
 * like Boolean  (optional)
 * comment String  (optional)
 * report Boolean  (optional)
 * no response value expected for this operation
 **/
exports.userUser_idFollowingFollowing_idPostPost_idPUT = function(user_id,following_id,post_id,like,comment,report) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add a following user's post's song to Spotify
 *
 * user_id Integer 
 * following_id Integer 
 * post_id Integer 
 * song_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function(user_id,following_id,post_id,song_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get notifications for a user's comments
 *
 * user_id Integer 
 * returns List
 **/
exports.userUser_idNotificationsCommentsGET = function(user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "read" : true,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "id" : 0,
  "type" : "type",
  "message" : "message"
}, {
  "read" : true,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "id" : 0,
  "type" : "type",
  "message" : "message"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get notifications for a user's posts
 *
 * user_id Integer 
 * returns List
 **/
exports.userUser_idNotificationsPostsGET = function(user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "read" : true,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "id" : 0,
  "type" : "type",
  "message" : "message"
}, {
  "read" : true,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "id" : 0,
  "type" : "type",
  "message" : "message"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a post
 *
 * body Post 
 * song_lyrics String  (optional)
 * song_album_cover String  (optional)
 * song_canvas String  (optional)
 * user_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idPostPOST = function(body,song_lyrics,song_album_cover,song_canvas,user_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Customize a post
 *
 * body Post 
 * song_lyrics String  (optional)
 * song_album_cover String  (optional)
 * song_canvas String  (optional)
 * user_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idPostPUT = function(body,song_lyrics,song_album_cover,song_canvas,user_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a post
 *
 * user_id Integer 
 * post_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idPostPost_idDELETE = function(user_id,post_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Search for a song
 *
 * user_id Integer 
 * song_name String  (optional)
 * song_artist String  (optional)
 * song_genre String  (optional)
 * song_album String  (optional)
 * returns List
 **/
exports.userUser_idSongGET = function(user_id,song_name,song_artist,song_genre,song_album) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "artist" : "artist",
  "album" : "album",
  "genre" : "genre",
  "id" : 0,
  "title" : "title"
}, {
  "artist" : "artist",
  "album" : "album",
  "genre" : "genre",
  "id" : 0,
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Sync the app with Spotify
 *
 * body Spotify 
 * user_id Integer 
 * no response value expected for this operation
 **/
exports.userUser_idSpotifyPUT = function(body,user_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

