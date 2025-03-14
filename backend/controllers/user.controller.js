const request = require('../db/request')

exports.get_classes = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE student=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                AND student=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                AND student=?;`
        }

        return await request(query,[req.user.username],req)
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
                WHERE id=?
                AND student=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?
                    AND student=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?
                    AND student=?;`
        }

        return await request(query,[values.class_id,req.user.username],req)
    }catch(err){throw err}
}

exports.get_classes_session = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
        FROM music_academy.music_class c
        INNER JOIN music_academy.user_profile t
        ON c.teacher = t.username
        INNER JOIN music_academy.user_profile t_2
        ON c.student = t_2.username
        WHERE student=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                AND student=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                AND student=?;`
        }

        const classes_info = await request(query,[req.user.username],req)

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
        WHERE id=?
        AND student=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?
                    AND student=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?
                    AND student=?;`
        }

        const classes_info = await request(query,[values.class_id,req.user.username],req)
        
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

exports.update_user = async (req,values) => {
    try{
        let query = `UPDATE music_academy.user_profile
                            SET name=?, last_name=?, mobile=?, phone=?, email=?, address=?, national_id=?
                            WHERE username=?;  `
        await request(query, [values.name,values.last_name,values.mobile,values.phone,values.email,values.address,values.national_id,req.user.username],req)

        query = `SELECT username, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id
                    FROM music_academy.user_profile
                    WHERE username =?;`
        const user = await request(query,[req.user.username],req)

        return user[0]

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

exports.add_profile = async (req) => {
    try{

        await check_user_exist(req,req.user.username)
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

            await request(query,[latest_data[0].id,req.user.username],req)
            
            query = `SELECT up.username, up.is_active, up.${`role`}, up.name, up.last_name, up.mobile, up.phone, up.email, up.address, up.national_id, up.profile_picture 
                                ,pi.name as picture_name , pi.format as picture_format , pi.blob_data as picture_blob_data
                            FROM music_academy.user_profile up
                            LEFT JOIN music_academy.profile_image pi
                            ON up.profile_picture = pi.id
                            WHERE up.username=?;`

            const user_data = await request(query,[req.user.username],req)

            return user_data[0]

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

exports.who= async (req) => {
    try{
        const query = `SELECT username, password, is_active, ${`role`}, name, last_name, mobile, phone, email, address, national_id, profile_picture
                FROM music_academy.user_profile
                WHERE username=?;`

        return await request(query,[req.user.username],req)
    }catch(err){throw err}
}