export default isValidIP = segment =>
  /^[0-9]{1,3}$/.test(segment) &&
  (segment == 0 ? segment.length == 1 : !segment.startsWith('0')) &&
  segment >= 0 &&
  segment <= 255;
