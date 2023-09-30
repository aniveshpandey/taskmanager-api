'use strict';
class Task {
   static priorityLevels = {
    low: "low",
    medium: "medium",
    high: "high"
  };
  //Declaring the constructor
  constructor(title = "Default Task" , description = "Description of task", category = "default-category", priority = Task.priorityLevels.low, completed = false)  {
    this.title = title;
    this.description = description;
    this.category = category;
    this.priority = priority;
    this.completed = completed;
    this.creationDate = new Date();
  }
} 

class TaskManager {
  constructor() {
    this.map = new Map();
  }
 // Private methods to return errors with task ID
  _errorIdExists(id) {
    if (this.isTaskId(id)) {
      throw new Error(`Task with ID ${id} already exists`);
    }
  }
  _errorIdMissing(id) {
    if (!this.isTaskId(id)) {
      throw new Error(`Task with ID ${id} does not exist`);
    }
  }
  _errorNoTask() {
    if (this.map.size === 0) {
      throw new Error(`No tasks in the map`);
    }
  }
  // Check if a task with a given ID exists
  isTaskId(id) {
    if (!id) throw new Error(`Invalid id ${id}`);
    return this.map.has(id);
  }
  // Create a new task with a given ID
  createTask(id, task) {
    this._errorIdExists(id);
    this.map.set(id, task);
  }
  // Read a task with a given ID
  readTask(id) {
    this._errorIdMissing(id);
    return this.map.get(id);
  }
  // Update a task with a given ID
  updateTask(id, task) {
    this._errorIdMissing(id);
    this.map.set(id, task);
  }   
  // Delete a task with a given ID
  deleteTask(id) {
    this._errorIdMissing(id);
    this.map.delete(id);
  }
  // Read all tasks
  readAllTasks() {
    this._errorNoTask();
    const taskArray = [];
    this.map.forEach((value, key) => taskArray.push({ key, value }));
    return taskArray;
  }
  // Delete all tasks
  deleteAllTasks() {
    this._errorNoTask();
    this.map.clear();
  }
}

  function taskFromJSON (obj){
  if (!obj) return new Task();
  const { title, description, category, priority, completed } = obj;
  return new Task (title, description, category, priority, completed);
  };



const _compareDateAscending = (task1, task2) => {
  return (task1.creationDate < task2.creationDate)? -1 : 1;
 };
const _compareDateDescending = (task1, task2) => {
  return (task1.creationDate > task2.creationDate)? -1 : 1;
  };

function  sortByDate (taskArray, order = 'asc') {
  if (order == 'asc' ){
    taskArray.sort(_compareDateAscending);
  } else if (order == 'desc') {
    taskArray.sort(_compareDateDescending);
    } else throw new Error('Invalid sort order');
  }

module.exports  = {Task, TaskManager, taskFromJSON, sortByDate};
