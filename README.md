# Backend

## Technologies
### Server
- [`Koa`](http://koajs.com/#introduction): Web framework that takes care of some of the heavy lifting associated with writing a web application
  - [`koa-router`](https://github.com/alexmingoia/koa-router#readme): Router for requests to the backend, allows for attaching "handler" functions based on router and method matched
  - [`koa-static`](https://github.com/koajs/static#readme): A static file server, allows for specification of a folder and then all files out of that folder will be served
- [`convict`](https://github.com/mozilla/node-convict#readme): schema derived config management tool, configuration parameters can be specified via `.json` files, environment variables and via command-line arguments
- [`nodemon`](https://github.com/remy/nodemon#nodemon): nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

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
│   ├── production.json
│   └── secret
├── index.js
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
- `package.json`: specifies information about the project as well as a list of dependencies for production as well as development. [interactive guide to package.json](http://browsenpm.org/package.json)
- `test`: stores all test files, should have the same structure as the root of the repository
