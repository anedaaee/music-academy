const config = require('../functions/config')
const request = require('../db/request')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CustomError = require('../functions/customError')
const utils = require('../functions/authentication_functions')
const responseMessage = require('../functions/readMessage')

exports.register = async (req,values) => {
    try{
        let query = `SELECT count(username) as username_number FROM ${config().APP_DB_NAME}.user_profile WHERE username = ? ;`
        let result = await request(query , [values.username] , req)
        
        if(result[0].username_number !== 0){
            throw new CustomError('username error' , responseMessage(6))
        }

        const hashedPassword = await bcrypt.hash(values.password, 8)

        query = `INSERT INTO ${config().APP_DB_NAME}.user_profile (username , password , role) VALUES(?,?,?)`
        result = await request(query , [ values.username , hashedPassword , 1 ] , req)

        query = `SELECT * FROM ${config().APP_DB_NAME}.user_profile WHERE username = ? ;`
        result = await request(query , [values.username] , req)

        return result[0]
    }catch(err){
        throw err
    }
}

exports.login = async (req,values) => {
    try{
        let query = `SELECT count(username) as username_number FROM ${config().APP_DB_NAME}.user_profile WHERE username = ? AND is_active=1;`
        let result = await request(query , [values.username] , req)
        
        if(result[0].username_number === 0){
            throw new CustomError('username error' , responseMessage(7))
        }

        query = `SELECT * FROM ${config().APP_DB_NAME}.user_profile WHERE username = ? ;`
        result = await request(query , [values.username] , req)

        const isMatch = await bcrypt.compare(values.password, result[0].password)

        if(!isMatch){
            throw new CustomError('password error' , responseMessage(7))
        }
        
        const jwt = await utils.issueJWT(result[0]);
        let user_information = result[0]
        delete user_information.password
        
        return {
            user_information : user_information,
            token : jwt
        }
    }catch(err){throw err}
}

exports.getRoles = async (req) => {
    try{
        let query = `SELECT id, english_name, persian_name FROM ${config().APP_DB_NAME}.nikzad_db.user_role;`
        let result = await request(query , [] , req)
        return result
    }catch(err){throw err}
}


const attach_profile = async(users,req) => {

    try{
        for(const user of users){
            if(user.profile_picture){
                const query = `SELECT id, name, format, blob_data
                                FROM music_academy.profile_image
                                WHERE id =?;`
        
                const profile =  await request(query,[user.profile_picture],req)
                user.profile = profile[0]
            }
        }
        return users
    }catch(err){throw err}

}

exports.get_users_with_role = async (req,role) => {
    try{
        const query = `SELECT username, ${`role`}, name, last_name, mobile, email,profile_picture
                    FROM music_academy.user_profile 
                    WHERE ${'`role`'}=? AND is_active = 1;`        
        
        const users =  await request(query,[role],req)
        return await attach_profile(users,req)
    }catch(err){throw err}
} 