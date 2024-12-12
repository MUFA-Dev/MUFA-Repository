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
  const response= await t.context.got('user/1/song?song_name=Nyxterides');
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
  const reply = `"Crazyy"`;  
  const response = await t.context.got.put(`user/1/following/3/post/12/comment/11?reply=${reply}`, { throwHttpErrors: false });
  t.is(response.statusCode, 200);
  t.is(response.body.body, `You replied to the comment: "${reply}"`);
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