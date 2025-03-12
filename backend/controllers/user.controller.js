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
