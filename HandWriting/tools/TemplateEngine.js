export function TemplateEngine (html, opts) {
  const re = /<%(.+?)%>/g,
        reExp = /(^( )?(if|else|for|switch|case|break|{|}|;))(.*)?/g;
  let code = 'with(obj) { var r = [];\n',
      cursor = 0,
      result,
      match;
  
  const addJS = line => code += (line.match(reExp) ? line + '\n' : `r.push(${line});\n`)
  const addHTML = line => code += (line != '' ? `r.push("${line.replace(/\n/g, '\\n').replace(/"/g, '\\"')}");\n` : '');
  
  while(match = re.exec(html)) {
    addHTML(html.slice(cursor, match.index));
    addJS(match[1]);
    cursor = match.index + match[0].length;
  }
  addHTML(html.slice(cursor));
  
  code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, '');
  try { result = new Function('obj', code).apply(opts, [opts]); }
  catch(err) { console.error(`'${err.message}' in \n\nCode:\n ${code}\n`); }
  return result;
}

const template = 
'My skills:' + 
'<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' + 
    '<a href="#"><%this.skills[index]%></a>' +
    '<%}%>' +
'<%} else {%>' +
    '<p>none</p>' +
'<%}%>';

console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: true
}));
