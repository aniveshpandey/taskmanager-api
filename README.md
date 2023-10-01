# TaskManager App

The TaskManager app is a simple Express.js-based application for managing tasks. It allows you to create, read, update, and delete tasks, as well as sort tasks by date.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager.git


2.Navigate to the project directory and run the following commands:

```bash
    cd taskmanager-api/
    npm install
    node start src/server.js
```

The TaskManager app should now be running on http://localhost:3000.

## Endpoints

### Get All Tasks

Retrieve all tasks. Optionally, you can specify a sort order using the sort query parameter.

    URL: /tasks
    Method: GET
    Query Parameters:
        sort (optional): Sort tasks by date ("asc" or "desc").

### Get Task by ID

Retrieve a task by its ID.

    URL: /tasks/:id
    Method: GET
    URL Parameters:
        id: The ID of the task.

### Create Task

Create a new task.

    URL: /tasks
    Method: POST
    Request Body: JSON object with task properties.
    Example Request Body:

    json

    {
      "id": "unique-task-id",
      "title": "Task Title",
      "description": "Task Description",
      "category": "Task Category",
      "priority": "low",
      "completed": false
    }

### Update Task by ID

Update an existing task by its ID.

    URL: /tasks/:id
    Method: PUT
    URL Parameters:
        id: The ID of the task.
    Request Body: JSON object with updated task properties.

### Delete Task by ID

Delete a task by its ID.

    URL: /tasks/:id
    Method: DELETE
    URL Parameters:
        id: The ID of the task.

### Delete All Tasks

Delete all tasks.

    URL: /tasks
    Method: DELETE

### Filter Tasks By Priority

3 options: low, medium high

    URL: /tasks/priority/:level
    Method: GET
### Filter Tasks By Category

    URL: /tasks/category/:tag
    Method: GET
### Filter Tasks By Completion

    URL: /tasks?completed=true
         /tasks?completed=false
    Method: GET

## Usage

You can use this application to manage tasks, sort tasks by date, and perform CRUD (Create, Read, Update, Delete) operations on tasks.

## Contributing

Contributions are welcome! If you have any suggestions or find issues, please feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    This app is built with Express.js and npm packages like express-validator.
    Thank you to all contributors and open-source libraries used in this project.
