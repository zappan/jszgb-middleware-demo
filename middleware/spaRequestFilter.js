function spaRequestFilter (req, res, next) {
  var isJsonRequest = (/application\/json/).test(req.headers.accept);
  if (!isJsonRequest) {
    return res.render('index')
  }
  next();
}

module.exports = spaRequestFilter;
