// kaparehas lang to ni RequestHandler
// import { Request, Response, NextFunction } from 'express';

import { RequestHandler } from 'express';
import { Todo } from '../models/todos';
import { text } from 'body-parser';
import { resolve } from 'dns';

let TODOS: Todo[] = [];

// POST ---------------------------------------------
// GET ----------------------------------------------
// PATCH --------------------------------------------
// DELETE -------------------------------------------
// DELETE ALL ---------------------------------------
// SAMPLE NI LANDO ----------------------------------



// POST ---------------------------------------------
export const createTodo: RequestHandler = (req, res, next) => {
	const todoText = (req.body as {text: string}).text;
	const todoUpdate = new Todo(Math.random().toString(), todoText);

	TODOS.push(todoUpdate);

	res.status(201).json({
		message: 'Created',
		Todo: todoUpdate
	});

  console.log('test sre1')
	console.log(`POST = todoText: ${todoText}, todoUpdate: ${todoUpdate.id}  ${todoUpdate.text}`)
};
// GET ----------------------------------------------
export const getTodo: RequestHandler = (req, res, next) => {
	res.status(201).json({
		TODOS
	});

	TODOS.forEach(element => {
		console.log(`GET = TODOS: ${element.id}`)
	});
};
// PATCH --------------------------------------------
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoIndex = req.params.id;
	const todoText = (req.body as {text: string}).text;
	const todoUpdate = TODOS.findIndex(t => t.id === todoIndex);

	if (todoUpdate < 0) {
		throw new Error("Updated");
	}

	TODOS[todoUpdate] = new Todo(TODOS[todoUpdate].id, todoText);

	res.status(201).json({
		message: 'Updated',
		Todo: TODOS[todoUpdate]
	});

	console.log(`PATCH = todoIndex: ${todoIndex}, todoText: ${todoText}, todoUpdate: ${todoUpdate}, TODOS[todoUpdate]: ${TODOS[todoUpdate]}`)


};
// DELETE -------------------------------------------
export const deleteTodo: RequestHandler = (req, res, next) => {
	const todoIndex = req.params.id;
	const todoUpdate = TODOS.findIndex(t => t.id === todoIndex);

	if (todoUpdate < 0) {
		throw new Error("Na removed na!!!");
	}

	TODOS.splice(todoUpdate, 1);

	res.status(201).json({
		message: 'Deleted',
		Todo: TODOS[todoUpdate]
	});

	console.log(`DELETE = todoIndex: ${todoIndex}, todoUpdate: ${todoUpdate}, TODOS[todoUpdate]: ${TODOS[todoUpdate]}`)

};

// DELETE ALL ---------------------------------------
export const clearTodo: RequestHandler = (req, res, next) => {
	// delay();
	TODOS.length = 0;
	res.status(201).json({
		message: 'All records are deleted!',
		Todo: TODOS
	});
};
// SAMPLE NI LANDO ----------------------------------
export const ViewTodo: RequestHandler = (req, res, next) => {
	res.json({ todos: TODOS });
};



