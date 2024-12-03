import "dotenv/config";
import { createServer } from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";
import {userUser_idSongGET} from "../controllers/User.cjs";

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});

test("GET/user/{id}/song returns correct response and status code", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,2,"Nyxterides", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("PUT/user/{id}/following/{id}/song/{id} returns correct response and status code", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT(null,response,null,2,100,3,2);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});