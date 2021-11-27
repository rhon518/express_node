"use strict";
// kaparehas lang to ni RequestHandler
// import { Request, Response, NextFunction } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
var todos_1 = require("../models/todos");
var TODOS = [];
// POST ---------------------------------------------
exports.createTodo = function (req, res, next) {
    var todoText = req.body.text;
    var todoUpdate = new todos_1.Todo(Math.random().toString(), todoText);
    TODOS.push(todoUpdate);
    res.status(201).json({
        message: 'Created',
        Todo: todoUpdate
    });
};
// GET ---------------------------------------------
exports.getTodo = function (req, res, next) {
    res.status(201).json({
        // message: 'All records',
        // Todo: TODOS
        TODOS: TODOS
    });
};
// PATCH ---------------------------------------------
exports.updateTodo = function (req, res, next) {
    var todoIndex = req.params.id;
    var todoText = req.body.text;
    var todoUpdate = TODOS.findIndex(function (t) { return t.id === todoIndex; });
    if (todoUpdate < 0) {
        throw new Error('Updated');
    }
    TODOS[todoUpdate] = new todos_1.Todo(TODOS[todoUpdate].id, todoText);
    res.status(201).json({
        message: 'Updated',
        Todo: TODOS[todoUpdate]
    });
};
// DELETE ---------------------------------------------
exports.deleteTodo = function (req, res, next) {
    var todoIndex = req.params.id;
    var todoUpdate = TODOS.findIndex(function (t) { return t.id === todoIndex; });
    if (todoUpdate < 0) {
        throw new Error('Na removed na');
    }
    TODOS.splice(todoUpdate, 1);
    res.status(201).json({
        message: 'Deleted',
        Todo: TODOS[todoUpdate]
    });
};
// DELETE ALL ---------------------------------------------
exports.clearTodo = function (req, res, next) {
    // delay();
    TODOS.length = 0;
    res.status(201).json({
        message: 'All records',
        Todo: TODOS
    });
};
// function deleteClear(): Promise<number> {
// 	return new Promise((resolve) => {
// 		TODOS.length = 0;
// 		resolve(123);
// 		return 1;
// 	});
// }
// async function delay(): Promise<void> {
// 	await deleteClear();
// }
// SAMPLE NI LANDO ---------------------------------------------
exports.ViewTodo = function (req, res, next) {
    res.json({ todos: TODOS });
};
