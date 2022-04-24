import net from 'net';

const server = net.createServer(socket => {
  socket.on('data', data => {
    socket.write(data);
  });
});

server.listen(8888, '127.0.0.1');
// 使用 `telnet 127.0.0.1 8888` 访问
