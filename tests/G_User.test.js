const http = require('node:http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
  // const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });

//   test('GET /user/{id}/song with correct inputs', async (t) => {
//     const queryParams = {
//       song_name: "Nyxterides",
//       song_artist: "LEX",
//       song_genre: "rap",
//       song_album: "G.T.K.",
//     };
//     const { body, statusCode } = await t.context.got.get('user/2/song', {
//         searchParams: queryParams,
//         throwHttpErrors: false,
//     });
//     t.is(statusCode,200);
//     t.is(body.songs[0].title, 'Nyxterides'); // Safely access songs[0]
//   });

// test("GET/user/{id}/song with invalid song search", async (t) => {
   
//     const { body, statusCode } = await t.context.got.get('user/2/song?song_name=Unknown&song_artist=LEX&song_genre=rap&song_album=G.T.K.', {
//         throwHttpErrors: false,
//     });
//     t.is(statusCode, 404);
//     t.is(body.message, "No songs found");
// });

// test("GET/user/{id}/song with invalid user_id search", async (t) => {
   
//   const { body, statusCode } = await t.context.got.get('user/999999999/song?song_name=Unknown&song_artist=LEX&song_genre=rap&song_album=G.T.K.', {
//       throwHttpErrors: false,
//   });
//   t.is(statusCode, 400);
//   t.is(body.message, "Invalid user_id");
// });

test("PUT /user/{id}/following/{id}/post/{id} - Like a post with valid inputs", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3', {
      searchParams: {
        like: 1,  // Like the post
        comment: "Loveit",  // Add comment
        report: 1,  // No report
      },
      throwHttpErrors: false,
  });

  t.is(statusCode, 200);
  t.is(body.message, "Interaction successful");
  t.is(body.post.interactions.likes, 6); // Should increment by 1
});


// test("PUT /user/{id}/following/{id}/post/{id} - Like a post with valid inputs", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,1, 100, 3, true, null, null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.is(parsedBody.post.interactions.likes, 6); // Should increment by 1
// });

// test("PUT /user/{id}/following/{id}/post/{id} - Like a post with like set to null", async (t) => {
//     const response = {
//       writeHead: (statusCode, headers) => {},
//       end: (body) => { response.body = body; },
//     };
  
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null, response, null, 1, 100, 3, null, null, null); // `like` is null
//     const parsedBody = JSON.parse(response.body);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.is(parsedBody.post.interactions.likes, 5); // Likes count remains unchanged
//   });

//   test("PUT /user/{id}/following/{id}/post/{id} - Like a post with like set to false", async (t) => {
//     const response = {
//       writeHead: (statusCode, headers) => {},
//       end: (body) => { response.body = body; },
//     };
  
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null, response, null, 1, 100, 3, false, null, null); // `like` is null
//     const parsedBody = JSON.parse(response.body);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.is(parsedBody.post.interactions.likes, 5); // Likes count remains unchanged
//   });

//   test("PUT /user/{id}/following/{id}/post/{id} - Like a post with like set to undefined", async (t) => {
//     const response = {
//       writeHead: (statusCode, headers) => {},
//       end: (body) => { response.body = body; },
//     };
  
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null, response, null, 1, 100, 3, undefined, null, null); // `like` is undefined
//     const parsedBody = JSON.parse(response.body);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.is(parsedBody.post.interactions.likes, 5); // Likes count remains unchanged
//   });
  
  

// test("PUT /user/{id}/following/{id}/post/{id} - Comment on a post with valid inputs", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,1, 100, 3, null, "Awesome post!", null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.true(parsedBody.post.interactions.comments.includes("Awesome post!"));
// });

// test("PUT /user/{id}/following/{id}/post/{id} - Report a post with valid inputs", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,2, 101, 4, null, null, true);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.statusCode, 200);
//     t.is(parsedBody.message, "Interaction successful");
//     t.is(parsedBody.post.interactions.reports, 2); // Should increment by 1
// });

// test("PUT /user/{id}/following/{id}/post/{id} - Invalid post", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,99, 999, 999, true, null, null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.message, "Post not found");
//     t.is(parsedBody.statusCode, 404);
// });

// test("PUT /user/{id}/following/{id}/post/{id} - Invalid userId", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,9999, 100, 3, true, null, null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.message, "Invalid user_id");
//     t.is(parsedBody.statusCode, 400);
// });

// test("PUT /user/{id}/following/{id}/post/{id} - Invalid followingId", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => { response.body = body; },
//     };
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,1, 9999999, 3, true, null, null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.message, "Invalid following_id");
//     t.is(parsedBody.statusCode, 400);
// });


// test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify successfully", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,1, 100, 3,1);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 200);
//         t.is(parsedBody.message, "Song has been added to Spotify");
//     });

//     test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify unsuccessfully", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,1, 100, 3,3);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 404);
//         t.is(parsedBody.message, "Song not found");
//     });

//     test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify unsuccessfully due to invalid user_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,99999999999, 100, 3,3);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 400);
//         t.is(parsedBody.message, "Invalid user_id");
//     });

//     test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify unsuccessfully due to invalid following_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,1, 9999999, 3,3);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 400);
//         t.is(parsedBody.message, "Invalid following_id");
//     });

//     test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify unsuccessfully due to missmatch in song_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,1,100, 3,9999999);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 404);
//         t.is(parsedBody.message, "Song not found");
//     });

//     test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify unsuccessfully due to missmatch in post_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,1,100, 9999999,1);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 404);
//         t.is(parsedBody.message, "Post not found");
//     });

//     test("DEL user/{id}/post/{id} - Delete a post successfully with correct user_Id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idPostPost_idDELETE(null,response,null,1,3);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 200);
//         t.is(parsedBody.message, "Post has been deleted successfully.");
//     });

//     test("DEL user/{id}/post/{id} - Delete a post unsuccessfully with incorrect user_Id, correct post_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idPostPost_idDELETE(null,response,null,999999,3);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 400);
//         t.is(parsedBody.message, "Invalid user_id.");
//     });
    
//     test("DEL user/{id}/post/{id} - Delete a post unsuccessfully with correct user_Id, incorrect post_id", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idPostPost_idDELETE(null,response,null,2,999);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 400);
//         t.is(parsedBody.message, "Invalid post_id."); 
//     });

//     test("DEL user/{id}/post/{id} - Delete a post unsuccessfully because user_id and post_id did not exist in the same post", async (t) => {
//         const response = {
//             writeHead: (statusCode, headers) => {},
//             end: (body) => { response.body = body; },
//         };
//         await userUser_idPostPost_idDELETE(null,response,null,1,4);
//         const parsedBody = JSON.parse(response.body);
//         console.log(parsedBody);
//         t.is(parsedBody.statusCode, 400);
//         t.is(parsedBody.message, "User does not own the post."); 
//     });