'use strict';

exports.userUser_idPostPUT = function(body, song_lyrics, song_album_cover, song_canvas, user_id) {
    return new Promise(function(resolve, reject) {
        var examples = [
            {
                "user_id": 1,
                "song_lyrics": "",
                "song_album_cover": "",
                "song_canvas": "",
                "message": ""
            },
            {
                "user_id": 2,
                "song_lyrics": "",
                "song_album_cover": "",
                "song_canvas": "",
                "message": ""
            },
            {
                "user_id": 3,
                "song_lyrics": "",
                "song_album_cover": "",
                "song_canvas": "",
                "message": ""
            }
        ];

        // Check for missing or invalid user_id
        if (!user_id || typeof user_id !== "number" || user_id % 1 !== 0) {
            reject({
                body: { error: "Invalid or missing user_id" },
                statusCode: 400 // Bad Request
            });
            return; // Prevent further code execution
        }

        // If user_id is not found
        if (user_id < 1 || user_id > 3) {
            reject({
                body: { error: "User Not Found" },
                statusCode: 404 // Not Found
            });
            return; // Prevent further code execution
        }

        let result = null; // Initialize result
        examples.forEach(t => {
            if (t.user_id === user_id) {
                // If song_lyrics is provided, update
                if (song_lyrics) {
                    t.song_lyrics = song_lyrics;
                    t.message = t.message ? t.message + " | You successfully added song lyrics" : "You successfully added song lyrics";
                }
                // If song_album_cover is provided, update
                if (song_album_cover) {
                    t.song_album_cover = song_album_cover;
                    t.message = t.message ? t.message + " | You successfully added song album cover" : "You successfully added song album cover";
                }
                // If song_canvas is provided, update
                if (song_canvas) {
                    t.song_canvas = song_canvas;
                    t.message = t.message ? t.message + " | You successfully added song canvas" : "You successfully added song canvas";
                }
                result = t.message; // Set result to the final message
            }
        });

        // Check if result is found and resolve
        if (result) {
            resolve({
                body: { message: result }, // Return the final message
                statusCode: 200 // Success
            });
        }
    });
};
