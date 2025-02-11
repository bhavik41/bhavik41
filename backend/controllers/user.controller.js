const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUpController = async (req, res) =>
{
    console.log("first")
    console.log(req.body)
    const { name, email, password, role } = req.body
    console.log(name, email, password, role)

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const isExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (isExists) return res.status(400).json({ message: 'Email already exists' })

        const user = await prisma.user.create({
            data: {
                username: name,
                email,
                password: hashedPassword,
                role
            }
        })

        const { password: _, ...userWithoutPassword } = user

        return res.status(200).json({
            success: true,
            user: userWithoutPassword
        })
    } catch (error) {
        res.status(404).json({ message: error.message, success: false })
    }

}

exports.signInController = async (req, res) =>
{

    const { email, password } = req.body

    try {
        if (!email) return res.status(401).json({ message: "email is required", success: false })

        if (!password) return res.status(401).json({ message: "password is required", success: false })

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const isValidUser = bcrypt.compare(user.password, password)


        if (!isValidUser) return res.status(400).json({ message: "Invalid credential", success: false })

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1 hour' })

        const { password: _, ...userWithoutPassword } = user

        return res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        res.status(404).json({ message: error.message, success: false })
    }

}

exports.profileController = async (req, res) =>
{
    console.log(req.user)
    return res.status(200).json({
        success: true,
        user: req.user
    })
}