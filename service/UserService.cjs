'use strict';

exports.userUser_idSongGET = function(user_id,song_name,song_artist,song_genre,song_album) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ {
    "artist" : "LEX",
    "album" : "G.T.K.",
    "genre" : "Rap",
    "id" : 1,
    "title" : "Nyxterides"
  }, {
    "artist" : "Radiohead",
    "album" : "Ok Computer",
    "genre" : "Alternative",
    "id" : 2,
    "title" : "No Surprises"
  } ];
      if (user_id > 1 && user_id < 1000) {
        resolve({
          body: examples[Object.keys(examples)[0]],
          statusCode: 200
        });
      } else {
        resolve({
          statusCode: 400,
          message: "Something went wrong claiming your account details"
        });
      }
        if (song_name == "Nyxterides"){
        resolve({
          body: examples[Object.keys(examples)[0]],
          statusCode: 200
        });
       }if (song_artist == "LEX"){
          resolve({
            body: examples[Object.keys(examples)[0]],
            statusCode: 200
          });
        }else{
          resolve({
            statusCode: 400,
            message: "Song was not found"
          });
        }
          if (song_genre == "Rap"){
            resolve({
              body: examples[Object.keys(examples)[0]],
              statusCode: 200
            });
        }else{
            resolve({
              statusCode: 400,
              message: "Genre was not found"
            });
        }
        if (song_album == "G.T.K."){
              resolve({
                body: examples[Object.keys(examples)[0]],
                statusCode: 200
              });
        }else{
              resolve({
                statusCode: 400,
                message: "Album was not found"
              });
        }if(song_name == "No Surprises"){
          resolve({
            body: examples[Object.keys(examples)[1]],
            statusCode: 200
          });
        }else{
          resolve({
            statusCode: 400,
            message: "Song was not found"
          });
        }if(song_artist == "Radiohead"){
          resolve({
            body: examples[Object.keys(examples)[1]],
            statusCode: 200
          });
        }else{
          resolve({
            statusCode: 400,
            message: "Artist was not found"
          });
        }if(song_genre == "Alternative"){
          resolve({
            body: examples[Object.keys(examples)[1]],
            statusCode: 200
          });
        }else{
          resolve({
            statusCode: 400,
            message: "Genre was not found"
          });
        }if(song_album == "Ok Computer"){
          resolve({
            body: examples[Object.keys(examples)[1]],
            statusCode: 200
          });
        }else{
          resolve({
            statusCode: 400,
            message: "Album was not found"
          });
        }
        resolve({
          statusCode: 404,
          message: "Something went wrong"
        })
    });
  }

  exports.userUser_idFollowingFollowing_idPostPost_idSongSong_idPUT = function(user_id,following_id,post_id,song_id) {
    return new Promise(function(resolve, reject) {
      if (user_id > 1 && user_id < 1000) {
        resolve({
          statusCode: 200
        });
      } else {
        resolve({
          statusCode: 400,
          message: "Something went wrong claiming your account details"
        });
      }
      if(following_id > 1 && following_id < 1000){
        resolve({
          statusCode: 200
        });
      } else {  
        resolve({
          statusCode: 400,
          message: "The user does not exists, or they have blocked you"
          
        });
      }
      if(post_id > 1 && post_id < 5000){
        resolve({
          statusCode: 200
        });
      } else {  
        resolve({
          statusCode: 400,
          message: "Can not retrieve post"
        });
      }
      if(song_id > 1 && song_id < 100000){
        resolve({
          statusCode: 200
        });
      } else {  
        resolve({
          statusCode: 404,
          message: "Something went wrong"
        });
      }
    });
  }

  exports.userUser_idFollowingFollowing_idPostPost_idPUT = function(user_id,following_id,post_id,like,comment,report) {
    return new Promise(function(resolve, reject) {
      if (user_id > 1 && user_id < 1000) {
        resolve({
          statusCode: 200
        });
      } else {
        resolve({
          statusCode: 400,
          message: "There was something wrong in claiming your account details"
        });
      }
      if(following_id > 1 && following_id < 1000){
        resolve({
          statusCode: 200
        });
      } else {  
        resolve({
          statusCode: 400,
          message: "You are not following this user"
        });
      }
      if(post_id > 1 && post_id < 5000){
        resolve({
          statusCode: 200
        });
      } else {  
        resolve({
          statusCode: 400,
          message: "This post does not exist"
        });
      }
      if(like == 1){
        resolve({
          statusCode: 200,
          message: "Post was liked"
        });
      } else {  
        resolve({
          statusCode: 400,
          message: "There was an error liking this post"
        });
      }if(comment == "Nice song"){
        resolve({
          statusCode: 200,
          message: "Comment was posted"
        });
      } else {
        resolve({
          statusCode: 400,
          message: "There was an error posting your comment"
        });
      }if(report == 1){
        resolve({
          statusCode: 200,
          message: "Post was reported"
        });
      } else {
        resolve({
          statusCode: 400,
          message: "There was an error reporting this post"
        });
      }
      resolve({
        statusCode: 404,
        message: "Something went wrong"
      });
    });
  }