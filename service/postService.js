
'use strict';
exports.userUser_idPostPOST = function(body,song_lyrics,song_album_cover,song_canvas,user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [];
    // event_check function checks if body is given in correct format
    if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({
        statusCode: 400,
        message: 'Invalid user_id. It must be an integer between 1 and 120.',
      });
    }

    
    // Έλεγχος αν το body περιέχει τα απαιτούμενα πεδία
    if (!body || !body.song_title || !body.song_duration) {
      return reject({
        statusCode: 400,
        message: "Invalid body format. 'song_title' and 'song_duration' are required.",
      });
    }

    if (typeof (song_album_cover) !== 'string' || !song_album_cover.startsWith('http')) {
      return reject({
        statusCode: 400,
        message: 'Invalid song_album_cover. It must be a valid URL.',
      });
    }

    
    if (typeof (song_canvas) !== 'object' || Array.isArray(song_canvas)) {
      return reject({
        statusCode: 400,
        message: 'Invalid song_canvas. It must be an object.',
      });
    }
  
    resolve({
      statusCode: 201,
      message: {
        user_id,
        body,
        song_lyrics,
        song_album_cover,
        song_canvas,
      },
    });
  });
}
