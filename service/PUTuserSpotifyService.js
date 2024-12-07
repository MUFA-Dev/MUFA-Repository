'use strict';

exports.userUser_idSpotifyPUT = function (body, user_id) {
  return new Promise(function (resolve, reject) {
    // Έλεγχος αν το user_id είναι έγκυρο (ακέραιος αριθμός μεταξύ 1 και 120)
    if (!Number.isInteger(user_id) || user_id < 1 || user_id > 120) {
      return reject({
        statusCode: 400,
        message: "Invalid user_id. It must be an integer between 1 and 120.",
      });
    }

    // Έλεγχος αν το body παρέχεται
    if (!body) {
      return reject({
        statusCode: 400,
        message: "Invalid body format. Body is required.",
      });
    }

    // Έλεγχος αν το body περιέχει το απαιτούμενο πεδίο 'sync'
    if (typeof (body.sync) !== "boolean") {
      return reject({
        statusCode: 400,
        message: "Invalid body format. 'sync' must be a boolean.",
      });
    }

    // Αν όλα τα δεδομένα είναι σωστά, επιστρέφει επιτυχία
    resolve({
      statusCode: 201,
      message: "Spotify sync completed successfully.",
    });
  });
};