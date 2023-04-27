import createError from 'http-errors'

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  const notLoggedInError = createError(403, 'Please log in to view this page.')
  return next(notLoggedInError)
}

export {
  passDataToView,
  isLoggedIn,
}
