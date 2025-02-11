const prisma = require('../config/prisma');

exports.getAllUsers = async (req, res) =>
{
    console.log("hello")
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(401).json({ message: 'You are not authorized', success: false });
        }

        const users = await prisma.user.findMany({
            where: { role: 'USER' },
        });
        console.log(users)
        return res.status(200).json({
            message: "Successfully retrieved all users",
            users,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred",
            success: false
        });
    }
};
