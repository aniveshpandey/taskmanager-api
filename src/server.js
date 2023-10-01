const {TaskManager, taskFromJSON, sortByDate, filterByProp} = require('./taskmanager.js');
const tm = new TaskManager();
const express = require('express');
const app = express();
const port = 3000;
const { checkSchema, validationResult } = require('express-validator');
const { taskSchema, idBodySchema, idParamSchema, prioritySchema, tagSchema} = require('./schema.js')
app.use(express.json());

app.get('/tasks', (req, res) => {
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
});

app.get('/tasks/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const responseBody = tm.readTask(taskId);
    res.status(200).send(responseBody);
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});

app.post('/tasks',checkSchema(taskSchema), checkSchema(idBodySchema),(req, res) => {
  try {
    validationResult(req).throw();
    const {id, ...task} = req.body;
    const taskObj = taskFromJSON(task); 
    tm.createTask(id, taskObj);
    res.status(200).send({message: 'task created successfully', taskId: id});
  } catch (err) {
    res.status(400).send({error: err.message|| validationResult(req).array() });
  }
});

app.put('/tasks/:id', checkSchema(taskSchema), checkSchema(idParamSchema), (req, res) => {
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
});

app.delete('/tasks/:id',(req, res) => {
  try {
    const id = req.params.id;
    tm.deleteTask(id);
    res.status(200).send({message: 'task deleted successfully', taskId: id});
  } catch(err){
    res.status(400).send({error: err.message});
  }
});

app.delete('/tasks', (req, res) => {
  try {
    tm.deleteAllTasks();
    res.status(200).send({message: 'All tasks deleted successfully'});
  } catch(err) {
    res.status(400).send({error: err.message});
  }
});

app.get('/tasks/priority/:level', checkSchema(prioritySchema), (req, res) => {
  try {
    validationResult(req).throw();
    const level = req.params.level;
    const taskArray = tm.readAllTasksWithoutId();
    const responseBody = filterByProp(taskArray, "priority" , level);
    res.status(200).send(responseBody);
  } catch(err){
    res.status(400).send({error: err.message || validationResult(req).array()});
  }
});

app.get('/tasks/category/:tag', checkSchema(tagSchema), (req, res) => {
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
});

app.listen(port, () => {
  console.log(`TaskManager app listening on port ${port}`);
});

