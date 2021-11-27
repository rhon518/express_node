"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // kailangan install si npm i --save-dev @types/express
// const express = require('express'); // pana javascript to
// import { json } from 'body-parser';
var cors = require("cors");
var body_parser_1 = __importDefault(require("body-parser"));
var http = require("http");
var https = require("https");
var fs = require("fs");
// const options:cors.CorsOptions = {
//   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: http://192.168.0.100/,
//   preflightContinue: false
// };
var todos_1 = __importDefault(require("./routes/todos"));
var http_port = 7000;
var https_port = 7001;
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use(cors());
app.use('/todos', todos_1.default);
// app.use((err, req, res, next) => { // mag eerror to kapag ganito lang
// app.use(
//   (err: Error, req: express.Request, res: Response, next: NextFunction) => {
//     res.status(500).json({ message: err.message });
//   }
// );
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'True');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
//   );
// });
// console.log(`http://localhost:${port}`);
// app.listen(port);
var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('cert.pem', 'utf8')
}, app);
httpServer.listen(http_port, function () {
    console.log("HTTPS Server running on port " + http_port);
});
httpsServer.listen(https_port, function () {
    console.log("HTTPS Server running on port " + https_port);
});
