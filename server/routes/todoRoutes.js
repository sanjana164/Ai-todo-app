import express from 'express';
import { addTask, getTasks, deleteTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', addTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

export default router;
