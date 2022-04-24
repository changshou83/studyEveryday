import Watcher from './Watcher.mjs';
import { rename } from 'fs';

const watchDir = 'watch';
const processedDir = 'done';
const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', file => {
  const watchFile = `${watcher.watchDir}/${file}`;
  const processedFile = `${watcher.processedDir}/${file.toLocaleLowerCase()}`;
  rename(watchFile, processedFile, err => {
    if (err) throw err;
  });
});

watcher.start();
