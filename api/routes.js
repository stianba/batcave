import express from 'express';
import socket from './socket';
import moment from 'moment';
import uuid from 'node-uuid';
import {slogans, currentSlogan} from './slogans';
const router = express.Router();

router.get('/slogan', (req, res) => {
  res.json(slogans);
});

router.post('/slogan', (req, res) => {
  if (!req.body.text) return res.json({code: 'error'});
  if (!req.body.poster) return res.json({code: 'error'});

  currentSlogan.id = uuid.v1();
  currentSlogan.text = req.body.text;
  currentSlogan.poster = req.body.poster;
  currentSlogan.time = moment();
  currentSlogan.lastLocked = currentSlogan.time;
  currentSlogan.lockedUntil = moment(currentSlogan.lastLocked).add(10, 's');
  slogans.push(currentSlogan);
  socket.io.emit('new', currentSlogan);
  res.json(currentSlogan);
});

router.get('/currentSlogan', (req, res) => {
  res.json(currentSlogan);
});

router.post('/currentSlogan/lock', (req, res) => {
  if (moment(moment()).isBefore(currentSlogan.lockedUntil)) {
    return res.json({code: 'error', 'message': 'Is already locked.'});
  }

  currentSlogan.lastLocked = moment();
  currentSlogan.lockedUntil = moment(currentSlogan.lastLocked).add(10, 's');
  socket.io.emit('lock', {lockedUntil: currentSlogan.lockedUntil});
  res.json({
    code: 'success',
    lockedUntil: currentSlogan.lockedUntil,
    lastLocked: currentSlogan.lastLocked
  });
});

router.get('/leaderboards', (req, res) => {

});

export default router;
