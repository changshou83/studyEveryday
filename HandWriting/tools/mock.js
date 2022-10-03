const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const Strategies = {
  'Number': (rule, value) => {
    const isSelfIncrement = rule.startsWith('+');
    let result;
    if(isSelfIncrement) {
      const step = rule.slice(1);
      return value + step;
    } else {
      const [integer, radix] = rule.split('.');
      const [min, max] = integer.split('-');
      result = random(min, max);
      if(radix) result += Math.random().toFixed(radix);
    }
    
    return result;
  },
  'Boolean': (rule, value) => {
    if(rule === '1') return Math.random() > 0.5 ? value : !value;
    else if(rule === '2') return value;
  },
  'Array': (rule, value) => {
    const result = [];
    if(typeof value === 'object' && value !== null) {
      for(let i = 0; i < rule; i++) result.push(parseTemplate(value[0]));
    } else {
      const usedPos = [];
      for(let i = 0; i < rule && i < value.length; i++) {
        let pos = random(0, value.length - 1);
        while(usedPos.includes(pos)) pos = random(0, value.length - 1);
        usedPos.push(pos);
        result.push(value[pos]);
      }
    }
    return result;
  },
  'Placeholder': (rule, value) => {
    const Placeholders = {};
    const isCall = value.match(/@([a-zA-Z0-9]+)\((.*)\)/);
    let name = value.slice(1), params;
    let result;

    if(isCall) {
      name = isCall[1];
      params = isCall[2].split(',').map(v => v.trim())
    }
    if(Placeholders[name]) result = Placeholders[name](params);

    return result;
  },
};

function parseTemplate(template = {}) {
  const result = {};
  Object.entries(template).forEach(([k, v]) => {
    const [name, rule] = k.split('|');
    const type = v.startsWith('@') ? 'Placeholder' : Object.prototype.toString.call(v).slice(8, -1);
    result[name] = Strategies[type](rule, v);
  })

  return result;
}
