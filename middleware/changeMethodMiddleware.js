export function overrideMethod (req, res, next) {
  if (req.body.hasOwnProperty('_method')) {
    req.method = req.body._method
  }

  next()
}
