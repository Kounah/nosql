// const os = require('os');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const MarkdownIt = require('markdown-it');
const mime = require('mime');
const filesize = require('filesize');

/**
 * does a simple template thing in html style
 * @param {String} content
 * @param {Object} data
 */
function htmlTemplate(content, data) {
  let result = content;
  Object.keys(data).forEach(key => {
    result = result.split(`<!--{{${key}}}-->`).join(data[key]);
  });
  return result;
}

let app = express();

let md = new MarkdownIt('commonmark', {
  html: true,
  linkify: true,
  langPrefix: 'language-',
});

handlebars.registerHelper('md', function(p, options) {
  let _p = path.join(__dirname, p);
  if(fs.existsSync(_p)) {
    // .split('<ul>').join('<ul class="browser-default">')

    let c = md.render(fs.readFileSync(_p).toString('utf8'));

    if(typeof options.hash['replace'] == 'string') {
      options.hash['replace'].split('|').forEach(o => {
        let _ = o.split(':');
        if(_.length == 2) {
          c = c.split(_[0]).join(_[1]);
        }
      });
    }

    return htmlTemplate(fs.readFileSync(path.join(__dirname, './html/mdwrapper.html')).toString('utf8'), {
      content: c
    });
  } return htmlTemplate(fs.readFileSync('./html/notfound.html').toString('utf8'), {
    name: p
  });
});

handlebars.registerHelper('json', function(o, replacer, space) {
  return(JSON.stringify(o, replacer, space));
});

handlebars.registerHelper('eachfile', (p, ...args) => {
  /**@type {Handlebars.HelperOptions} */
  let options = args.pop();
  return fs.readdirSync(path.join(__dirname, p))
    .map(f => {
      let stats = fs.statSync(path.join(__dirname, p, f));
      let type = Object.getOwnPropertyNames(fs.Stats.prototype)
        .filter(n => typeof fs.Stats.prototype[n] === 'function' && n.startsWith('is'))
        .filter(n => fs.Stats.prototype[n].call(stats))
        .map(n => n.substring(2, n.length))
        .join(', ');

      return options.fn({
        webPath: path.posix.join(p, f),
        localPath: path.join(__dirname, p, f),
        stats,
        type,
        name: f
      });
    })
    .join('\n');
});

handlebars.registerHelper('ifEquals', function (...args) {
  /**@type {Handlebars.HelperOptions} */
  let options = args.pop();
  if(args[0] === args[1]) {
    return options.fn(this);
  } else return options.inverse(this);
});

handlebars.registerHelper('eachpathseg', (p, ...args) => {
  /**@type {Handlebars.HelperOptions} */
  let options = args.pop();
  /**@type {String} */
  let s = p.split(path.sep);
  return s.map((sub, i) => options.fn({
    current: sub,
    path: path.posix.join('/', ...s.slice(0, i + 1).map(part => console.log(part) || part))
  })).join('\n');
});

handlebars.registerHelper('filesize', (size) => {
  return filesize(size);
});

app.engine('hbs', exphbs({
  extname: 'hbs',
  partialsDir: 'partials',
  handlebars: handlebars,
  defaultLayout: undefined
}));

app.set('view engine', 'hbs');

app.use('/*', bodyParser.urlencoded({
  type: 'application/x-www-form-urlencoded',
  extended: true,
  limit: '40mb'
}));

app.use('/api/*', bodyParser.json({
  type: 'application/json',
  limit: '40mb'
}));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/jquery/*', (req, res) => {
  let p = path.join(__dirname, './node_modules/jquery/dist', path.relative('/jquery', req.path));
  if(fs.existsSync(p)) {
    res.status(200)
      .set('content-type', mime.getType(p))
      .sendFile(p);
  } else res.sendStatus(404);
});

app.get('/presentation', (req, res) => {
  res.render('presentation', {
    disableContainers: true
  });
});

app.get('/*', (req, res) => {
  let p = path.join(__dirname, path.relative('/', req.path));
  if(fs.existsSync(p)) {
    let s = fs.statSync(p);

    if(s.isDirectory()) {
      res.render('directory', {
        path: req.path
      });
    } else if(s.isFile()) {
      if(path.parse(p).ext == '.md') {
        res.render('md', {
          documentTitle: `${path.parse(p).name} | markdown`,
          path: (req.path)
        });
      } else {
        res.status(200)
          .set('content-type', mime.getType(p))
          .sendFile(p);
      }
    }
  } else res.sendStatus(404);
});


let port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});