const noop = () => {};

/**
 * Generates a race between the promise(s) and the AbortSignal
 * @param {AbortSignal} signal
 * @param {Promise<T>} promise
 * @returns
 */
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

/**
 *
 * @param {AbortSignal} signal
 * @param {(evt: Event) => void} callback
 * @returns
 */
export const addAbortSignalListener = (signal, callback) => {
  signal.addEventListener("abort", callback, { once: true });
  return () => signal.removeEventListener("abort", callback);
};
