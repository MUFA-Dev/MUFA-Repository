'use strict';
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
    
    if (user_id <= 0 || user_id >= 1000) {
      return reject({
        code: 400,
        message: "Invalid user_id",
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
        message: "No songs found",
      });
    }
    resolve({
      code: 200,
      message: "Songs found",
      songs: matchedSongs,
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
        "message": ""
      },
      {
        "user_id": 7,
        "following_id": 8,
        "post_id": 10,
        "likes": 3,
        "comments": ["Nice post!"],
        "reports": 1,
        "message": ""
      }
    ];

    // Validate inputs
    if (!user_ids.includes(user_id)) {
      return reject({
        body: { error: "User Not Found." },
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
        body: { error: "Post not found." },
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

    // Update the success message
    postRecord.message = 'Post interaction successfull.';

    resolve({
      body: postRecord,
      code: 200
    });
  });
};


exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function (user_id, following_id, post_id, song_id) {
  return new Promise(function (resolve, reject) {

    // Validate inputs
    if (user_id <= 0 || user_id >= 1000) {
      return reject({
        code: 400,
        message: "Invalid user_id",
      });
    }
    if (following_id <= 0 || following_id >= 1000) {
      return reject({
        code: 400,
        message: "Invalid following_id",
      });
    }

    // Check if the post exists
    const post = posts.find(
      (p) =>
        p.userId === user_id &&
        p.followingId === following_id &&
        p.postId === post_id
    );

    if (!post) {
      // If no matching post is found
      return reject({
        code: 404,
        message: "Post not found",
      });
    }

    // Check if the song_id matches the songId in the post
    if (post.songId !== song_id) {
      return reject({
        code: 404,
        message: "Song not found",
      });
    }

    // If everything matches, resolve with success
    resolve({
      code: 200,
      message: "Song has been added to Spotify",
      post,
    });
  });
};


exports.userUser_idPostPost_idDELETE = function (user_id, post_id) {
  return new Promise((resolve, reject) => {
    const posts = [
      {
        userId: 1,
        followingId: 100,
        postId: 3,
        interactions: {
          likes: 5,
          comments: ["Great post!", "Interesting thoughts."],
          reports: 0,
        },
        songId: 1,
      },
      {
        userId: 2,
        followingId: 101,
        postId: 4,
        interactions: {
          likes: 10,
          comments: [],
          reports: 1,
        },
        songId: 2,
      },
    ];
    exports.posts = posts;

    // Check if user_id exists in posts
    const userExists = posts.some((post) => post.userId === user_id);
    if (!userExists) {
      return reject({
        code: 400,
        message: 'Invalid user_id.',
      });
    }

    // Check if post_id exists in posts
    const postExists = posts.some((post) => post.postId === post_id);
    if (!postExists) {
      return reject({
        code: 400,
        message: 'Invalid post_id.',
      });
    }

    // Check if user_id and post_id belong to the same post
    const postIndex = posts.findIndex(
      (post) => post.userId === user_id && post.postId === post_id
    );
    if (postIndex === -1) {
      return reject({
        code: 400,
        message: 'User does not own the post.',
      });
    }

    // Remove the post if all validations pass
    const deletedPost = posts.splice(postIndex, 1)[0];
    resolve({
      code: 200,
      message: "Post has been deleted successfully.",
      deletedPost,
      remainingPosts: posts,
    });
  });
};
