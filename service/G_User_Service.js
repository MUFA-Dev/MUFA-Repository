'use strict';
exports.userUser_idSongGET = function (user_id, song_name, song_artist, song_genre, song_album) {
  return new Promise((resolve, reject) => {
    // Inline mock songs data
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
      // Add more songs as needed
    ];

    // Validate user_id range
    if (user_id <= 0 || user_id >= 1000) {
      return reject({
        statusCode: 400,
        message: "Invalid user_id",
      });
    }

    // Filter songs based on input parameters
    const matchedSongs = mockSongs.filter((song) => {
      return (
        (!song_name || song.title === song_name) &&
        (!song_artist || song.artist === song_artist) &&
        (!song_genre || song.genre === song_genre) &&
        (!song_album || song.album === song_album)
      );
    });

    // Respond with matched songs or error
    if (matchedSongs.length > 0) {
      console.log("Matched Songs Found:", matchedSongs);
      resolve({
        statusCode: 200,
        songs: matchedSongs,
      });
    } else {
      console.log("No Songs Found");
      reject({
        statusCode: 404,
        message: "No songs found",
      });
    }
  });
};

exports.userUser_idFollowingFollowing_idPostPost_idPUT = function (user_id, following_id, post_id, like, comment, report) {
  return new Promise(function (resolve, reject) {
    // Sample data: list of posts
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
      },
    ];

    // Validate inputs
    if (user_id <= 0 || user_id >= 1000) {
      return reject({
        statusCode: 400,
        message: "Invalid user_id",
      });
    }
    if (following_id <= 0 || following_id >= 1000) {
      return reject({
        statusCode: 400,
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
      console.log("here");
      // Handle likes: only increment if like is true
      if (like !== null && like !== undefined) {
        post.interactions.likes += like ? 1 : 0;
      }

      // Handle comments: only add if a comment is provided
      if (comment) {
        post.interactions.comments.push(comment);
      }

      // Handle reports: increment reports if report is true
      if (report) {
        post.interactions.reports += 1;
      }

      // Return successful response with the updated post
      resolve({
        statusCode: 200,
        message: "Interaction successful",
        post,
      });
    } else {
      // If no matching post is found
      reject({
        statusCode: 404,
        message: "Post not found",
      });
    }
  });
};


exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function (user_id, following_id, post_id, song_id) {
  return new Promise(function (resolve, reject) {
    // Sample data: list of posts
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

    // Validate inputs
    if (user_id <= 0 || user_id >= 1000) {
      return reject({
        statusCode: 400,
        message: "Invalid user_id",
      });
    }
    if (following_id <= 0 || following_id >= 1000) {
      return reject({
        statusCode: 400,
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
        statusCode: 404,
        message: "Post not found",
      });
    }

    // Check if the song_id matches the songId in the post
    if (post.songId !== song_id) {
      return reject({
        statusCode: 404,
        message: "Song not found",
      });
    }

    // If everything matches, resolve with success
    resolve({
      statusCode: 200,
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
        statusCode: 400,
        message: 'Invalid user_id.',
      });
    }

    // Check if post_id exists in posts
    const postExists = posts.some((post) => post.postId === post_id);
    if (!postExists) {
      return reject({
        statusCode: 400,
        message: 'Invalid post_id.',
      });
    }

    // Check if user_id and post_id belong to the same post
    const postIndex = posts.findIndex(
      (post) => post.userId === user_id && post.postId === post_id
    );
    if (postIndex === -1) {
      return reject({
        statusCode: 400,
        message: 'User does not own the post.',
      });
    }

    // Remove the post if all validations pass
    const deletedPost = posts.splice(postIndex, 1)[0];
    resolve({
      statusCode: 200,
      message: "Post has been deleted successfully.",
      deletedPost,
      remainingPosts: posts,
    });
  });
};
