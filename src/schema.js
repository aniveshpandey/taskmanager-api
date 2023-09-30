const taskSchema = {
  'title': {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Title is required',
  },
  'description': {
    in: 'body',
    isLength: {
      options: { min: 0, max: 1000 },
      errorMessage: 'Description should be between 0 and 1000 characters',
    },
  },
  'category': {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Category is required',
  },
  'priority': {
    in: 'body',
    optional: true,
    custom: {
      options: (value) => {
        if (!['low', 'medium', 'high'].includes(value)) {
          throw new Error('Priority should be "low", "medium", or "high"');
        }
        return true;
      },
    },
  },
  'completed': {
    in: 'body',
    isBoolean: true,
    optional: true,
    errorMessage: 'Completed should be a boolean',
  },
};
const idParamSchema = {
  'id': {
    in: 'params',
    notEmpty: true,
    errorMessage: 'taskId in body is required for creating a task',
}};
const idBodySchema = {
  'id': {
    in: 'body',
    notEmpty: true,
    errorMessage: 'taskId in body is required for creating a task',
}}; 

module.exports = {taskSchema, idParamSchema, idBodySchema};
