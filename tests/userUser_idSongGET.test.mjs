import test from "ava";
import { createServer } from "http";
import got from "got";
import app from "../index.js";
import listen from "test-listen";
import {userUser_idSongGET} from "../controllers/userUser_idSongGET.js";

// test('Test to pass', (t) => {
//     t.pass();
// })

// test('Test value',async(t)=>{
//     const a=1;
//     t.is(a+1,2);
// })

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});


test("GET/user/{id}/song returns correct response and status code for user 1", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,1,"Zilevei I Nixta", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{id}/song returns correct response and status code for user 2", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,5,"Kori Anemou", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 200);
});

test("GET/user/{id}/song returns correct response and status code for user 3", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,2.2,"tadadak", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{id}/song returns correct response and status code for user 4", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,"crydry","TL", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 400);
});

test("GET/user/{id}/song returns correct response and status code for user 5", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,5,"", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{id}/song returns correct response and status code for user 6", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,1,"dsdfgsd", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});

test("GET/user/{id}/song returns correct response and status code for user 7", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await userUser_idSongGET(null,response,null,1000,"Kori Anemou", null,null,null,null);
    const parsedBody = JSON.parse(response.body);
    console.log(parsedBody);
    t.is(parsedBody.statusCode, 404);
});