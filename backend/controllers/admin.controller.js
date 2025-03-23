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

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)
        const attached_user = await attach_profile(user,req)
        return attached_user[0]

    }catch(err){throw err}
}

const check_user_exist = async(req,username) => {
    try{
        const query = `SELECT username
                            FROM music_academy.user_profile
                            WHERE username=?;`
        
        const users = await request(query,[username],req)

        if(users.length != 1){
            throw new CustomError('Username dose not exists',responseMessage(8))
        }
    }catch(err){throw err}
}

exports.add_profile = async (req,values) => {
    try{

        await check_user_exist(req,values.username)
        
        if (req.files && req.files['image']){

            const name = req.files['image'].name.split('.')[0]
            const ext = req.files['image'].name.split('.')[req.files['image'].name.split('.').length-1]
            const data = req.files['image'].data

            let query = `INSERT INTO music_academy.profile_image
                            (name, format, blob_data)
                            VALUES(?,?,?);`
            
            await request(query,[name,ext,data],req)
            
            query = `SELECT id, name, format, blob_data
                        FROM music_academy.profile_image
                        WHERE id IN (SELECT max(id) as latest_input_id
                                                FROM music_academy.profile_image);`

            const latest_data = await request(query,[],req)

            query = `UPDATE music_academy.user_profile
                        SET profile_picture=?
                        WHERE username=?;`

            await request(query,[latest_data[0].id,values.username],req)
            
            query = `SELECT up.username, up.is_active, up.${`role`}, up.name, up.last_name, up.mobile, up.phone, up.email, up.address, up.national_id, up.profile_picture 
                                ,pi.name as picture_name , pi.format as picture_format , pi.blob_data as picture_blob_data
                            FROM music_academy.user_profile up
                            LEFT JOIN music_academy.profile_image pi
                            ON up.profile_picture = pi.id
                            WHERE up.username=?;`

            const user_data = await request(query,[values.username],req)

            const attached_user = await attach_profile(user_data,req)
            return attached_user[0]

        }else{
            throw new CustomError('Invalid profile picture',responseMessage(45))
        }
    }catch(err){throw err}
}

exports.get_profile = async (req,values) => {
    try{
        const query = `SELECT id, name, format, blob_data
                        FROM music_academy.profile_image
                        WHERE id =?;`

        return await request(query,[values.id],req)
    }catch(err){throw err}
}

exports.delete_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                SET is_active=0
                WHERE username=?;`

        await request(query,[values.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)

        const attached_user = await attach_profile(user,req)
        return attached_user[0]
        
    }catch(err){throw err}
}

exports.refactore_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                SET is_active=1
                WHERE username=?;`

        await request(query,[values.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[values.username],req)

        const attached_user = await attach_profile(user,req)
        return attached_user[0]
        
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
exports.get_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile;`

        const users =  await request(query,[],req)
        return await attach_profile(users,req)
    }catch(err){throw err}
} 

exports.get_deleted_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE is_active = 0;`

        const users =  await request(query,[],req)
        return await attach_profile(users,req)
    }catch(err){throw err}
} 

exports.get_none_deleted_users = async (req) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE is_active = 1;`

        const users =  await request(query,[],req)
        return await attach_profile(users,req)
    }catch(err){throw err}
} 

exports.get_user = async (req,values) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE username=?;`

        const users =  await request(query,[values.username],req)
        return await attach_profile(users,req)
    }catch(err){throw err}
} 

exports.get_users_with_role = async (req,values) => {
    try{
        const query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id,profile_picture
                    FROM music_academy.user_profile
                    WHERE is_active = 1 AND ${'`role`'}=?;`        
        
        const users =  await request(query,[values.role],req)
        return await attach_profile(users,req)
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

        if(class_information[0].session_left == 0){
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

exports.get_classes = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0;`
        }

        return await request(query,[],req)
    }catch(err){throw err}
}

