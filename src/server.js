const {TaskManager, taskFromJSON, sortByDate} = require('./taskmanager.js');
const tm = new TaskManager();
const express = require('express');
const app = express();
const port = 3000;
const { checkSchema, validationResult } = require('express-validator');
const { taskSchema, idBodySchema, idParamSchema} = require('./schema.js')
app.use(express.json());

app.get('/tasks', (req, res) => {
  try {
    const order = req.query.sort;
    const taskArray = tm.readAllTasks();
    if(order) sortByDate(taskArray, order);
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

app.get('/tasks/priority/:level', (req, res) => {
  try {
  } catch(err){
    res.status(400).send({error: err.message});
  }
});

app.listen(port, () => {
  console.log(`TaskManager app listening on port ${port}`);
});
