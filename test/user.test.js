/*import test from 'ava';
import request from 'got';
import listen from 'test-listen';
import { app } from "../index.js";
*/
const test = require('ava');
const request = require('got');
const listen = require('test-listen');
const app = require("../index.js"); // Χρησιμοποίησε require αντί για import

test.before(async (t) => {
    t.context.server = app.listen();
    t.context.prefixUrl = await listen(t.context.server);
});

test.after.always((t) => {
    t.context.server.close();
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

// Πρόσθεσε και τα άλλα 2 tests για τα υπόλοιπα "unhappy" cases
