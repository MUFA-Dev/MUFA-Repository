import test from 'ava';
import request from 'got';
import listen from 'test-listen';
import { createRequire } from 'module';

// Χρησιμοποιούμε το createRequire για να φορτώσουμε το CommonJS module (index.cjs)
const require = createRequire(import.meta.url);
const { app } = require('../index.js'); // Εδώ παίρνουμε το app από το index.cjs

test.before(async (t) => {
    t.context.server = app.listen(); // Ξεκινήστε τον server
    t.context.prefixUrl = await listen(t.context.server); // Δημιουργήστε URL
});

test.after.always((t) => {
    if (t.context.server) {
        t.context.server.close(); // Κλείσιμο server
    }
});

test('Happy path: valid user_id and body', async (t) => {
    const response = await request.put(`${t.context.prefixUrl}/user/1/post`, {
        json: {
            id: 1,
            content: 'Updated post content',
            songId: 123
        },
        searchParams: {
            song_lyrics: 'Some lyrics',
            song_album_cover: 'Cover image',
            song_canvas: 'Canvas details'
        },
        responseType: 'json'
    });

    t.is(response.statusCode, 200);
    t.is(response.body.message, 'Post updated successfully.');
});

test('Unhappy path: Missing user_id', async (t) => {
    const error = await t.throwsAsync(() =>
        request.put(`${t.context.prefixUrl}/user//post`, {
            json: {
                content: 'Updated post content',
                songId: 123
            },
            responseType: 'json'
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid request: user_id or body is missing.');
});