exports.get_class = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE id=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?;`
        }

        return await request(query,[values.class_id],req)
    }catch(err){throw err}
}

const update_class_session = async(req,class_id,status) => {
    try{
        let query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[class_id],req)

        const info = {
            price:class_information[0].session_price,
            session_left:class_information[0].session_left,
            absence_left:class_information[0].absence_left,
            status:status
        }

        if(info.status == 'valid_absence'){
            if(info.absence_left == 0){
                info.session_left -= 1
                info.status = 'invalid_absence'
            }else{
                info.absence_left -= 1
                info.price = 0
            }
        }else{
            info.session_left -= 1
        }

        query = `UPDATE music_academy.music_class
                SET session_left=?, absence_left=?
                WHERE id=?;`
        await request(query,[
            info.session_left
            ,info.absence_left
            ,class_id]
        ,req)

        
        
        return info
        
    }catch(err){throw err}
}

const check_session_finish = async(req,class_id) => {
    try{
        let query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[class_id],req)

        if(class_information[0].session_left == 0){
            query = `UPDATE music_academy.music_class
                SET is_finish=?
                WHERE id=?;`
            await request(query,[true,class_id],req)
        }
    }catch(err){throw err}
}

const check_session_availablity = async(req,class_id) => {
    try{
        let query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[class_id],req)

        if(class_information[0].is_finish){
            throw new CustomError('Class hase been finished',responseMessage(41))
        }
    }catch(err){throw err}
}

exports.add_session = async (req,values) => {
    try{
        await check_session_availablity(req,values.class_id)
        const info = await update_class_session(req,values.class_id,values.status)
        await check_session_finish(req,values.class_id)
        let query = `INSERT INTO music_academy.music_session
                        (class_id, status, price, description, session_date)
                        VALUES(?, ?, ?, ?, ?);`

        await request(query,[values.class_id,info.status,info.price,values.description,values.session_date],req)
        query = `SELECT max(id) as latest_input_id
            FROM music_academy.music_session;`

        const last_input = await request(query,[],req)
        
        query = `SELECT id, class_id, status, price, description, session_date
            FROM music_academy.music_session
            WHERE id = ?;`

        const session = await request(query,[last_input[0].latest_input_id],req)
        return session[0]

    }catch(err){throw err}
}

const update_class_delete_session = async(req,session_id) => {
    try{

        let query = `SELECT id, class_id, status, price, description, session_date
            FROM music_academy.music_session
            WHERE id=?;`

        const session_information = await request(query,[session_id],req)

        query = `SELECT id, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                    FROM music_academy.music_class
                    WHERE id=?;`

        const class_information = await request(query,[session_information[0].class_id],req)

        if(session_information[0].status == 'valid_absence'){
            class_information[0].absence_left += 1
        }else{
            class_information[0].session_left +=1
        }
        query = `UPDATE music_academy.music_class
                SET session_left=?, absence_left=?
                WHERE id=?;`
        await request(query,[
            class_information[0].session_left
            ,class_information[0].absence_left
            ,session_information[0].class_id]
        ,req)
        
    }catch(err){throw err}
}

exports.delete_session = async (req,values) => {
    try{
        await update_class_delete_session(req,values.id)

        let query = `DELETE FROM music_academy.music_session
                        WHERE id=?; `

        await request(query,[values.id],req)

    }catch(err){throw err}
}

exports.get_classes_session = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class c
        INNER JOIN music_academy.user_profile t
        ON c.teacher = t.username
        INNER JOIN music_academy.user_profile t_2
        ON c.student = t_2.username;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0;`
        }

        const classes_info = await request(query,[],req)

        for(const class_info of classes_info){
            let query = `SELECT id, class_id, status, price, description, session_date
                            FROM music_academy.music_session
                            WHERE class_id=?
                            ORDER BY session_date ASC;`
            
            const session = await request(query,[class_info.id],req)

            class_info.session = session

        }

        return classes_info
    }catch(err){throw err}
}

