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
  //if(ctx.isAuthenticated()) {
    console.log(OSRMService);
    let resp = OSRMService.getRoute(ctx.params.coordinates);
    ctx.status = 200;
    ctx.body = ctx.params.coordinates;
  //}
});


module.exports = osrm;
