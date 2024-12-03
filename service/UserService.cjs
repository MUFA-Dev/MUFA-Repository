'use strict';

exports.userUser_idSongGET = function(user_id,song_name,song_artist,song_genre,song_album) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ {
    "artist" : "sadt",
    "album" : "album",
    "genre" : "genre",
    "id" : 0,
    "title" : "title"
  }, {
    "artist" : "ardasist",
    "album" : "album",
    "genre" : "genre",
    "id" : 0,
    "title" : "title"
  } ];
      if (user_id === 1) {
        resolve({
          body: examples[Object.keys(examples)[0]],
          statusCode: 200
        });
      } else {
        resolve();
      }
    });
  }