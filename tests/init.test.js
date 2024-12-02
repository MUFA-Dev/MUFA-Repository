import "dotenv/config";
import { createServer } from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});

test("GET / returns correct response and status code", async (t) => {
    const { body, statusCode } = await t.context.got("user/1/song");
    t.is(body.message, "It works!");
    t.is(statusCode, 200);
});