const random = {
  randint: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  choice: function (...args) {
    return args[this.randint(0, args.length - 1)];
  },
};

export default random;
