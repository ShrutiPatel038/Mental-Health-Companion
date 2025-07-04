import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt; // ✅ using cookies

  if (!token) {
    console.log("❌ No token in cookies");
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Decoded token:", decoded);
    req.user = {
  _id: decoded.userId,
  userId: decoded.userId,
  email: decoded.email,
}; // ✅ important
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
