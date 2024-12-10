'use strict';

const user_ids = [1, 7, 10, 30, 32, 40];
const following_ids = [3, 8, 15, 13, 39, 101, 117];
const songs = [
  { id: 1, title: "Imagine", artist: "John Lennon", album: "Imagine", genre: "Rock" },
  { id: 2, title: "Hey Jude", artist: "The Beatles", album: "Hey Jude", genre: "Pop" },
];

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


exports.userUser_idSongGET = function (user_id, song_name, song_artist, song_genre, song_album) {
  return new Promise(function (resolve, reject) {
    //ελεγχος αν το user_id εχει valid τιμη
     if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({ code: 400, message: "Invalid user_id. It must be an integer between 1 and 120." });
    }
    //ελεγχος αν το user_id ανηκει στα user_ids
     if (!user_ids.includes(user_id)) {
      return reject({ code: 400, message: "User_id not found." });
   }

    // Αν όλα είναι σωστά, επιστρέφουμε το αποτέλεσμα με κωδικό 200
    resolve({ code: 200, message: filteredSongs });
  });
};


