const express = require('express')
const cors = require('cors')
const userRoutes = require('./routers/user.router')
const adminRoutes = require('./routers/admin.route')
const profileRoutes = require('./routers/profile.route')
const app = express()
const dotenv = require('dotenv')

dotenv.config();

const port = 3000

app.use(express.json())
app.use(cors())

// app.use(bodyParser.json())

app.use('/user', userRoutes);
app.use('/admin', adminRoutes)
app.use('/profile', profileRoutes)

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})