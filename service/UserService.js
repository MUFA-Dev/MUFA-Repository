'use strict';

exports.userUser_idPostPUT = function (body, song_lyrics, song_album_cover, song_canvas, user_id) {
    return new Promise(function (resolve, reject) {
        // Case 1: Missing `user_id`
        if (!user_id) {
            reject({
                statusCode: 400,
                message: "Invalid request: user_id is missing."
            });
        } 
        // Case 2: Missing `body`
        else if (!body) {
            reject({
                statusCode: 400,
                message: "Invalid request: body is missing."
            });
        } 
        // Case 3: Invalid `body` structure
        else if (!body.content || !body.id) {
            reject({
                statusCode: 400,
                message: "Invalid request: body structure is incorrect. Missing `content` or `id`."
            });
        } 
        // Happy Path
        else {
            // Δημιουργία παραδείγματος απάντησης
            const response = {
                id: body.id,
                content: body.content,
                songId: body.songId || 123,
                customizations: {
                    song_lyrics: song_lyrics || "Default lyrics",
                    song_album_cover: song_album_cover || "Default cover",
                    song_canvas: song_canvas || "Default canvas",
                },
                user_id: user_id,
                message: "Post updated successfully."
            };
            resolve({
                statusCode: 200,
                body: response
            });
        }
    });
};
