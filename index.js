const colors = require('colors');
module.exports = function (app, logger) {
  logger = logger || console.log;

  logger('Routes:');

  const cleanRegEx = (input) => {
    var out = input || '';
    out = out.replace(/\\\//g, '/'); // escaped slashes
    out = out.replace(/\^\//g, ''); // beginning of route
    out = out.replace(/(\/\?\(\?\=\/\|\$\)\/\i)/, ''); // stack route end
    if(out.match(/^\/\?\$\/\i$/)) out = '/';
    else out = out.replace(/\/\?\$\/\i/, ''); // route end
    return out;
  };

  const replaceTokens = (path, keys) => {
    return keys.reduce((memo, key) => {
      return memo.replace('(?:([^\\/]+?))', colors.dim(`:${key.name}`));
    }, path.toString());
  };

  const mMap = {
    GET: 'GET'.green,
    POST: 'POST'.yellow,
    PUT: 'PUT'.blue,
    DELETE: 'DELETE'.red,
    PATCH: 'PATCH'.magenta,
    _ALL: 'ALL'.cyan
  };

  const printRoutes = (stack, prepend) => {
    prepend = cleanRegEx(prepend);
    stack.forEach(el => {
      if(el.route) {
        var method = Object.keys(el.route.methods)[0].toUpperCase();
        method = mMap[method] || method;
        logger(`${method}\t${prepend}${cleanRegEx(replaceTokens(el.regexp, el.keys))}`);
      } else if(el.handle && el.handle.name === 'router') {
        printRoutes(el.handle.stack, prepend + replaceTokens(el.regexp, el.keys));
      }
    });
  };

  printRoutes(app._router.stack);
};
