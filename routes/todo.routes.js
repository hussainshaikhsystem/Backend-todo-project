import express from "express";
import { createtodo, deletetodo, gettodos, gettodowithid, patchtodo, updatetodo } from "../controllers/todo.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
const route = express.Router();

route.use(authmiddleware);

route.get('/',gettodos);
route.get('/:id',gettodowithid);
route.put('/:id',updatetodo);
route.delete('/:id',deletetodo);
route.patch('/:id/complete',patchtodo);
route.post('/', createtodo)
export default route;