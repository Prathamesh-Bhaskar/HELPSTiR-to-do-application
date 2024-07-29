# Todo List Application

This is a simple Todo List application built with Node.js and Express.js. It provides an API to manage a list of todo items. The application allows you to add, update, delete, mark as done, and fetch todos with optional search and date filters.

## Features

- **Fetch Todos**: Retrieve the list of todos with search and date filters.
- **Add Todo**: Add a new todo item to the list.
- **Update Todo**: Update an existing todo item.
- **Delete Todo**: Remove a todo item from the list.
- **Mark as Done**: Mark a todo item as completed.

  ## Note: Images are added in demo folder for display done using postman API tester

## Requirements

- Node.js
- npm
- express.js

## Setup and Run

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. The server will be running on `http://localhost:3000`.

### Future advancements:

## User Authentication and Authorization:

- Implement user authentication (e.g., JWT) to allow multiple users to manage their own todo lists.
- Add user roles and permissions for better access control.

## Database Integration:

- Replace the filesystem-based storage with a database (e.g., MongoDB, PostgreSQL) for better scalability and performance.
- Implement ORM/ODM (e.g., Mongoose for MongoDB, Sequelize for PostgreSQL) for easier database interactions.

## Real-time Updates:

- Use WebSockets (e.g., Socket.io) to provide real-time updates to the client whenever a todo is added, updated, or deleted.




