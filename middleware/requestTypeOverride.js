var url = require('url');

function requestTypeOverride (req, res, next) {
  var urlExtIsJson   = url.parse(req.url).pathname.match(/\.json$/)
    , qsFormatIsJson = 'json' === req.query.format;

  if (qsFormatIsJson || urlExtIsJson) {
    req.headers.accept = 'application/json'
    // strip '.json' extension so that it don't get parsed into req.params
    if (urlExtIsJson) { req.url = req.url.replace(/\.json$/, ''); }
  }
  next();
}

module.exports = requestTypeOverride;
