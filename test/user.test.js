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


// Test 1: Valid Input

test("PUT /user/{user_id}/Spotify with valid inputs", async (t) => {
   const payload = {
     accessToken: "validAccessToken",
     refreshToken: "validRefreshToken",
     expiresIn: 3600,
     scope: "read_write",
   };

   const { statusCode, body: responseBody } = await t.context.got.put("user/7/spotify", {
    json: payload
  });

  t.is(statusCode, 200);
  t.is(responseBody.message, "Sync successful");
  
});

// Test 2: Invalid user_id (Invalid data type)
test("PUT /user/{user_id}/Spotify with invalid user_id", async (t) => {
  const body = {
    accessToken: "validAccessToken",
    refreshToken: "validRefreshToken",
    expiresIn: 3600,
    scope: "read_write",
  };

  const { body: responseBody, statusCode } = await t.context.got.put("user/not-a-number/spotify", {
    json: body,
    throwHttpErrors: false,
  });

  t.is(statusCode, 400);
  t.is(responseBody.message, "request.params.user_id should be integer");
});

// Test 3: Invalid body (not an object)
test("PUT /user/{user_id}/Spotify with invalid body", async (t) => {
  const body = "not-an-object"; // Invalid body

  const { body: responseBody, statusCode } = await t.context.got.put("user/123/spotify", {
    json: body,
    throwHttpErrors: false,
  });

  t.is(statusCode, 400);
  
});



// Test 5: Incorrect type in body fields
test("PUT /user/{user_id}/Spotify with incorrect type in body", async (t) => {
  const body = {
    accessToken: "validAccessToken",
    refreshToken: "validRefreshToken",
    expiresIn: "not-an-integer", // Invalid type
    scope: "read_write",
  };

  const { body: responseBody, statusCode } = await t.context.got.put("user/123/spotify", {
    json: body,
    throwHttpErrors: false,
  });

  t.is(statusCode, 400);
  t.is(responseBody.message, "request.body.expiresIn should be integer");
});

// Test 6: Invalid type for a string field
test("PUT /user/{user_id}/Spotify with invalid type for string field", async (t) => {
  const body = {
    accessToken: 12345, // Invalid type
    refreshToken: "validRefreshToken",
    expiresIn: 3600,
    scope: "read_write",
  };

  const { body: responseBody, statusCode } = await t.context.got.put("user/123/spotify", {
    json: body,
    throwHttpErrors: false,
  });

  t.is(statusCode, 400);
  t.is(responseBody.message, "request.body.accessToken should be string");
});

