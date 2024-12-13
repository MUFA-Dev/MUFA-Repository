const http = require('node:http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });

  test('GET /user/{id}/song with correct inputs', async (t) => {
    const queryParams = {
      song_name: "Nyxterides",
      song_artist: "LEX",
      song_genre: "rap",
      song_album: "G.T.K.",
    };
    const { body, statusCode } = await t.context.got.get('user/1/song', {
        searchParams: queryParams,
        throwHttpErrors: false,
    });
    console.log(body);
    t.is(statusCode,200);
    t.is(body.message, 'Song found.');
  });

test("GET/user/{id}/song with invalid song search", async (t) => {
   
    const { body, statusCode } = await t.context.got.get('user/1/song?song_name=Unknown&song_artist=LEX&song_genre=rap&song_album=G.T.K.', {
        throwHttpErrors: false,
    });
    t.is(statusCode, 404);
    t.is(body.error, "No songs found.");
});

test("GET/user/{id}/song with invalid user_id search", async (t) => {
   
  const { body, statusCode } = await t.context.got.get('user/999999999/song?song_name=Unknown&song_artist=LEX&song_genre=rap&song_album=G.T.K.', {
      throwHttpErrors: false,
  });
  t.is(statusCode, 404);
  t.is(body.error, "User not found.");
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
