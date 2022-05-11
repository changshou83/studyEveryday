const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const english = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const ENGLISH = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const numAndengAndENG = num.concat(english).concat(ENGLISH);

const getRandom = (min, max) => parseInt(Math.random() * (max - min + 1) + min);

export default function passwordGen() {
  const getLength = getRandom(6, 20);
  let randomNumAndengAndENG = `${num[getRandom(0, 9)]}${
    english[getRandom(0, 25)]
  }${ENGLISH[getRandom(0, 25)]}`;

  for (var i = 0; i < getLength - 3; i++) {
    var getRandomNumAndengAndENG = parseInt(Math.random() * 62);
    randomNumAndengAndENG += numAndengAndENG[getRandomNumAndengAndENG];
  }

  return randomNumAndengAndENG;
}
