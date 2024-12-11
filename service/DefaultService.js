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

const posts = [
  {
    userId: 1,
    followingId: 100,
    postId: 3,
    likes: 5,
    comments: ["Great post!", "Interesting thoughts."],
    reports: 0,

  },
  {
    userId: 2,
    followingId: 101,
    postId: 4,
    likes: 10,
    comments: [],
    reports: 1,
  },
];

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

exports.userUser_idFollowingFollowing_idPostPost_idPUT = function (user_id, following_id, post_id, like, comment, report) {
  console.log("Function is called");
  return new Promise(function (resolve, reject) {
    console.log(user_id, following_id, post_id, like, comment, report);
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

    // Find the post that matches the user_id, following_id, and post_id
    const post = posts.find(
      (p) =>
        p.userId === user_id &&
        p.followingId === following_id &&
        p.postId === post_id
    );

    if (post) {
      // Handle likes: only increment if like is true
      if (like !== null && like !== undefined) {
        post.likes += like ? 1 : 0;
      }

      // Handle comments: only add if a comment is provided
      if (comment) {
        post.comments.push(comment);
      }

      // Handle reports: increment reports if report is true
      if (report !== null && report !== undefined) {
        post.reports += report ? 1 : 0;
      }

      // Return successful response with the updated post
      resolve({
        code: 200,
        message: "Interaction successful",
        post,
      });
    } else {
      // If no matching post is found
      reject({
        code: 404,
        message: "Post not found",
      });
    }
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
