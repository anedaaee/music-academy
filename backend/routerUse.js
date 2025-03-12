const passport = require('passport')
require('./middleware/passport')(passport)

const authRouter = require('./routers/authentication.service')
const adminRouter = require('./routers/admin.service')
const userRouter = require('./routers/user.service')
const teacherRouter = require('./routers/teacher.service')

const adminGaurd = require('./middleware/adminGaurd')
const teacherGaurd = require('./middleware/teacherGaurd')
const activeGaurd = require('./middleware/activeGaurd')

exports.app_use = (app) => {
    app.use('/api/v1/auth' , authRouter)
    app.use('/api/v1/user',passport.authenticate('jwt',{session:false}),userRouter)
    app.use('/api/v1/teacher',passport.authenticate('jwt',{session:false}),activeGaurd,teacherGaurd,teacherRouter)
    app.use('/api/v1/admin',passport.authenticate('jwt',{session:false}),activeGaurd,adminGaurd,adminRouter)
}