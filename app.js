import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import socket from './api/socket';
import apiRoutes from './api/routes';
import Batcave from './resources/components/batcave';

const app = express();
const port = process.env.PORT || 1337;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');
app.set('views', './resources/views');

const server = app.listen(port, () => {
  console.log(`Server runnifying on port ${port}`);
});

socket.listen(server);

app.get('/', (req, res) => {
  const markup = ReactDOMServer.renderToString(<Batcave />);
  res.render('app', {markup: markup});
});

app.use('/api', apiRoutes);

export default app;
