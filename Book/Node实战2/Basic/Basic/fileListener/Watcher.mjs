import { readdir } from 'fs';
import { EventEmitter } from 'events';

export default class Watcher extends EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }
  watch() {
    readdir(this.watchDir, (err, files) => {
      if (err) throw err;
      for (let index in files) {
        this.emit('process', files[index]);
      }
    });
  }
  start() {
    this.watch();
  }
}
