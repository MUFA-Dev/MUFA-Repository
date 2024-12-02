'use strict';

import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import oas3Tools from 'oas3-tools';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPort = process.env.PORT || 8080;

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Initialize the Swagger middleware
createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

export default app;

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
