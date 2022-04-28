export default function isNumeric(value) {
  return !isNaN(value - parseFloat(value));
}