exports.get_class_session = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class c
        INNER JOIN music_academy.user_profile t
        ON c.teacher = t.username
        INNER JOIN music_academy.user_profile t_2
        ON c.student = t_2.username
        WHERE id=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?;`
        }

        const classes_info = await request(query,[values.class_id],req)
        
        const class_info = classes_info[0]
             
        query = `SELECT id, class_id, status, price, description, session_date
                        FROM music_academy.music_session
                        WHERE class_id=?
                        ORDER BY session_date ASC;`
        
        const session = await request(query,[class_info.id],req)

        class_info.session = session

        return classes_info
    }catch(err){throw err}
}

exports.get_salary_report = async (req,values) => {
    try{
        await check_role(req,values.teacher,2)
        let query=`select c_t.class_id,c_t.class_count,c_t.total_earn,s_p.class_count as presence_count,
                                s_v_a.class_count as valid_absence_count,s_v_i.class_count as invalid_absence_count,
                                s_s.teacherـsalary,s_s.academyـsalary,s_s.is_payed,s_s.student,s_s.week_day,s_s.houre
                        FROM
                            (SELECT class_id ,COUNT(id) as class_count, SUM(price) total_earn
                            FROM music_academy.music_session s
                            WHERE class_id IN (SELECT id
                                                    FROM music_academy.music_class
                                                    WHERE teacher=?)
                            AND s.session_date >= ? AND s.session_date  <= ?
                            GROUP BY class_id) c_t
                        LEFT JOIN
                            (SELECT class_id ,COUNT(id) as class_count
                            FROM music_academy.music_session s
                            WHERE class_id IN (SELECT id
                                                    FROM music_academy.music_class
                                                    WHERE teacher=?)
                                AND s.status = 'presence'
                                AND s.session_date >= ? AND s.session_date  <= ?
                            GROUP BY class_id) s_p
                        ON c_t.class_id  = s_p.class_id
                        LEFT JOIN
                            (SELECT class_id ,COUNT(id) as class_count
                            FROM music_academy.music_session s
                            WHERE class_id IN (SELECT id
                                                    FROM music_academy.music_class
                                                    WHERE teacher=?)
                                AND s.status = 'valid_absence'
                                AND s.session_date >= ? AND s.session_date  <= ?
                            GROUP BY class_id) s_v_a
                        ON c_t.class_id  = s_v_a.class_id
                        LEFT JOIN
                            (SELECT class_id ,COUNT(id) as class_count
                            FROM music_academy.music_session s
                            WHERE class_id IN (SELECT id
                                                    FROM music_academy.music_class
                                                    WHERE teacher=?)
                                AND s.status = 'invalid_absence'
                                AND s.session_date >= ? AND s.session_date  <= ?
                            GROUP BY class_id) s_v_i
                        ON c_t.class_id  = s_v_i.class_id
                        LEFT JOIN 
                            (SELECT c.student,c.week_day,c.houre,c.is_payed,s.class_id ,s.class_count, s.total_earn , (s.total_earn * c.teacherـpercentage / 100) as teacherـsalary ,  (s.total_earn * (100 - c.teacherـpercentage) / 100) as academyـsalary
                                FROM (SELECT class_id ,COUNT(id) as class_count, SUM(price) total_earn
                                        FROM music_academy.music_session s
                                        WHERE class_id IN (SELECT id
                                                                FROM music_academy.music_class
                                                                WHERE teacher=?)
                                        AND s.session_date >= ?AND s.session_date  <= ?
                                        GROUP BY class_id) s
                                INNER JOIN (SELECT id, teacherـpercentage, is_payed,student,week_day,houre
                                        FROM music_academy.music_class
                                        WHERE teacher=? ) c
                                ON s.class_id = c.id
                            
                            ) s_s
                        ON c_t.class_id  = s_s.class_id
                        `

        return await request(query,
                [
                    values.teacher,values.start_date,values.finish_date,
                    values.teacher,values.start_date,values.finish_date,
                    values.teacher,values.start_date,values.finish_date,
                    values.teacher,values.start_date,values.finish_date,
                    values.teacher,values.start_date,values.finish_date,
                    values.teacher
                ],
                req
        )
    }catch(err){throw err}
}