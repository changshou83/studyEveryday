import l from '../../testTools/l.mjs';
import objArrEqual from '../../testTools/objArrEqual.mjs';
import { ascend, sortWith } from '../sortWith.mjs';

var list = [
  {
    firstName: 'Nikau',
    lastName: 'R.',
    country: 'New Zealand',
    continent: 'Oceania',
    age: 39,
    language: 'Ruby',
  },
  {
    firstName: 'Precious',
    lastName: 'G.',
    country: 'South Africa',
    continent: 'Africa',
    age: 22,
    language: 'JavaScript',
  },
  {
    firstName: 'Maria',
    lastName: 'S.',
    country: 'Peru',
    continent: 'Americas',
    age: 30,
    language: 'C',
  },
  {
    firstName: 'Agustin',
    lastName: 'V.',
    country: 'Uruguay',
    continent: 'Americas',
    age: 19,
    language: 'JavaScript',
  },
];

var answer = [
  {
    firstName: 'Maria',
    lastName: 'S.',
    country: 'Peru',
    continent: 'Americas',
    age: 30,
    language: 'C',
  },
  {
    firstName: 'Agustin',
    lastName: 'V.',
    country: 'Uruguay',
    continent: 'Americas',
    age: 19,
    language: 'JavaScript',
  },
  {
    firstName: 'Precious',
    lastName: 'G.',
    country: 'South Africa',
    continent: 'Africa',
    age: 22,
    language: 'JavaScript',
  },
  {
    firstName: 'Nikau',
    lastName: 'R.',
    country: 'New Zealand',
    continent: 'Oceania',
    age: 39,
    language: 'Ruby',
  },
];

l('待排序：', list);
l('\n答案', answer);
l(
  '比对结果：',
  objArrEqual(sortWith([ascend('language'), ascend('firstName')], list), answer)
);
