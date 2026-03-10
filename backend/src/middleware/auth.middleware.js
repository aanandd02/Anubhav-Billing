function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  const isApiRequest =
    req.originalUrl.startsWith('/api/') ||
    req.baseUrl === '/api' ||
    req.path.startsWith('/api');

  if (isApiRequest) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { requireAuth };
