import http from "node:http";
import test from "ava";
import got from "got";
import app from "../server.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

