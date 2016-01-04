import express from 'express';
import socketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Batcave from './resources/components/Batcave';

const app = express();
const port = process.env.PORT || 1337;

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'jade');
app.set('views', './resources/views');

const server = app.listen(port, () => {
  console.log(`Server runnifying on port ${port}`);
});

const io = socketIO(server);

io.on('connection', socket => {
  console.log(`Someone connected`);
});

app.get('/', (req, res) => {
  const markup = ReactDOMServer.renderToString(<Batcave />);
  res.render('app', {markup: markup});
});
