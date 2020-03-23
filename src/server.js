// import 'dotenv/config';
// import express from 'express';

// import routes from './app/routes';
// import database from './database';
require('dotenv/config');

const express = require('express');

const routes = require('./app/routes');

require('./libs/Mongoose');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('server is running');
});
