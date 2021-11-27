"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos_1 = require("../controllers/todos");
var router = express_1.Router();
router.post('/', todos_1.createTodo);
router.get('/', todos_1.getTodo);
// router.get('/lando', ViewTodo);
router.patch('/:id', todos_1.updateTodo);
router.delete('/cleartodo', todos_1.clearTodo);
router.delete('/:id', todos_1.deleteTodo);
exports.default = router;
