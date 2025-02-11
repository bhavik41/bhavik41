const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")


exports.checkAuthMiddleware = async (req, res, next) =>
{

    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);

    if (!token) throw new Error({ message: "token required" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) res.status(401).json({ message: "Anauthorized user", success: false })

    req.userId = decoded;

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    console.log(user)

    const { password: _, ...safeUser } = user;
    console.log(safeUser)
    req.user = safeUser

    next();



}