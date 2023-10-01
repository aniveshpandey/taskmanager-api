const {TaskManager, taskFromJSON, sortByDate, filterByProp} = require('./taskmanager.js');
const tm = new TaskManager();
const {validationResult} = require('express-validator');

class Handler {
  constructor() {
  }
  getTasks(req, res) {
  try {
    const order = req.query.sort;
    const completed = req.query.completed;
    let taskArray = tm.readAllTasksWithoutId();
    if(order) sortByDate(taskArray, order);
    if(completed) taskArray = filterByProp( taskArray, "completed", completed);   
    res.status(200).send({sorted: order, array: taskArray});
  } catch (err) {
    res.status(400).send( {error: err.message});
  }
}
  getTaskId(req, res) {
  try {
    const taskId = req.params.id;
    const responseBody = tm.readTask(taskId);
    res.status(200).send(responseBody);
  } catch (err) {
    res.status(400).send({error: err.message});
  }
}
  postTask(req, res)  {
  try {
    validationResult(req).throw();
    const {id, ...task} = req.body;
    const taskObj = taskFromJSON(task); 
    tm.createTask(id, taskObj);
    res.status(200).send({message: 'task created successfully', taskId: id});
  } catch (err) {
    res.status(400).send({error: err.message|| validationResult(req).array() });
  }
}
  putTask (req, res)  {
  try {
    validationResult(req).throw();
    const id = req.params.id;
    const task = req.body;
    const taskObj = taskFromJSON(task);
    tm.updateTask(id, taskObj);
    res.status(200).send({message: 'task updated successfully', taskId: id});
  } catch (err){
    res.status(400).send({error: err.message || validationResult(req).array()});
  }
}
  deleteTask(req, res)  {
  try {
    const id = req.params.id;
    tm.deleteTask(id);
    res.status(200).send({message: 'task deleted successfully', taskId: id});
  } catch(err){
    res.status(400).send({error: err.message});
  }
}
  deleteTasksAll(req, res)  {
  try {
    tm.deleteAllTasks();
    res.status(200).send({message: 'All tasks deleted successfully'});
  } catch(err) {
    res.status(400).send({error: err.message});
  }
}
  getTaskPriorityLevel(req, res)  {
  try {
    validationResult(req).throw();
    const level = req.params.level;
    const taskArray = tm.readAllTasksWithoutId();
    const responseBody = filterByProp(taskArray, "priority" , level);
    res.status(200).send(responseBody);
  } catch(err){
    res.status(400).send({error: err.message || validationResult(req).array()});
  }
}
  getTaskCategoryTag(req, res)  {
  try {
    validationResult(req).throw();
    if (!tag) throw new Error("tag error");
    const tag = req.params.tag;
    const taskArray = tm.readAllTasksWithoutId();
    const responseBody = filterByProp(taskArray, "category", tag);
    if(!responsbody) throw Error ("No ${tag} catagory exists");
    res.status(200).send(responseBody);
  } catch (err) {
    res.status(400).send({error: err.message || validationResult(req).array()});
  }
}
}
module.exports = { Handler };
