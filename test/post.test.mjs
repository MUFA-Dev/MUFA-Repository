import "dotenv/config";
import { createServer } from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";
import { userUser_idPostPOST} from "../controllers/post.js";

test.before(async (t) => {
  t.context.server = createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
  t.context.server.close();
});

// Test 1: Valid input
test("POST /user/{user_id} with valid inputs", async (t) => {
  const response = {
    writeHead: (statusCode, headers) => {},
    end: (body) => { response.body = body; },
  };

  const body = {
    song_title: "Test Song",
    song_duration: 180
  };

  const song_lyrics = "Sample lyrics for the test song.";
  const song_album_cover = "http://example.com/album-cover.jpg";
  const song_canvas = { animation: "loop", colors: ["#fff", "#000"] };
  const user_id = 10;

  await userUser_idPostPOST(null, response, null, body, song_lyrics, song_album_cover, song_canvas, user_id);
  const parsedBody = JSON.parse(response.body);

  console.log(parsedBody);
  t.is(parsedBody.statusCode, 201);
  t.is(parsedBody.message.user_id, user_id);
  t.is(parsedBody.message.body.song_title, body.song_title);
});

// Test 2: Invalid userid
test("POST /user/{user_id} with invalid user_id", async (t) => {
  const response = {
    writeHead: (statusCode, headers) => {},
    end: (body) => { response.body = body; },
  };

  const body = {
    song_title: "Test Song",
    song_duration: 180
  };

  const song_lyrics = "Sample lyrics for the test song.";
  const song_album_cover = "http://example.com/album-cover.jpg";
  const song_canvas = { animation: "loop", colors: ["#fff", "#000"] };
  const user_id = 200; // Invalid user_id

  await userUser_idPostPOST(null, response, null, body, song_lyrics, song_album_cover, song_canvas, user_id);
  const parsedBody = JSON.parse(response.body);

  console.log(parsedBody);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "Invalid user_id. It must be an integer between 1 and 120.");
});

// Test case 3: Invalid body format
test("POST /user/{user_id} with invalid body", async (t) => {
  const response = {
    writeHead: (statusCode, headers) => {},
    end: (body) => { response.body = body; },
  };

  const body = {}; // Missing required fields
  const song_lyrics = "Sample lyrics for the test song.";
  const song_album_cover = "http://example.com/album-cover.jpg";
  const song_canvas = { animation: "loop", colors: ["#fff", "#000"] };
  const user_id = 10;

  await userUser_idPostPOST(null, response, null, body, song_lyrics, song_album_cover, song_canvas, user_id);
  const parsedBody = JSON.parse(response.body);

  console.log(parsedBody);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "Invalid body format. 'song_title' and 'song_duration' are required.");
});

// Test case 4: Invalid song_album_cover URL
test("POST /user/{user_id} with invalid song_album_cover URL", async (t) => {
  const response = {
    writeHead: (statusCode, headers) => {},
    end: (body) => { response.body = body; },
  };

  const body = {
    song_title: "Test Song",
    song_duration: 180
  };

  const song_lyrics = "Sample lyrics for the test song.";
  const song_album_cover = "invalid-url"; // Invalid URL
  const song_canvas = { animation: "loop", colors: ["#fff", "#000"] };
  const user_id = 10;

  await userUser_idPostPOST(null, response, null, body, song_lyrics, song_album_cover, song_canvas, user_id);
  const parsedBody = JSON.parse(response.body);

  console.log(parsedBody);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "Invalid song_album_cover. It must be a valid URL.");
});

// Test case 5: Invalid song_canvas
test("POST /user/{user_id} with invalid song_canvas", async (t) => {
  const response = {
    writeHead: (statusCode, headers) => {},
    end: (body) => { response.body = body; },
  };

  const body = {
    song_title: "Test Song",
    song_duration: 180
  };

  const song_lyrics = "Sample lyrics for the test song.";
  const song_album_cover = "http://example.com/album-cover.jpg";
  const song_canvas = "invalid-object"; // Invalid song_canvas
  const user_id = 10;

  await userUser_idPostPOST(null, response, null, body, song_lyrics, song_album_cover, song_canvas, user_id);
  const parsedBody = JSON.parse(response.body);

  console.log(parsedBody);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "Invalid song_canvas. It must be an object.");



});