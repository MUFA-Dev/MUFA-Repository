'use strict';
const { mockPosts } = require('./MockPosts.js');
const { mockSongs } = require('./MockSongs.js');

exports.userUser_idSongGET = function (user_id, song_name, song_artist, song_genre, song_album) {
  return new Promise((resolve) => {
    // Validate user_id range
    if (user_id <= 0 || user_id >= 1000) {
      return resolve({
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

    // Respond with matched songs or an error
    if (matchedSongs.length > 0) {
      resolve({
        statusCode: 200,
        body: matchedSongs,
      });
    } else {
      resolve({
        statusCode: 404,
        message: "No songs found",
      });
    }
  });
};

  exports.userUser_idFollowingFollowing_idPostPost_idPUT = function(user_id, following_id, post_id, like, comment, report) {
    return new Promise(function(resolve, reject) {
        // Find the post by user_id, following_id, and post_id
        const post = mockPosts.find(p => p.postId === post_id && p.userId === user_id && p.followingId === following_id);

        // If post is found
        if (post) {
            // Handle likes: only increment if like is true
            if (like !== null && like !== undefined) {
                post.interactions.likes += like ? 1 : 0;
            }

            // Handle comments: only add if comment is provided
            if (comment) {
                post.interactions.comments.push(comment);
            }

            // Handle reports: increment reports if report is true
            if (report) {
                post.interactions.reports += 1;
            }

            // Return successful response with updated post
            resolve({
                statusCode: 200,
                body: JSON.stringify({
                    message: "Interaction successful",
                    post: post
                })
            });
        } else {
            // If post/user/following doesn't match
            resolve({
                statusCode: 404,
                body: JSON.stringify({ message: "Post not found." })
            });
        }
    });
};