import express from "express";
import { createtodo, deletetodo, gettodos, gettodowithid, patchtodo, updatetodo } from "../controllers/todo.controller.js";
const route = express.Router();

route.get('/todo',gettodos);
route.get('/todo/:id',gettodowithid);
route.put('/todo/:id',updatetodo);
route.delete('/todo/:id',deletetodo);
route.patch('/todo/:id/complete',patchtodo);
route.post('/todo', createtodo)
export default route;