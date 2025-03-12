const passport = require('passport')
require('./middleware/passport')(passport)

const authRouter = require('./routers/authentication.service')
const adminRouter = require('./routers/admin.service')

const adminGaurd = require('./middleware/adminGaurd')
const teacherGaurd = require('./middleware/teacherGaurd')
const activeGaurd = require('./middleware/activeGaurd')

exports.app_use = (app) => {
    app.use('/api/v1/auth' , authRouter)
    app.use('/api/v1/admin',passport.authenticate('jwt',{session:false}),adminGaurd,adminRouter)
}