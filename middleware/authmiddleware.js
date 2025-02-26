export function authMiddleware (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    const err = new Error('You are not authenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(401).json({ error: err.message })
    return next(err)
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
  const [userName, password] = auth

  if (userName === 'admin' && password === 'admin') {
    next()
  } else {
    const err = new Error('You are not authenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(401).json({ error: err.message })
    return next(err)
  }
}
