// import test from "ava";
// import http from "node:http";
// import got from "got";
// import app from "../index.js";
// import listen from "test-listen";
// import {userUser_idSongGET} from "../controllers/Default.js";

// // test('Test to pass', (t) => {
// //     t.pass();
// // })

// // test('Test value',async(t)=>{
// //     const a=1;
// //     t.is(a+1,2);
// // })

// test.before(async (t) => {
// 	t.context.server = http.createServer(app);
//     const server = t.context.server.listen();
//     const { port } = server.address();
// 	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
// });

// test.after.always((t) => {
// 	t.context.server.close();
// });

// test("GET/user/{id}/song returns correct response and status code", async (t) => {
//     const response = {
//         writeHead: (statusCode, headers) => {},
//         end: (body) => {response.body = body;}};
//     await userUser_idSongGET(null,response,null,1,"tak", null,null,null,null);
//     const parsedBody = JSON.parse(response.body);
//     console.log(parsedBody);
//     t.is(parsedBody.statusCode, 200);
// });
// test("GET /api returns correct response and status code", async (t) => {
// 	const { body, statusCode } = await t.context.got("api");
// 	t.is(body.message, "It works!");
// 	t.is(statusCode, 200);
// });