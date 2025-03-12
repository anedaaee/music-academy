const request = require('../db/request')

exports.get_classes = async (req,values) => {
    try{
        let query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE teacher=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                AND teacher=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                AND teacher=?;`
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
                AND teacher=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?
                    AND teacher=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?
                    AND teacher=?;`
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
        WHERE teacher=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                AND teacher=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                AND teacher=?;`
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
        AND teacher=?;`

        if(values.only_finished && !values.only_not_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=1
                    AND id=?
                    AND teacher=?;`
        }else if(values.only_not_finished && !values.only_finished){
            query = `SELECT id,CONCAT(t.name ,' ',t.last_name)  as teacher_name,CONCAT(t_2.name,' ',t_2.last_name) as student_name, teacher, student, session_price, week_day, houre, duration, session_left, absence_left, is_finish, is_payed, teacherـpercentage
                FROM music_academy.music_class c
                INNER JOIN music_academy.user_profile t
                ON c.teacher = t.username
                INNER JOIN music_academy.user_profile t_2
                ON c.student = t_2.username
                WHERE is_finish=0
                    AND id=?
                    AND teacher=?;`
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

exports.get_salary_report = async (req,values) => {
    try{
        await check_role(req,req.user.username,2)
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
                    req.user.username,values.start_date,values.finish_date,
                    req.user.username,values.start_date,values.finish_date,
                    req.user.username,values.start_date,values.finish_date,
                    req.user.username,values.start_date,values.finish_date,
                    req.user.username,values.start_date,values.finish_date,
                    req.user.username
                ],
                req
        )
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