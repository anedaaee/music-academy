const config = require('../functions/config')
const request = require('../db/request')
const bcrypt = require('bcryptjs')
const CustomError = require('../functions/customError')
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


exports.update_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                            SET ${`role`}=?, name=?, last_name=?, mobile=?, phone=?, email=?, address=?, national_id=?
                            WHERE username=?;  `
        await request(query, [values.role,values.name,values.last_name,values.mobile,values.phone,values.email,values.address,values.national_id,values.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)

        return user[0]

    }catch(err){throw err}
}

exports.delete_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                SET is_active=0
                WHERE username=?;`

        await request(query,[values.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)

        return user[0]
        
    }catch(err){throw err}
}

exports.refactore_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                SET is_active=1
                WHERE username=?;`

        await request(query,[values.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)

        return user[0]
        
    }catch(err){throw err}
}

exports.get_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile;`

        return await request(query,[],req)
    }catch(err){throw err}
} 

exports.get_deleted_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE is_active = 0;`

        return await request(query,[],req)
    }catch(err){throw err}
} 

exports.get_none_deleted_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE is_active = 1;`

        return await request(query,[],req)
    }catch(err){throw err}
} 