// 'use strict';

// var path = require('path');
// var http = require('http');

// var oas3Tools = require('oas3-tools');
// var serverPort = 8080;

// // swaggerRouter configuration
// var options = {
//     routing: {
//         controllers: path.join(__dirname, './controllers')
//     },
// };

// var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
// var app = expressAppConfig.getApp();

// // Initialize the Swagger middleware
// http.createServer(app).listen(serverPort, function () {
//     console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
//     console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
// });

//  const express = require('express');
//  const app = express();

// // Use the environment's PORT variable or default to 3000
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express from "express"; // Import express library

// const app = express(); // Create an express app/server
// const PORT = 3000; // Port number in which the server will run

// app.use(express.json()); // Middleware to parse JSON data (in POST requests)
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (in POST requests)

// /*
//     Define a route handler for the default route with GET method
//     which sends "Hello world!" as the response
//     Try with:
//     - {GET} http://localhost:3000/
// */
// app.get("/", (req, res) => {
//     return res.send("Hello world!");
// });

// /*
//     Define a route handler for the '/hello' route with GET method
//     which sends "Hello World from another route!" as the response
//     Try with:
//     - {GET} http://localhost:3000/hello
// */
// app.get('/hello', function(req, res){
//     res.send("Hello World from another route!");
// });

// /*
//     Define a route handler for the '/hello' route with POST method
//     which sends "You just called the post method at '/hello'!" as the response
//     Try with:
//     - {POST} http://localhost:3000/hello
// */
// app.post('/hello', function(req, res){
//     res.send("You just called the post method at '/hello'!\n");
// });

// /*
//     Define a route handler for the '/test' route with any method
//     which sends "HTTP method doesn't have any effect on this route!" as the response
//     Try with:
//     - {GET, POST, PUT, DELETE} http://localhost:3000/test
// */
// app.all('/test', function(req, res){
//     res.send("HTTP method doesn't have any effect on this route!");
// });

// /*
//     Define a route handler for the '/:id' route with GET method
//     which sends the id specified in the URL as the response
//     Try with:
//     - {GET} http://localhost:3000/123
// */
// app.get('/:id', function(req, res){
//     res.send('The id you specified is ' + req.params.id);
// });

// /*
//     Define a route handler for all routes which are not defined
//     which sends "Sorry, this is an invalid URL." as the response
//     Try with:
//     - {GET} http://localhost:3000/invalid
// */
// app.get('*', function(req, res){
//     res.send('Sorry, this is an invalid URL.');
// });

// // Start the server on the specified port
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})