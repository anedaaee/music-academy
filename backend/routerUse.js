const passport = require('passport')
require('./middleware/passport')(passport)

const authRouter = require('./routers/authentication.service')

const adminGaurd = require('./middleware/adminGaurd')
const representativeGaurd = require('./middleware/representativeGaurd')
const admitGaurd = require('./middleware/admitGaurd')
const activeGaurd = require('./middleware/activeGaurd')

exports.app_use = (app) => {
    app.use('/api/v1/auth' , authRouter)
}