'use strict';

const validUserIds = [1, 7, 10, 30, 32, 40]; // Υποθετικοί έγκυροι `user_id`
const posts = []; // Προσωρινός αποθηκευτικός χώρος για posts
const user_ids = [1, 7, 10, 30, 32, 40];
const following_ids = [3, 8, 15, 13, 39, 101, 117];
const userSongs = {
  7: [
    { id: 1, title: "Song A", artist: "Artist 1", album: "Album X", genre: "Pop" },
    { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y", genre: "Rock" },
    { id: 3, title: "Song C", artist: "Artist 1", album: "Album Z", genre: "Jazz" },
  ],
  10: [
    { id: 4, title: "Song D", artist: "Artist 3", album: "Album W", genre: "Classical" },
  ],
};
const REQUIRED_SPOTIFY_FIELDS = {
  accessToken: 'string',
  refreshToken: 'string',
  expiresIn: 'integer',
  scope: 'string'
};



exports.userUser_idFollowingFollowing_idDELETE = function (user_id, following_id) {
  return new Promise(function (resolve, reject) {
    // Step 1: Έλεγχος αν το user_id είναι μεταξύ 1 και 120
    if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be an integer between 1 and 120.",
      });
    }

    // Step 2: Έλεγχος αν υπάρχει το user_id
    if (!user_ids.includes(user_id)) {
      return reject({
        code: 400,
        message: "Response code 400 (Unauthorized): User_id not found.",
      });
    }

    // Step 3: Έλεγχος αν το following_id είναι μεταξύ 1 και 120
    if (!Number.isInteger(following_id) || following_id < 1 || following_id > 120) {
      return reject({
        code: 400,
        message: "Invalid following_id. It must be an integer between 1 and 120.",
      });
    }

    // Step 4: Έλεγχος αν υπάρχει το following_id
    if (!following_ids.includes(following_id)) {
      return reject({
        code: 400,
        message: "Following_id not found.",
      });
    }

    // Επιτυχής απόκριση
    resolve({
      code: 200,
      message: {
        user_id,
        following_id,
      },
    });
  });
};


// exports.userUser_idSongGET = function (user_id, song_name, song_artist, song_genre, song_album) {
//   return new Promise(function (resolve, reject) {
//     //ελεγχος αν το user_id εχει valid τιμη
//      if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
//       return reject({ code: 400, message: "Invalid user_id. It must be an integer between 1 and 120." });
//     }
//     //ελεγχος αν το user_id ανηκει στα user_ids
//      if (!user_ids.includes(user_id)) {
//       return reject({ code: 400, message: "User_id not found." });
//    }

//     // Αν όλα είναι σωστά, επιστρέφουμε το αποτέλεσμα με κωδικό 200
//     resolve({ code: 200, message: filteredSongs });
//   });
// };

///////////      POST user/{user_id}/post      ////////////////

exports.userUser_idPostPOST = function (body, song_lyrics, song_album_cover, song_canvas, user_id) {
  return new Promise(function (resolve, reject) {
    // Έλεγχος αν το user_id είναι έγκυρο
    if (!Number.isInteger(user_id) || user_id <= 0) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be a positive integer.",
      });
    }
    // Έλεγχος αν το user_id υπάρχει
    if (!validUserIds.includes(user_id)) {
      return reject({
        code: 404,
        message: "User not found.",
      });
    }
    
  // // Έλεγχος για προαιρετικά πεδία και τύπους δεδομένων

  // if (song_lyrics && typeof (song_lyrics) !== "string") {
  //     return reject({
  //       code: 400,
  //       message: "Invalid data type for song_lyrics. It must be a string.",
  //     });
  //    }
    // if (song_canvas && typeof song_canvas !== "string") {
    //   return reject({
    //     code: 400,
    //     message: "Invalid data type for song_canvas. It must be a string.",
    //   });
    // }
     // Δημιουργία του νέου post
   const newPost = {
      id: posts.length + 1, // Auto-increment ID
      user_id,
      content: body.content,
      song_lyrics,
      song_album_cover,
      song_canvas,
    };

    
    posts.push(newPost); // Αποθήκευση στη μνήμη
    resolve(newPost); // Επιστροφή της απάντησης
  });
};

///////////      PUT user/{user_id}/Spotify      ////////////////

exports.userUser_idSpotifyPUT = function(body,user_id) {
  return new Promise(function (resolve, reject) {
  // Check if user_id is a number
  if (!Number.isInteger(user_id)||user_id <= 0) {
    return reject({ status: 400, message: "Invalid user_id. Must be an integer." });
  }

  // Check if body is an object
  if (!body || typeof body !== "object") {
    return reject({ status: 400, message: "Invalid body. Must be an object." });
  }

  // Validate required fields in body
  const REQUIRED_SPOTIFY_FIELDS = {
    accessToken: "string",
    refreshToken: "string",
    expiresIn: "integer",
    scope: "string",
  };

  const missingFields = [];
  for (const [field, type] of Object.entries(REQUIRED_SPOTIFY_FIELDS)) {
    if (!body.hasOwnProperty(field)) {
      missingFields.push(field);
    } else if (type === "string" && typeof body[field] !== "string") {
      return reject({ status: 400, message: `Invalid type for ${field}. Expected string.` });
    } else if (type === "integer" && !Number.isInteger(body[field])) {
      return reject({ status: 400, message: `Invalid type for ${field}. Expected integer.` });
    }
  }

  
  // Successful validation
  resolve({ 
    status: 200, 
    message: "Sync successful",
    data: {
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresIn: body.expiresIn,
      scope: body.scope,
    }
  });
   
});
};
