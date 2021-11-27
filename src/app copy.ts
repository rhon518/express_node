import express, { Request, Response, NextFunction } from 'express'; // kailangan install si npm i --save-dev @types/express
// const express = require('express'); // pana javascript to

import { json } from 'body-parser';

import todoRoutesLando from './routes/todos';

const port: number = 7000;

const app = express();

app.use(json());

app.use('/todos', todoRoutesLando);

// app.use((err, req, res, next) => { // mag eerror to kapag ganito lang
app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

console.log(`http://localhost:${port}`);
app.listen(port);
