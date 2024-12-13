'use strict';

const { post } = require("..");

const mockSongs = [
  {
    title: "Nyxterides",
    artist: "LEX",
    genre: "rap",
    album: "G.T.K.",
  },
  {
    title: "Dreaming Big",
    artist: "John Doe",
    genre: "pop",
    album: "Dreamers",
  },
];

const user_ids = [1, 7, 10, 30, 32, 40];
const following_ids = [3, 8, 15, 13, 39, 101, 117];
const post_ids = [12, 23, 54, 98, 123, 203, 205];
const comment_ids=[11, 24, 55, 99, 124, 204, 206];

exports.userUser_idSongGET = function (song_name, song_artist, song_genre, song_album,user_id) {
  return new Promise(function(resolve, reject){
    // Validate user_id range
    console.log(user_id, song_name, song_artist, song_genre, song_album);
    
    if (!user_ids.includes(user_id)) {
      return reject({
        error: "User not found.",
        code: 404
      });
    }

    // Filter songs based on input parameters
    const matchedSongs = mockSongs.filter((song) => {
      return (
        (!song_name || song.title.toLowerCase() === song_name.toLowerCase()) &&
        (!song_artist || song.artist.toLowerCase() === song_artist.toLowerCase()) &&
        (!song_genre || song.genre.toLowerCase() === song_genre.toLowerCase()) &&
        (!song_album || song.album.toLowerCase() === song_album.toLowerCase())
      );
    });
    console.log(matchedSongs.length === 0);
    if (matchedSongs.length === 0) {
      return reject({
        code: 404,
        error: "No songs found.",
      });
    }
    resolve({
      code: 200,
      message: "Song found.",
      body: matchedSongs,
    });
  });
};

exports.userUser_idFollowingFollowing_idPostPost_idPUT = function (like, comment, report, user_id, following_id, post_id) {
  return new Promise(function (resolve, reject) {
    console.log("user_id:", user_id, "following_id:", following_id, "post_id:", post_id, "like:", like, "comment:", comment, "report:", report);
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

    // Validate inputs
    if (!user_ids.includes(user_id)) {
      return reject({
        error: "User Not Found.",
        code: 404
      });
    }
    // Find the post record matching the user_id, following_id, and post_id
    let postRecord = posts['application/json'].find(
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
