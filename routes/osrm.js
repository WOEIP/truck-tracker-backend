'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const OSRMService = require('../lib/osrm.js');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const osrm = new Router();

osrm.get('/', async ctx => {
  ctx.body = 'OSRM route!';
});

osrm.get('/getroute/:coordinates', parsers.json, async ctx => {
  if(ctx.isAuthenticated()) {
    let resp = await OSRMService.getRoute(ctx.params.coordinates);
    if(resp) {
      ctx.status = 200;
      ctx.body = resp;
    } else {
      ctx.status = 503;
      ctx.body = "OSRM routing unsuccessful";
    }

  }
});


module.exports = osrm;
