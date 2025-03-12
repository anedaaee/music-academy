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

exports.get_user = async (req,values) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE username=?;`

        return await request(query,[values.username],req)
    }catch(err){throw err}
} 


exports.get_users_with_role = async (req,values) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE is_active = 1 AND ${'`role`'}=?;`        
        
        return await request(query,[values.role],req)
    }catch(err){throw err}
} 


const check_role = async (req,username,role) => {
    try{
        const query = `SELECT username,${`role`}
            FROM music_academy.user_profile
            WHERE username=?;`

        const teacher = await request(query,[username],req)
        if (teacher[0].role != role){
            if(role == 1){
                throw new CustomError('input user is not normal user',responseMessage(29))
            }else if(role == 2){
                throw new CustomError('input user is not teacher',responseMessage(30))
            }else if(role ==3){
                throw new CustomError('input user is not admin',responseMessage(31))
            }
        }
    }catch(err){throw err}
}

const check_confilict = async (req,teacher,week_day,houre) => {
    try{
        const query = `SELECT id
                FROM music_academy.music_class
                WHERE teacher=? 
                    AND week_day=?
                    AND houre=?
                    AND is_finish=0;`
        const classes = await request(query,[teacher,week_day,houre],req)

        if(classes.length !== 0){
            throw new CustomError('This class conflicts with another class.',responseMessage(32))
        }
    }catch(err){throw err}
}

exports.add_class = async (req,values) => {
    try{
        await check_role(req,values.teacher,2)
        await check_role(req,values.student,1)
        await check_confilict(req,values.teacher,values.week_day,values.houre)

        let query = `INSERT INTO music_academy.music_class
                (teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_payed, teacherـpercentage)
                VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        await request(query,[values.teacher
            ,values.student
            ,values.session_price
            ,values.week_day
            ,values.houre,values.duration
            ,values.session_left
            ,values.absence_left
            ,values.is_payed
            ,values.teacherـpercentage]
        ,req)

        query = `SELECT max(id) as latest_input_id 
                    FROM music_academy.music_class;`

        const last_object = await request(query,[],req)

        query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[last_object[0].latest_input_id],req)
        
        return class_information
        
    }catch(err){throw err}
}


exports.update_class = async (req,values) => {
    try{
        await check_role(req,values.teacher,2)
        await check_role(req,values.student,1)
        await check_confilict(req,values.teacher,values.week_day,values.houre)
        
        let query = `UPDATE music_academy.music_class
                SET teacher=?, student=?, session_price=?, week_day=?, houre=?, duration=?, session_left=?, absence_left=?, is_payed=?, teacherـpercentage=?
                WHERE id=?;`
        await request(query,[values.teacher
            ,values.student
            ,values.session_price
            ,values.week_day
            ,values.houre
            ,values.duration
            ,values.session_left
            ,values.absence_left
            ,values.is_payed
            ,values.teacherـpercentage
            ,values.id]
        ,req)

        query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[values.id],req)
        
        return class_information
        
    }catch(err){throw err}
}

exports.delete_class = async (req,values) => {
    try{

        let query = `UPDATE music_academy.music_class
                SET is_finish=1
                WHERE id=?;`
        await request(query,[values.id],req)

        query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class
        WHERE id=?;`

        const class_information = await request(query,[values.id],req)

        return class_information
        
    }catch(err){throw err}
}

exports.refactore_class = async (req,values) => {
    try{

        let query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class
        WHERE id=?;`

        let class_information = await request(query,[values.id],req)

        if(class_information[0].session_left == 0 && class_information[0].absence_left == 0){
            throw new CustomError('There is no available session of absence left',responseMessage(34))
        }

        await check_confilict(req,class_information[0].teacher,class_information[0].week_day,class_information[0].houre)
        
        query = `UPDATE music_academy.music_class
                SET is_finish=0
                WHERE id=?;`
        await request(query,[values.id],req)

        query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class
        WHERE id=?;`

        class_information = await request(query,[values.id],req)

        return class_information
        
    }catch(err){throw err}
}

