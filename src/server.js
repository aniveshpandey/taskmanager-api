'use strict'
const express = require('express');
const app = express();
const port = 3000;
const { checkSchema } = require('express-validator');
const { taskSchema, idBodySchema, idParamSchema, prioritySchema, tagSchema} = require('./schema.js')
const { Handler } = require('./controller.js')
const h = new Handler();
app.use(express.json());

app.get('/tasks', h.getTasks);
app.get('/tasks/:id', h.getTaskId);  
app.post('/tasks',checkSchema(taskSchema), checkSchema(idBodySchema), h.postTask);
app.put('/tasks/:id', checkSchema(taskSchema), checkSchema(idParamSchema), h.putTask);
app.delete('/tasks/:id', h.deleteTask);
app.delete('/tasks', h.deleteTasksAll);
app.get('/tasks/priority/:level', checkSchema(prioritySchema), h.getTaskPriorityLevel); 
app.get('/tasks/category/:tag', checkSchema(tagSchema), h.getTaskCategoryTag);

app.listen(port, () => {
  console.log(`TaskManager app listening on port ${port}`);
});
