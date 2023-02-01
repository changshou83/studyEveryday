const noop = () => {};

export const raceWithSignal = (signal, promise) => {
  let cleanup = noop;
  return new Promise((resolve, reject) => {
    const notifyRejection = () => reject(new TaskAbortError(signal.reason));

    if (signal.aborted) {
      notifyRejection();
      return;
    }

    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise.finally(() => cleanup()).then(resolve, reject);
  }).finally(() => {
    cleanup = noop;
  });
};

export const addAbortSignalListener = (signal, callback) => {
  signal.addEventListener("abort", callback, { once: true });
  return () => signal.removeEventListener("abort", callback);
};
