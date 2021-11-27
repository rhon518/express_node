"use strict";
// kaparehas lang to ni RequestHandler
// import { Request, Response, NextFunction } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
var todos_1 = require("../models/todos");
var TODOS = [];
// POST ---------------------------------------------
exports.createTodo = function (req, res, next) {
    // puro any kasi naka defined dito kapag tutok mo si mouse
    // const text = req.body.text;
    // ok to para maging string talaga
    var text = req.body.text;
    var newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo,
    });
    //  note mag post ka muna para magkaron lang ang si TODOS[];
};
// GET ---------------------------------------------
exports.getTodo = function (req, res, next) {
    res.json({ todos: TODOS });
};
// PATCH ---------------------------------------------
exports.updateTodo = function (req, res, next) {
    // any kasi naging type nito kaya dapat may
    // lagay ng <{id: string}> sa tabi RequestHandler
    // const todoId = req.params.id;
    var todoId = req.params.id; // so ngayon string na ang type nito
    var updateText = req.body.text;
    var todoIndex = TODOS.findIndex(function (todo) { return todo.id === todoId; });
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new todos_1.Todo(TODOS[todoIndex].id, updateText);
    res.json({ message: 'Updated!', updateTodo: TODOS[todoIndex] });
};
// DELETE ---------------------------------------------
exports.deleteTodo = function (req, res, next) {
    var todoId = req.params.id;
    var todoIndex = TODOS.findIndex(function (todo) { return todo.id === todoId; });
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo Deleted!' });
};
// SAMPLE NI LANDO ---------------------------------------------
exports.ViewTodo = function (req, res, next) {
    res.json({ todos: TODOS });
};
