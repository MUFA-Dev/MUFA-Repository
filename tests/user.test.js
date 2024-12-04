import "dotenv/config";
import { createServer } from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";
import {userUser_idSongGET} from "../controllers/User.cjs";
import {userUser_idFollowingFollowing_idPostPost_idPUT} from "../controllers/User.cjs";

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});

test("GET/user/{id}/song with correct inputs", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,2,"Nyxterides", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{id}/song with invalid song search", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,2,"Nonexistent Song", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});
test("GET/user/{id}/song with invalid userId search", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,1020,"Nonexistent Song", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

// test("PUT/user/{id}/following/{id}/song/{id} returns correct response and status code", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => {response.body = body;}};
//     await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,2,100,3,2);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.statusCode, 200);
// });

test("PUT /user/{id}/following/{id}/post/{id} - Like a post with valid inputs", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => { response.body = body; },
    };
    await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,1, 100, 3, true, null, null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.message, "Interaction successful");
    t.is(parsedBody.body.post.interactions.likes, 6); // Should increment by 1
});

test("PUT /user/{id}/following/{id}/post/{id} - Comment on a post with valid inputs", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => { response.body = body; },
    };
    await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,1, 100, 3, null, "Awesome post!", null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.message, "Interaction successful");
    t.true(parsedBody.body.post.interactions.comments.includes("Awesome post!"));
});

test("PUT /user/{id}/following/{id}/post/{id} - Report a post with valid inputs", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => { response.body = body; },
    };
    await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,2, 101, 4, null, null, true);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.message, "Interaction successful");
    t.is(parsedBody.body.post.interactions.reports, 2); // Should increment by 1
});

test("PUT /user/{id}/following/{id}/post/{id} - Invalid post", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => { response.body = body; },
    };
    await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,99, 999, 999, true, null, null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.message, "Post not found.");
});

test("PUT /user/{id}/following/{id}/post/{id} - Invalid userId", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => { response.body = body; },
    };
    await userUser_idFollowingFollowing_idPostPost_idPUT(null,response,null,9999, 100, 3, true, null, null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.message, "Post not found.");
});
