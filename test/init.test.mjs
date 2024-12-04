import "dotenv/config";
import { createServer } from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";
import { userUser_idPostPUT } from "../controllers/User.cjs";

test.before(async (t) => {
    t.context.server = createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
    t.context.server.close();
});

// Happy Path
test("Happy Path: PUT /user/{id}/post returns 200 with valid data", async (t) => {
    const mockBody = {
        id: 1,
        content: "Updated post content",
        songId: 123,
        customizations: {}
    };

    const response = {
        writeHead: (statusCode, headers) => {
            response.statusCode = statusCode;
        },
        end: (body) => {
            response.body = body;
        }
    };

    await userUser_idPostPUT(mockBody, "Test lyrics", "Test album cover", "Test canvas", 2);

    const parsedBody = JSON.parse(response.body);

    t.is(response.statusCode, 200);
    t.is(parsedBody.message, "Post updated successfully.");
    t.is(parsedBody.customizations.song_lyrics, "Test lyrics");
    t.is(parsedBody.user_id, 2);
});

// Unhappy Path 1: Missing user_id
test("Unhappy Path 1: PUT /user/{id}/post fails when user_id is missing", async (t) => {
    const mockBody = {
        id: 1,
        content: "Updated post content",
        songId: 123,
        customizations: {}
    };

    const response = {
        writeHead: (statusCode, headers) => {
            response.statusCode = statusCode;
        },
        end: (body) => {
            response.body = body;
        }
    };

    await t.throwsAsync(
        async () => await userUser_idPostPUT(mockBody, "Test lyrics", "Test album cover", "Test canvas", null),
        {
            instanceOf: Error,
            message: /Invalid request: user_id or body is missing./
        }
    );
});

// Unhappy Path 2: Missing body
test("Unhappy Path 2: PUT /user/{id}/post fails when body is missing", async (t) => {
    const response = {
        writeHead: (statusCode, headers) => {
            response.statusCode = statusCode;
        },
        end: (body) => {
            response.body = body;
        }
    };

    await t.throwsAsync(
        async () => await userUser_idPostPUT(null, "Test lyrics", "Test album cover", "Test canvas", 2),
        {
            instanceOf: Error,
            message: /Invalid request: user_id or body is missing./
        }
    );
});

// Unhappy Path 3: Missing song_lyrics, song_album_cover, and song_canvas
test("Unhappy Path 3: PUT /user/{id}/post fails with missing customizations", async (t) => {
    const mockBody = {
        id: 1,
        content: "Updated post content",
        songId: 123,
        customizations: {}
    };

    const response = {
        writeHead: (statusCode, headers) => {
            response.statusCode = statusCode;
        },
        end: (body) => {
            response.body = body;
        }
    };

    await t.throwsAsync(
        async () => await userUser_idPostPUT(mockBody, null, null, null, 2),
        {
            instanceOf: Error,
            message: /Invalid request: Customizations are missing./
        }
    );
});
