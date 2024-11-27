// 'use strict';

// import path from 'path';
// import { createServer } from 'http';
// import { fileURLToPath } from 'url';
// import oas3Tools from 'oas3-tools';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const serverPort = process.env.PORT || 8080;

// // swaggerRouter configuration
// const options = {
//     routing: {
//         controllers: path.join(__dirname, './controllers')
//     },
// };

// const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
// const app = expressAppConfig.getApp();

// // Define a simple route for the root URL
// // app.get('/', (req, res) => {
// //   res.send('Hello, world!');
// // });

// // Initialize the Swagger middleware
// createServer(app).listen(serverPort, function () {
//     console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
//     console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
// });

// export default app;
//-------------------------------------------------------
'use strict';

import path from 'path';
import http from 'http';
import oas3Tools from 'oas3-tools';
const __dirname = "/opt/render/project/src";
var serverPort = 8080;
// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

export default app;

//-------------------------------------------------------
// const express = require('express');
// const app = express();

// // Use the environment's PORT variable or default to 3000
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//-------------------------------------------------------
// import "dotenv/config";

// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import http from "node:http";

// import express from "express";
// import morgan from "morgan";
// import compression from "compression";
// import favicon from "serve-favicon";
// import cors from "cors";
// import chalk from "chalk";
// import Sentry from "@sentry/node";
// import helmet from "helmet";

// import routes from "./src/routes/index.js";
// import { setServerTimeout } from "./src/middleware/index.js";
// import { init } from "./src/utils/index.js";

// const { NODE_ENV, PORT } = process.env;

// Sentry.init({ enabled: NODE_ENV === "production" });

// // Initialize mongoDB connection
// init();

// const app = express();
// const server = http.Server(app);

// app.use(Sentry.Handlers.requestHandler());

// app.use(helmet({
// 	crossOriginResourcePolicy: false,
// }));
// app.use(setServerTimeout(2 * 60 * 1000));
// if (NODE_ENV === "development") app.use(morgan("dev", { skip: (req) => req.method === "OPTIONS" }));
// app.use(cors({ credentials: true, origin: true }));
// app.use(compression());
// app.use(express.json({ limit: "1mb" }));
// app.use((req, _, next) => { req.body ||= {}; next(); });
// app.use(express.urlencoded({ extended: true, limit: "5mb" }));
// app.use(favicon(path.join(path.dirname(fileURLToPath(import.meta.url)), "src", "assets", "images", "favicon.ico")));

// app.use("/api", routes);
// app.all("/*", (_, res) => res.json({ body: "Render deployed!" }));

// app.use(Sentry.Handlers.errorHandler());

// const port = PORT || 3000;
// server.listen(port, () => NODE_ENV !== "test" && console.log(chalk.bold.cyan(`>>> Live at http://localhost:${port}`)));

// export default app;
