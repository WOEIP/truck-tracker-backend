# Backend

### Requirements

 - Node.js >= 7.4.0
 - PostgresSQL server

### Getting Started

  1. Make sure all of the [requirements](#Requirements) are installed and running on your computer.
  2. Provide the database connection information to the application. This can be done one of two ways
      - Create a `development.json` in `config/secret` and populate it with the your connection information:
        ```json
        {
          "database": {
            "user": "postgres",
            "password": "yourpasswordhere"
          }
        }
        ```
      - Create environment variables (as specified in `config/index.js`) to store your credentials. Ideally these should be placed in your `.bashrc` or `.profile` so you don't have to set them up every time. <br> *Tip*: if you set up your environment variables this way [`psql` will also pick them up](https://www.postgresql.org/docs/9.2/static/libpq-envars.html), so you don't have to provide all of the arguments every time you run the command.
     ```bash
      # PostgresSQL Credentials
      export PGHOST="localhost"
      export PGUSER="postgres"
      export PGPASSWORD="yourpasswordhere"
      ```
  3. Create the `traffic_counter` table in postgres. Replace "yourpasswordhere" with your actual database password and the command below should create the database for you. <br> *Note*: depending on your installation you might have to change the name of the user as well
      ```bash
      PGPASSWORD="yourpasswordhere" psql --host localhost --user postgres --dbname postgres --command "CREATE DATABASE traffic_counter;"
      ```
  4. Install all of the dependencies for this project by running `npm install` <br> *Note*: This and the following commands must be run within the `backend` directory
      ```bash
      npm install
      ```

  5. Run the migrations to set up the database as required by the application.
      ```bash
      npx knex migrate:latest
      ```

  6. Start coding! :tada:


## Technologies
### Server
- [`Koa`](http://koajs.com/#introduction): Web framework that takes care of some of the heavy lifting associated with writing a web application
  - [`koa-router`](https://github.com/alexmingoia/koa-router#readme): Router for requests to the backend, allows for attaching "handler" functions based on router and method matched
  - [`koa-static`](https://github.com/koajs/static#readme): A static file server, allows for specification of a folder and then all files out of that folder will be served
- [`convict`](https://github.com/mozilla/node-convict#readme): schema derived config management tool, configuration parameters can be specified via `.json` files, environment variables and via command-line arguments
- [`nodemon`](https://github.com/remy/nodemon#nodemon): nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
- [`kenx`](http://knexjs.org) : SQL query builder, allows for the usage of a javascript api to write SQL queries
  - [`objection`](http://vincit.github.io/objection.js/): Object relation mapper (ORM) that sits on top of Knex, introduces the concept of Models

### Testing
- [`ava`](https://github.com/avajs/ava#readme): Test runner with built-in assertions
    - responsible for executing all of the test files and then reporting the final result of passing or failing
    - the [built-in assertion library](https://github.com/avajs/ava#assertions) allows for easy validation of test results
- [`testdouble`](https://github.com/testdouble/testdouble.js#readme): library that helps with creating mocks and stubbing out dependencies for testing
    - [Simple intro video to library and dependency mocking](http://blog.testdouble.com/posts/2016-06-05-happier-tdd-with-testdouble-js)

## Organization
```
├── config
│   ├── development.json
│   ├── index.js
│   └── production.json
├── index.js
├── knexfile.js
├── lib
│   └── knex.js
├── package.json
└── test
    └── index.js
```
- `config`: contains the configuration schema as well as defaults for production and development
  - `development.json`: default config parameters for the development environment
  - `index.js`: specifies the configuration schema and exports the populated config object
  - `production.json`: default config parameters for the production environment
  - `secret`: allows for secret (password, tokens, etc.)  default configuration parameters to be specified per environment, this folder is ignored by git and should not be checked in to version control
    - `development.json`: secret config parameters for the development environment
    - `production.json`: secret config parameters for the production environment
- `index.js`: main application entry point, starts the web server if invoked directly by node
- `knexfile.js`: used by knex to pick up database connection settings
- `lib`: all helper/"library" files that contain utilities that are used by other parts of the application
  - `knex.js`: initializes the database connection using knex
- `package.json`: specifies information about the project as well as a list of dependencies for production as well as development. [interactive guide to package.json](http://browsenpm.org/package.json)
- `test`: stores all test files, should have the same structure as the root of the repository
