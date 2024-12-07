import test from "ava";
import http from "node:http";
import got from "got";
import app from "../index.js";
import listen from "test-listen";
import {userUser_idPostPUT} from "../controllers/userUser_idPostPUT.js";

// test('Test to pass', (t) => {
//     t.pass();
// })

// test('Test value',async(t)=>{
//     const a=1;
//     t.is(a+1,2);
// })

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("PUT/user/{user_id}/postsong returns correct response and status code for user 1", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idPostPUT(null,response,null,null, "Mikrous olous mas taizan ta frouta tou diabolou",null,null,1);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("PUT/user/{user_id}/postsong returns correct response and status code for user 2", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idPostPUT(null,response,null,null, null,"url_album_cover_for_xeiroterh_genia_LEX.jpg",null,2);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("PUT/user/{user_id}/postsong returns correct response and status code for user 3", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idPostPUT(null,response,null,null,null, null, "url_canvas_image_for_xeiroterh_genia_LEX.jpg",3);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("PUT/user/{user_id}/postsong returns correct response and status code for user 4", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idPostPUT(null,response,null,null,null, null, "url_canvas_image_for_xeiroterh_genia_LEX.jpg",3.5);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("PUT/user/{user_id}/postsong returns correct response and status code for user 5", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idPostPUT(null,response,null,null,null, null, "url_canvas_image_for_xeiroterh_genia_LEX.jpg",3000);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

