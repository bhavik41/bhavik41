const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')

exports.updateProfile = async (req, res) =>
{

    const { name, email, password, newpassword } = req.body;

    const userId = req.user.id;

    try {


        console.log(userId)
        const isUserExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!isUserExists) return res.status(401).json({ message: " Anuthorized user", success: false })

        const isEmailExists = await prisma.user.findUnique({
            where: {
                email
            }
        })



        if (isEmailExists && isEmailExists.id !== userId) return res.status(400).json({ message: "Email already exists", success: false })

        const isValidPassword = await bcrypt.compare(password, isUserExists.password);
        console.log(isValidPassword)
        if (!isValidPassword) return res.status(401).json({ message: "Invalid password", success: false })

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: name,
                password: hashedPassword,
                email,
            }

        })

        const { password: _, ...safeUser } = updatedUser

        return res.status(200).json({ message: "user updated successfully", safeUser, success: true })
    } catch (error) {
        return res.status(404).json({ message: error.message, success: false })
    }

}