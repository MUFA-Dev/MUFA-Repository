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
const spotifyData = {};

const notifications = {
  1: [
    {
      read: true,
      created_at: "2023-12-13T10:15:00.000Z",
      id: 101,
      type: "comment",
      message: "Your comment has received a reply.",
    },
  ],
  7: [
    {
      read: false,
      created_at: "2023-12-12T08:30:00.000Z",
      id: 102,
      type: "mention",
      message: "You were mentioned in a comment.",
    },
    {
      read: true,
      created_at: "2023-12-10T14:20:00.000Z",
      id: 103,
      type: "like",
      message: "Your comment received a like.",
    },
  ],
}; // Προσωρινά δεδομένα ειδοποιήσεων για τους χρήστες




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
        code: 400,
        message: "User not found.",
      });
    }
    
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



exports.userUser_idSpotifyPUT = function (body, user_id) {
  return new Promise(function (resolve, reject) {
    if (!Number.isInteger(user_id) || user_id <= 0) {
      return reject({
        code: 400,
        message: "Invalid user_id. It must be a positive integer.",
      });
    }
    // Έλεγχος αν το user_id υπάρχει
    if (!validUserIds.includes(user_id)) {
      return reject({
        code: 400,
        message: "User not found.",
      });
    }

    // Ενημέρωση των δεδομένων Spotify για τον χρήστη
    spotifyData[user_id] = {
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresIn: body.expiresIn,
      scope: body.scope,
    };

    resolve({
      message: `Spotify data synced successfully for user_id: ${user_id}`,
    });
  });
};

exports.userUser_idNotificationsCommentsGET = function (user_id) {
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
        code: 400,
        message: "User not found.",
      });
    }
    // Επιστροφή των ειδοποιήσεων για τον χρήστη
    resolve(notifications[user_id] || []);
  });
};