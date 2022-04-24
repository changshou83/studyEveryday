import { EventEmitter } from 'events';
import { createServer } from 'net';

const channel = new EventEmitter();

channel.clients = {};
channel.subscriptions = {};

// 监听
channel.on('join', (id, client) => {
  channel.clients[id] = client;
  channel.subscriptions[id] = (senderId, msg) => {
    if (senderId != id)
      channel.clients[id].write(`\n${senderId.split(':')[1]}:${msg}`);
    if (senderId == id) channel.clients[senderId].write(`\nMe: ${msg}`);
  };
  channel.on('broadcast', channel.subscriptions[id]);
  channel.emit('welcome', id);
});
// 欢迎
channel.on('welcome', id => {
  Object.values(channel.clients).forEach(client => {
    client.write(
      `Welcome! ${id} 
    Guests online: ${channel.listeners('broadcast').length} \n`
    );
  });
});
// 离开
channel.on('leave', id => {
  channel.removeListener('broadcast', channel.subscriptions[id]);
  channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

// 触发
const server = createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  let words = [];
  channel.emit('join', id, client);
  client.on('data', msg => {
    msg = msg.toString();
    if (msg.charCodeAt() != 13) {
      words.push(msg);
      return;
    }
    channel.emit('broadcast', id, words.join(''));
    words = [];
  });
  client.on('close', isClose => {
    channel.emit('leave', id);
  });
});

server.listen(8008, '127.0.0.1');
