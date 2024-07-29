const express = require("express");
const fs = require("fs");
const router = express.Router();
const TODOS_FILE = "./data/todos.json";

// Helper functions to read and write to the JSON file
const readTodosFromFile = () => {
  const data = fs.readFileSync(TODOS_FILE);
  return JSON.parse(data);
};

const writeTodosToFile = (todos) => {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
};

// Fetch Todos
// Fetch Todos
router.get("/", (req, res) => {
  const todos = readTodosFromFile();
  const { search, date } = req.query;
  let filteredTodos = todos;

  // Filter by search term if provided
  if (search) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.title.includes(search) || todo.description.includes(search)
    );
  }

  // Filter by lastUpdate date if provided
  if (date) {
    filteredTodos = filteredTodos.filter((todo) => {
      // Check if the lastUpdate starts with the provided date
      return todo.lastUpdate.startsWith(date);
    });
  }

  res.json(filteredTodos);
});

// Add Todo
router.post("/", (req, res) => {
  const { title, description } = req.body;
  const todos = readTodosFromFile();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
    lastUpdate: new Date().toISOString(),
  };
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
});

// Update Todo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todos = readTodosFromFile();
  const index = todos.findIndex((todo) => todo.id === parseInt(id));

  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      title: title || todos[index].title,
      description: description || todos[index].description,
      completed:
        typeof completed === "boolean" ? completed : todos[index].completed,
      lastUpdate: new Date().toISOString(),
    };
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Delete Todo
router.delete("/:id", (req, res) => {
  //Route for the delete
  const { id } = req.params;
  const todos = readTodosFromFile();
  const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id));

  if (todos.length !== updatedTodos.length) {
    writeTodosToFile(updatedTodos);
    res.json({ message: "task deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Mark as Done
router.patch("/:id/done", (req, res) => {
  const { id } = req.params;
  const todos = readTodosFromFile();
  const index = todos.findIndex((todo) => todo.id === parseInt(id));

  if (index !== -1) {
    todos[index].completed = true;
    todos[index].lastUpdate = new Date().toISOString();
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

module.exports = router;
