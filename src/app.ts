import express, { Request, Response, NextFunction } from 'express'; // kailangan install si npm i --save-dev @types/express
// const express = require('express'); // pana javascript to

// import { json } from 'body-parser';

// this is added after run ng build
import path = require('path');
//----------------------------------
import cors = require('cors');
import Bodyparser from 'body-parser';
import http = require('http');
import https = require('https');
import fs = require('fs');
import * as util from 'util';

// const options:cors.CorsOptions = {
//   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: http://192.168.0.100/,
//   preflightContinue: false
// };

import todoRoutesLando from './routes/todos';

const http_port: number = 7000;
const https_port: number = 7001;

const app = express();

app.use(
	Bodyparser.urlencoded({
		extended: true
	})
);

app.use(Bodyparser.json());
app.use(cors());


// this is added after run ng build
app.use('/', express.static(path.join(__dirname,'project1')));
app.use('/listcourses', express.static(path.join(__dirname,'project1')));
app.use('/customers', express.static(path.join(__dirname,'project1')));
app.use('/remarks', express.static(path.join(__dirname,'project1')));
app.use('/todos', todoRoutesLando);

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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
	{
		key: fs.readFileSync('key.pem', 'utf8'),
		cert: fs.readFileSync('cert.pem', 'utf8')
	},
	app
);

httpServer.listen(http_port, () => {
	console.log(`HTTP Server running on port ${http_port}`);
});

httpsServer.listen(https_port, () => {
	console.log(`HTTPS Server running on port ${https_port}`);
});
