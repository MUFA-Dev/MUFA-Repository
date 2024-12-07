import test from "ava";
import http from "node:http";
import got from "got";
import app from "../index.js";
import listen from "test-listen";
import {userUser_idNotificationsPostsGET} from "../controllers/userUser_idNotificationsPostsGET.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 1", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idNotificationsPostsGET(null,response,null,1);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 2", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idNotificationsPostsGET(null,response,null,2.5);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 3", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idNotificationsPostsGET(null,response,null,"asdsa");
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{user_id}/notifications/posts returns correct response and status code for user 4", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idNotificationsPostsGET(null,response,null,10);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});