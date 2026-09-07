import express from "express";
import cors from "cors";
import todoroutes from "./routes/todo.routes.js";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import { errorhandler } from "./middlewares/error.middleware.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectdb();
app.use("/", todoroutes);
app.use(errorhandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running");
});
