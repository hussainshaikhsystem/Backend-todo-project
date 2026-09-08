import jwt from "jsonwebtoken";



const auth = async (req, res, next) => {
  console.log("VERIFYING WITH:", process.env.SECRET_KEY);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
   return res.status(400).json({ message: "disnt put token on header" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = data.id;
    next();
  } catch (err) {
   return res.status(400).json({ message: "unale to verify token", err });
  }
};
export default auth;