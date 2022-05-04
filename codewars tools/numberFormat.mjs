export default numberFormat = function (num) {
  return (
    num &&
    num.toString().replace(/\d+/, s => s.replace(/\B(?=(\d{3})+$)/g, ','))
  );
};
