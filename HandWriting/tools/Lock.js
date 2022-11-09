function createLock() {
  const task = {};
  task.callback = fn;
  task.locked = false;
  task.changeStatus = null;
  task.queue = null;

  return {
    lock() {
      task.locked = true;
      task.queue = new Promise((_res) => {
        task.changeStatus = () => {
          task.locked = !task.locked;
          _res();
        };
      });
    },
    unlock() {
      task.locked && task.changeStatus();
    },
    run(...args) {
      if (task.locked) {
        task.queue.then(() => task.callback(...args));
      } else {
        task.callback(...args);
      }
    },
  };
}

const lock = createLock((str) => console.log(str));
lock.lock();
lock.run("nihao");
lock.run("hello world");
setTimeout(() => lock.unlock(), 3000);
