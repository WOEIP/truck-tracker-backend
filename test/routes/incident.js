'use strict';

const _ = require('lodash');
const Koa = require('koa');
const axios = require('axios');
const incito = require('incito');
const test = require('ava');

const Incident = require('../../models/incident');
const router = require('../../routes/incident');

// prettier-ignore
const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

const server = incito(app.callback());
const request = axios.create({
  baseURL: `http://localhost:${server.port}/`,
});

const UUID_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

test('GET', async t => {
  const incidents = await Promise.all(
    _.times(3, () =>
      Incident.query().insert({
        truckType: 'BOBTAIL',
        start: {
          lat: 1,
          lon: 2,
        },
        end: {
          lat: 3,
          lon: 4,
        },
        idlingDuration: 10,
        reportedAt: new Date() / /* ms -> seconds */ 1000,
      }),
    ),
  );

  const {data: res} = await request.get();

  // delete the recordds we just created
  const ids = _.map(incidents, 'id');
  await Promise.all(ids.map(id => Incident.query().deleteById(id)));

  res.forEach(incident => {
    if (!ids.includes(incident.id)) return; // ignore any records we did not create
    console.log(incident);
    t.regex(incident.id, UUID_REGEX);
    t.is(incident.truckType, 'BOBTAIL');
    t.is(incident.start.lat, 1);
    t.is(incident.start.lon, 2);
    t.is(incident.end.lat, 3);
    t.is(incident.end.lon, 4);
    t.is(incident.idlingDuration, 10);
    t.is(typeof incident.reportedAt, 'number');
    t.is(typeof incident.createdAt, 'number');
    t.is(typeof incident.updatedAt, 'number');
  });
});

test('POST', async t => {
  const {data: res} = await request.post('/', {
    truckType: 'BOBTAIL',
    start: {
      lat: 1,
      lon: 2,
    },
    end: {
      lat: 3,
      lon: 4,
    },
    idlingDuration: 10,
    reportedAt: new Date() / /* ms -> seconds */ 1000,
  });

  await Incident.query().deleteById(res.id);

  t.regex(res.id, UUID_REGEX);
  t.is(res.truckType, 'BOBTAIL');
  t.is(res.start.lat, 1);
  t.is(res.start.lon, 2);
  t.is(res.end.lat, 3);
  t.is(res.end.lon, 4);
  t.is(res.idlingDuration, 10);
  t.is(typeof res.reportedAt, 'number');
  t.is(typeof res.createdAt, 'number');
  t.is(typeof res.updatedAt, 'number');
});

test('GET :id', async t => {
  const {id} = await Incident.query().insert({
    truckType: 'BOBTAIL',
    start: {
      lat: 1,
      lon: 2,
    },
    end: {
      lat: 3,
      lon: 4,
    },
    idlingDuration: 10,
    reportedAt: new Date() / /* ms -> seconds */ 1000,
  });

  const {data: res} = await request.get(`/${id}`);
  await Incident.query().deleteById(id);

  t.regex(res.id, UUID_REGEX);
  t.is(res.truckType, 'BOBTAIL');
  t.is(res.start.lat, 1);
  t.is(res.start.lon, 2);
  t.is(res.end.lat, 3);
  t.is(res.end.lon, 4);
  t.is(res.idlingDuration, 10);
  t.is(typeof res.reportedAt, 'number');
  t.is(typeof res.createdAt, 'number');
  t.is(typeof res.updatedAt, 'number');
});
