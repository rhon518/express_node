import { Router } from 'express';

import {
	createTodo,
	getTodo,
	updateTodo,
	deleteTodo,
	clearTodo
	// ViewTodo,
} from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodo);

// router.get('/lando', ViewTodo);

router.patch('/:id', updateTodo);

router.delete('/cleartodo', clearTodo);

router.delete('/:id', deleteTodo);

export default router;
