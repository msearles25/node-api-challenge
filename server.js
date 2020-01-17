const express = require('express');

const projectsRouter = require('./data/helpers/projectsRouter');
const actionsRouter = require('./data/helpers/actionsRouter');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);
// server.use('/api/actions', actionsRouter);

module.exports = server;