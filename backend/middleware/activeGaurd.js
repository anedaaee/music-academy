const config = require('../functions/config')
const request = require('../db/request')
const CustomError = require('../functions/customError')
const responseMessage = require('../functions/readMessage')

const activeGaurd = async(req,res,next) => {
    try{
        let query = `SELECT is_active  
            FROM ${config().APP_DB_NAME}.user_profile WHERE username=?;`
        const user = await request(query,[req.user.username],req)
        if (user[0].is_active == true){
            next()
        }else{
            throw new CustomError('You do not have permission to access',responseMessage(17))
        }
    }catch(err){
        let message = responseMessage(5)
        if(err.isCustom){
            message = err.reason
        }
        res.status(403).json({
            "metadata":message
        })
    }
}

module.exports = activeGaurd