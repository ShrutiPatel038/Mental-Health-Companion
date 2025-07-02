// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken'

export function authenticateUser(req, res, next) {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded // this sets req.user.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}
