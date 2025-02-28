# bms-server

## API Documentation

### Departments

- **GET /departments** - Retrieve all departments.
- **POST /departments** - Create a new department.
- **GET /departments/:id** - Retrieve a department by its ID.
- **PUT /departments/:id** - Update a department by its ID.
- **DELETE /departments/:id** - Delete a department by its ID.

### Projects

- **GET /projects** - Retrieve all projects.
- **POST /projects** - Create a new project.
- **GET /projects/:id** - Retrieve a project by its ID.
- **PUT /projects/:id** - Update a project by its ID.
- **DELETE /projects/:id** - Delete a project by its ID.

### Users

- **GET /users** - Retrieve all users.
- **POST /users** - Register a new user.
- **GET /users/:id** - Retrieve a user by their ID.
- **PUT /users/:id** - Update a user's information.
- **DELETE /users/:id** - Delete a user.

### Authentication

- **POST /auth/login** - Authenticate a user and return a token.
- **POST /auth/register** - Register a new user and return a token.