function humanReadable(seconds) {
  const time = { hour: 3600, minute: 60, second: 1 },
    res = [];

  if (seconds == 0) return new Array(Object.keys(time)).fill('00').join(':');
  for (const key in time) {
    if (seconds >= time[key]) {
      const val = Math.floor(seconds / time[key]);
      res.push(val >= 10 ? val.toString() : '0' + val);
      seconds = seconds % time[key];
    } else {
      res.push('00');
    }
  }
  return res.join(':');
}

export default humanReadable;
