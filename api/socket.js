import io from 'socket.io';

export default {
  listen: function(server) {
    this.io = io.listen(server);
    return this.io;
  }
};
