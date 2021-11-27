"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // kailangan install si npm i --save-dev @types/express
// const express = require('express'); // pana javascript to
var body_parser_1 = require("body-parser");
var todos_1 = __importDefault(require("./routes/todos"));
var port = 7000;
var app = express_1.default();
app.use(body_parser_1.json());
app.use('/todos', todos_1.default);
// app.use((err, req, res, next) => { // mag eerror to kapag ganito lang
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
console.log("http://localhost:" + port);
app.listen(port);
