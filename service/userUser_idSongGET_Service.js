'use strict';

exports.userUser_idSongGET = function(user_id, song_name, song_artist, song_genre, song_album) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 1,
        "title" : "Zilevei I Nixta"
      }, {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 2,
        "title" : "Iptamena Stileta"
      }, {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 3,
        "title" : "Xathika Sto Souroupo Tou Thronou Sou"
      }, {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 4,
        "title" : "Ploutonas"
      }, {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 5,
        "title" : "Kori Anemou"
      }, {
        "artist" : "Mani",
        "album" : "MeLeneMani",
        "genre" : "Rap",
        "id" : 6,
        "title" : "Apla Tha Katevo To Dromo"
      }  ];
  
      // Check for missing or invalid user_id
      if (!user_id || typeof user_id !== "number" || user_id % 1 !== 0) {
        reject({
          body: { error: "Invalid or missing user_id" },
          statusCode: 400 // Bad Request
        });
        return;
      }
      // If user_id is not found
      if (user_id <=0 || user_id>=7) {
        reject({
          body: { error: "User not found" },
          statusCode: 404 // Not Found
        });
        return;
      }
      const validSongNames = ["Zilevei I Nixta", "Iptamena Stileta", "Xathika Sto Souroupo Tou Thronou Sou","Ploutonas", "Apla Tha Katevo To Dromo", "Kori Anemou"];
      
      if (!validSongNames.includes(song_name)) {
        reject({
          body: { error: "Song Name not found" },
          statusCode: 404 // Not Found
        });
        return;
      }
    
      // Filter by song_name if provided
      let result = examples["application/json"];
      if (song_name) {
        result = result.filter(song => song.title.toLowerCase().includes(song_name.toLowerCase()));
      }
  
      // Return matched songs
      resolve({
        body: result,
        statusCode: 200 // Success
      });
    });
  };