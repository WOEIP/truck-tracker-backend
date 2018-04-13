'use strict';

const {ValidationError} = require('objection');

const middleware = {};

/**
 * Assert that the request method is POST
 *
 * @param {Object} ctx - Koa's context object
 * @param {Function} next - function to execute next middleware
 */
middleware.validationErorHandler = async function(ctx, next) {

  try {
    await next();
  } catch (err) {

    if (!(err instanceof ValidationError)) {
      throw err;
    }

    ctx.status = err.statusCode;
    ctx.body = {
      message: err.message,
      errors: err.data,
    };

  }

};

module.exports = middleware;
