import todoModel from "../models/todo.model.js";
import mongoose from "mongoose";
import { asynchandler } from "../middlewares/asynchandler.js";
// create todo
export const createtodo = asynchandler (async (req, res) => {
  
    const { title, description, iscompleted } = req.body;
    const todo = await todoModel.create({ title, description, iscompleted , user: req.userId});

    res.status(201).json({ message: "task added successfully", todo });
  
});

// get todos
export const gettodos = asynchandler(async (req, res) => {

    // Query param
    const { search, sort, page = 1, limit = 10 } = req.query;
    // Base query
    let query = {user: req.userId};

    // search by title
    if(search){
      query.title = {$regex: search, $options: "i"}
    }

    // sorting
    let sortoption = {};
    if(sort === 'asc'){
      sortoption.createdAt = 1
    }else{
      sortoption.createdAt = -1;
    }

    // pagination
    const skip = (page - 1) * limit;
    const todos = await todoModel.find(query)
    .sort(sortoption)
    .skip(skip)
    .limit(parseInt(limit));

    const totaltodos = await todoModel.countDocuments(query);
    return res.status(200).json({
      success: true,
      message: 'todos fetched succesfully',
      total: totaltodos,
      page: Number(page),
      limit: Number(limit),
      data: todos
    })

})

// get todo with id
export const gettodowithid = asynchandler(async (req, res, next) => {

    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: 'invalid todo id'
      })
    }
  
    const todo = await todoModel.findOne({ _id: id, user: req.userId });
    if (!todo) {
      const error = new Error("there is no todo with this specific id in db");
  error.statuscode = 404;
  return next(error);
    }
    res.json({ message: " todo fethced successfully", todo });
  
})

// put api
export const updatetodo = asynchandler(   async (req, res, next) => {

    const {title, description, iscompleted}= req.body;
    const id = req.params.id;
    const updatedtodo = await todoModel.findOneAndUpdate({ _id: id, user: req.userId },{ title, description, iscompleted }, {
      new: true,
      runValidators: true,
    });
    if (!updatedtodo) {
      const error = new Error("there is no todo with this specific id in db");
      error.statuscode = 404;
      return next(error);
    }
    res.json({ message: " todo updated successfully", updatedtodo });
  
})
// patch api
export const patchtodo = asynchandler(    async (req, res, next) => {

    const id = req.params.id;
    const todo = await todoModel.findOne({ _id: id, user: req.userId });
    if (!todo) {
      const error = new Error("there is no todo with this specific id in db");
      error.statuscode = 404;
      return next(error);
    }

    todo.iscompleted = !todo.iscompleted;
    await todo.save();

    res.json({ message: " status updated", todo });
  
})
// delte api
export const deletetodo = asynchandler(async (req, res, next) => {
 
    const id = req.params.id;
    const deletetodo = await todoModel.findOneAndDelete({ _id: id, user: req.userId });
    if (!deletetodo) {
      const error = new Error("there is no todo with this specific id in db");
      error.statuscode = 404;
      return next(error);
    }
    res.json({ message: " todo deleted successfully", deletetodo });
  
})
