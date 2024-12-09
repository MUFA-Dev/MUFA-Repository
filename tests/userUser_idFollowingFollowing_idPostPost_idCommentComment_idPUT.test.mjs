import { createServer } from "http";
import test from "ava";
import got from "got";
import app from "../index.js";
import listen from "test-listen";
import {userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT} from "../controllers/userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT.js";

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});


test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 1", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,100,1000,true,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 2", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,2,11,101,1001,false,"My boy this song is FIRE","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 3", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,3,12,102,1002,false,"","This song is offensive!");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 4", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,100,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 5", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1.1,10,100,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 6", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10.5,100,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 7", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,100.5,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 8", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,100,1000.5,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 9", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1000,10,100,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 10", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,100000,100,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 11", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,1000000,1000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{user_id}/following/{following_id}/post/{post_id}/comment/{comment_id} returns correct response and status code for user 12", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idCommentComment_idPUT(null,response,null,1,10,100,100000,false,"","");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});
