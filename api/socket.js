import io from 'socket.io';

export default {
  listen: function(server) {
    this.io = io.listen(server);
    this.io.on('connection', () => {
      console.log('someone connected');
    });
    return this.io;
  }
};
