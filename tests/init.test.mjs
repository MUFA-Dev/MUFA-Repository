import http from 'node:http';
import test from 'ava';
import got from 'got';
import app from '../index.js'; 

test.before(async (t) => {
  t.context.server = http.createServer(app);
  await new Promise((resolve) => {
    const server = t.context.server.listen(() => {
      const { port } = server.address();
      t.context.got = got.extend({
        responseType: "json",
        prefixUrl: `http://localhost:${port}`,
      });
      resolve();
    });
  });
});

test.after.always((t) => {
  t.context.server.close();
});


test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 1", async (t) => {
    const response = await t.context.got("user/1/notifications/posts")
    t.is(response.statusCode, 200);
    console.log(response.statusCode,response.body);
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 2", async (t) => {
  const response = await t.context.got("user/1000/notifications/posts",{ throwHttpErrors: false })
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 3", async (t) => {
  const response = await t.context.got("user/40/notifications/posts",{ throwHttpErrors: false })
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("GET/user/{id}/song with correct inputs", async (t) => {
  const response= await t.context.got('user/1/song?song_name=Nyxterides', {throwHttpErrors: false});
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body);
});

test("GET/user/{id}/song with correct inputs 2", async (t) => {
  const response= await t.context.got('user/10000/song?song_name=Nyxterides',{ throwHttpErrors: false });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("GET/user/{id}/song with correct inputs 3", async (t) => {
  const response= await t.context.got('user/40/song?song_name=Nyxterides',{ throwHttpErrors: false });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("GET/user/{user_id}/notifications/comments returns correct response and status code for user 1", async (t) => {
  const response = await t.context.got('user/1/notifications/comments');
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body);
});

test("GET/user/{user_id}/notifications/comments returns correct response and status code for user 2", async (t) => {
  const response = await t.context.got('user/40/notifications/comments',{ throwHttpErrors: false });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("GET/user/{user_id}/notifications/comments returns correct response and status code for user 3", async (t) => {
  const response = await t.context.got('user/10000/notifications/comments',{ throwHttpErrors: false });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body);
});

test("PUT/user/{user_id}/post returns correct response and status code for user 1", async (t) => {
  const post ={
    song_lyrics:"Theoi mou katoikoune sto magiko mou kefali",
    song_album_cover:"",
    song_canvas:""
  }
  const response = await t.context.got.put('user/1/post',{
    json: post
  });
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/post returns correct response and status code for user 2", async (t) => {
  const post ={
    song_lyrics:"",
    song_album_cover:"img",
    song_canvas:""
  }
  const response = await t.context.got.put('user/1/post',{
    json: post
  });
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/post returns correct response and status code for user 3", async (t) => {
  const post ={
    song_lyrics:"",
    song_album_cover:"",
    song_canvas:"img"
  }
  const response = await t.context.got.put('user/1/post',{
    json: post
  });
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/post returns correct response and status code for user 3.5", async (t) => {
  const post ={
    song_lyrics:"",
    song_album_cover:"",
    song_canvas:""
  }
  const response = await t.context.got.put('user/1/post',{
    json: post
  });
  t.is(response.statusCode, 200);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/post returns correct response and status code for user 4", async (t) => {
  const post ={
    song_lyrics:"Theoi mou katoikoune sto magiko mou kefali",
    song_album_cover:"",
    song_canvas:""
  }
  const response = await t.context.got.put('user/10000/post',{
    throwHttpErrors: false,
    json: post
  });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/post returns correct response and status code for user 5", async (t) => {
  const post ={
    song_lyrics:"Theoi mou katoikoune sto magiko mou kefali",
    song_album_cover:"",
    song_canvas:""
  }
  const response = await t.context.got.put('user/40/post',{
    throwHttpErrors: false,
    json: post
  });
  t.is(response.statusCode, 404);
  console.log(response.statusCode,response.body)
});

test("PUT/user/{user_id}/following/{following_id} returns correct response and status code for user 1", async (t) => {
  const response= await t.context.got.put('user/1/following/3',{throwHttpErrors: false});
  t.is(response.statusCode, 200);
  t.is(response.body.body, "You successfully followed the user");
  console.log(response.statusCode, response.body);
});

test("PUT/user/{user_id}/following/{following_id} returns correct response and status code for user 2", async (t) => {
  const response= await t.context.got.put('user/1/following/13',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
  console.log(response.statusCode, response.body);
});

test("PUT/user/{user_id}/following/{following_id} returns correct response and status code for user 3", async (t) => {
  const response= await t.context.got.put('user/100000/following/13',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
  console.log(response.statusCode, response.body);
});

test("PUT/user/{user_id}/following/{following_id} returns correct response and status code for user 4", async (t) => {
  const response= await t.context.got.put('user/1/following/10100101001',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
  console.log(response.statusCode, response.body);
});

test("PUT/user/{user_id}/following/{following_id} returns correct response and status code for user 5", async (t) => {
  const response= await t.context.got.put('user/7/following/8',{throwHttpErrors: false});
  t.is(response.statusCode, 200);
  t.is(response.body.body, "You unfollowed the user");
  console.log(response.statusCode, response.body);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 1", async (t) => {
  const like= true;
  const response= await t.context.got.put(`user/1/following/3/post/12/comment/11?like=${like}`,{throwHttpErrors: false});
  t.is(response.statusCode, 200);
  t.is(response.body.body, "You liked the comment.")
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 2", async (t) => {
  const response= await t.context.got.put('user/7/following/8/post/23/comment/24?like=false',{throwHttpErrors: false});
  t.is(response.statusCode, 200);
  t.is(response.body.body, "You unliked the comment.")
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 3", async (t) => {
  const response= await t.context.got.put('user/7/following/8/post/23/comment/24?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 200);
  t.is(response.body.body, "Nothing happened.")
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 11", async (t) => {
  const reply = `Crazy response`;  
  const encodedReply = encodeURIComponent(reply);
  const response = await t.context.got.put(`user/1/following/3/post/12/comment/11?reply=${encodedReply}`, { throwHttpErrors: false });
  t.is(response.statusCode, 200);
  t.is(response.body.body, `You replied to the comment: ${reply}`);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 12", async (t) => {
  const report = true;  
  const response = await t.context.got.put(`user/1/following/3/post/12/comment/11?report=${report}`, { throwHttpErrors: false });
  t.is(response.statusCode, 200);
  t.is(response.body.body, `You reported the user`);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 4", async (t) => {
  const response= await t.context.got.put('user/700/following/8/post/23/comment/24?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
  t.is(response.body.error, "User Not Found")
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 5", async (t) => {
  const response= await t.context.got.put('user/7/following/80000/post/23/comment/24?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 6", async (t) => {
  const response= await t.context.got.put('user/7/following/8/post/230000/comment/24?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 7", async (t) => {
  const response= await t.context.got.put('user/7/following/8/post/23/comment/240000?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
});

test("PUT/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 8", async (t) => {
  const response= await t.context.got.put('user/7/following/8/post/23/comment/11?like=true',{throwHttpErrors: false});
  t.is(response.statusCode, 404);
});


//////////////////////
///DELETE ENDPOINT///
////////////////////

///////////      DELETE /user/{user_id}/following/{following_id}      ////////////////
// Test 1: Valid Input
test("DELETE /user/{user_id}/following/{following_id} with valid inputs", async (t) => {
  const { body, statusCode } = await t.context.got.delete("user/7/following/8");
  t.is(statusCode, 200);
  t.is(body.message.user_id, 7);
  t.is(body.message.following_id, 8);
});

// Test 2: Invalid user_id (Invalid data type)
test("DELETE /user/{user_id}/following/{following_id} with invalid user_id", async (t) => {
  const { body, statusCode } = await t.context.got.delete("user/-10/following/8", {
    throwHttpErrors: false, // Don't throw error on bad request
  });
  t.is(statusCode, 400);
  t.is(body.message, "Invalid user_id. It must be an integer between 1 and 120.");
});

// Test 3: user_id that does not exist
test("DELETE /user/{user_id}/following/{following_id} with user_id that does not exist", async (t) => {
  const { body, statusCode } = await t.context.got.delete("user/6/following/8", {
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "Response code 400 (Unauthorized): User_id not found.");
});

// Test 4: Invalid following_id (Invalid data type)
test("DELETE /user/{user_id}/following/{following_id} with invalid following_id", async (t) => {
  const { body, statusCode } = await t.context.got.delete("user/7/following/-8", {
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "Invalid following_id. It must be an integer between 1 and 120.");
});

// Test 5: following_id that does not exist
test("DELETE /user/{user_id}/following/{following_id} with following_id that does not exist", async (t) => {
  const { body, statusCode } = await t.context.got.delete("user/7/following/5", {
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "Following_id not found.");
});



////////////////////
///POST ENDPOINT///
//////////////////

///////////      POST user/{user_id}/post      ////////////////

// Test 1: Valid Input
test("POST /user/{user_id}/post with valid inputs", async (t) => {
  const payload = {
    content: "This is a valid post.",
    song_lyrics: "Some lyrics",
    song_album_cover: "cover.jpg",
    song_canvas: "canvas_data",
  };
  const { body, statusCode } = await t.context.got.post("user/7/post", {
    json: payload,
  });
  t.is(statusCode, 201);
  t.truthy(body);

});

// Test 2: Invalid user_id
test("POST /user/{user_id}/post with invalid user_id", async (t) => {
  const payload = { content: "This is a valid post." };
  const { body, statusCode } = await t.context.got.post("user/-10/post", {
    json: payload,
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "Invalid user_id. It must be a positive integer.");
});

// Test 3: Invalid required fields
test("POST /user/{user_id}/post with invalidcontent", async (t) => {
  
  const { body, statusCode } = await t.context.got.post("user/7/post", {
    searchParams: { song_lyrics: "12345", song_album_cover: "cover_example", song_canvas: "canvas_example" }, // Query Parameters
    json: { content: true }, // Body Content
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "request.body.content should be string");
});


// Test 4: Non-existent user_id
test("POST /user/{user_id}/post with non-existent user_id", async (t) => {
  const payload = { content: "This is a valid post." };
  const { body, statusCode } = await t.context.got.post("user/999/post", {
    json: payload,
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "User not found.");
});

////////////////////
///PUT ENDPOINT////
//////////////////

///////////      PUT user/{user_id}/Spotify      ////////////////


test("PUT /user/{user_id}/spotify with valid inputs", async (t) => {
  const payload = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    expiresIn: 3600,
    scope: "playlist-read",
  };
  const { body, statusCode } = await t.context.got.put("user/7/spotify", {
    json: payload,
  });
  t.is(statusCode, 200);
  t.is(body.message, "Spotify data synced successfully for user_id: 7");
});

// Test 2: Invalid user_id
test("PUT /user/{user_id}/spotify with invalid user_id", async (t) => {
  const payload = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    expiresIn: 3600,
    scope: "playlist-read",
  };
  const { body, statusCode } = await t.context.got.put("user/-10/spotify", {
    json: payload,
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "Invalid user_id. It must be a positive integer.");
});

// Test 3: Non-existent user_id
test("PUT /user/{user_id}/spotify with non-existent user_id", async (t) => {
  const payload = {
    accessToken: "testAccessToken",
    refreshToken: "testRefreshToken",
    expiresIn: 3600,
    scope: "playlist-read",
  };
  const { body, statusCode } = await t.context.got.put("user/999/spotify", {
    json: payload,
    throwHttpErrors: false,
  });
  t.is(statusCode, 400);
  t.is(body.message, "User not found.");
});

test("PUT /user/{id}/following/{id}/post/{id} - Successfull Interaction like & comment & report", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3?like=true&comment=Loveit&report=false',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post interaction successfull.");
  t.is(body.body.likes, 1); // Should increment by 1
});

test("PUT /user/{id}/following/{id}/post/{id} -Successfull Interaction Like ", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3?like=true',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post interaction successfull.");
  t.is(body.body.likes, 1); // Should increment by 1
});

test("PUT /user/{id}/following/{id}/post/{id} -Successfull interaction Like", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3?like=false',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post interaction successfull.");
  t.is(body.body.likes, 0); // Should remain the same
});

test("PUT /user/{id}/following/{id}/post/{id} -Successfull interaction comment", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3?comment=Loveit',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post interaction successfull.");
  t.is(body.body.comments[0], "Loveit"); // Should append new comment to comments
});

test("PUT /user/{id}/following/{id}/post/{id} -Successfull Interaction report", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3?report=true',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post interaction successfull.");
  t.is(body.body.reports, 1); // Should increment by 1
});

test("PUT /user/{id}/following/{id}/post/{id} -Invalid userId ", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/9999999999/following/100/post/3',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "User Not Found.");
});

test("PUT /user/{id}/following/{id}/post/{id} -Invalid postId ", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/99999999999',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Post not found.");
});

test("PUT /user/{id}/following/{id}/post/{id} -Invalid followingId ", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/99999999/post/3',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Post not found.");
});

test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Add a song to spotify successfully", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3/song/1',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Song has been added to Spotify.");
});

test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - User not found", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/99999999/following/100/post/3/song/1',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "User Not Found.");
});

test("PUT /user/{id}/following/{id}/post/{id}/song/{id} -Following not found", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/9999999999999/post/3/song/1',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Post not found.");
});

test("PUT /user/{id}/following/{id}/post/{id}/song/{id} - Song not found", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/3/song/999999999',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Song not found.");
});

test("PUT /user/{id}/following/{id}/post/{id}/song/{id} -Post not found", async (t) => {
  const { body, statusCode } = await t.context.got.put('user/1/following/100/post/9999999999/song/1',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Post not found.");
});

test("DEL user/{id}/post/{id} - Delete a post successfully with correct user_Id", async (t) => {
  const { body, statusCode } = await t.context.got.delete('user/1/post/3',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 200);
  t.is(body.message, "Post has been deleted successfully.");
});

test("DEL user/{id}/post/{id} - Delete a post unsuccessfully with incorrect user_Id, correct post_id", async (t) => {
  const { body, statusCode } = await t.context.got.delete('user/99999999999/post/3',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "User not found.");
});

test("DEL user/{id}/post/{id} - Delete a post unsuccessfully with correct user_Id, incorrect post_id", async (t) => {
  const { body, statusCode } = await t.context.got.delete('user/1/post/9999999999',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 404);
  t.is(body.error, "Post not found.");
});

test("DEL user/{id}/post/{id} - Delete a post unsuccessfully because user_id and post_id did not exist in the same post", async (t) => {
  const { body, statusCode } = await t.context.got.delete('user/1/post/10',
    {throwHttpErrors: false});
  console.log(body);
  t.is(statusCode, 400);
  t.is(body.error, "User does not own the post.");
});