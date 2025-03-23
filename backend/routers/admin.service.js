const express = require('express')
const Joi = require('joi')
const adminCtrl = require('../controllers/admin.controller')
const router = new express.Router()
const responseMessage = require('../functions/readMessage')


router.post('/register-user', async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required(),
            password: Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.register(req,values)
        delete result.password
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
            if(err.details[0].path[0] === 'password') { message = responseMessage(9)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.patch('/update-user', async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required(),
            role: Joi.number()
                .optional()
                .allow(null),
            name: Joi.string()
                .optional()
                .allow(null)
                .empty(''),
            last_name: Joi.string()
                .optional()
                .allow(null)
                .empty(''),
            mobile: Joi.string()
                .optional()
                .allow(null)
                .empty(''),
            phone: Joi.string()
                .optional()
                .allow(null)
                .empty(''),
            email:Joi.string()
                .email()
                .optional()
                .allow(null)
                .empty(''),
            address:Joi.string()
                .optional()
                .allow(null)
                .empty(''),
            national_id:Joi.string()
                .optional()
                .allow(null)
                .empty('')
        })

        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.update_user(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        console.log(err);
        
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
            if(err.details[0].path[0] === 'role') { message = responseMessage(18)}
            if(err.details[0].path[0] === 'name') { message = responseMessage(10)}
            if(err.details[0].path[0] === 'last_name') { message = responseMessage(11)}
            if(err.details[0].path[0] === 'mobile') { message = responseMessage(12)}
            if(err.details[0].path[0] === 'phone') { message = responseMessage(13)}
            if(err.details[0].path[0] === 'email') { message = responseMessage(14)}
            if(err.details[0].path[0] === 'address') { message = responseMessage(15)}
            if(err.details[0].path[0] === 'national_id') { message = responseMessage(16)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.post('/add-profile', async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required(),
        })
        
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.add_profile(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-profile', async(req,res) => {
    try{
        const schema = Joi.object({
            id: Joi.number()
                .required(),
        })

        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_profile(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result[0]
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(46)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.delete('/delete-user', async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required()
        })

        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.delete_user(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.patch('/refactore-user', async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required()
        })

        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.refactore_user(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-users',async(req,res) => {
    try{
        const result = await adminCtrl.get_users(req)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-users/deleted',async(req,res) => {
    try{
        const result = await adminCtrl.get_deleted_users(req)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-users/none-deleted',async(req,res) => {
    try{
        const result = await adminCtrl.get_none_deleted_users(req)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-user',async(req,res) => {
    try{
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(16)
                .required()
        })

        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_user(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result[0]
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(8)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-users/with-role',async(req,res) => {
    try{
        const schema = Joi.object({
            role : Joi.number().required()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_users_with_role(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'role') { message = responseMessage(18)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.post('/add-class',async(req,res) => {
    try{
        const schema = Joi.object({
            teacher : Joi.string()
                .required(),
            student : Joi.string()
                .required(),
            session_price : Joi.number()
                .required(),
            week_day : Joi.string()
                .required(),
            houre : Joi.string()
                .required(),
            duration: Joi.string()
                .required(),
            session_left: Joi.number()
                .required(),
            absence_left: Joi.number()
                .required(),
            is_payed : Joi.boolean()
                .required(),
            teacherـpercentage : Joi.number()
                .required()
        })
        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.add_class(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'teacher') { message = responseMessage(19)}
            if(err.details[0].path[0] === 'student') { message = responseMessage(20)}
            if(err.details[0].path[0] === 'session_price') { message = responseMessage(21)}
            if(err.details[0].path[0] === 'week_day') { message = responseMessage(22)}
            if(err.details[0].path[0] === 'houre') { message = responseMessage(23)}
            if(err.details[0].path[0] === 'duration') { message = responseMessage(24)}
            if(err.details[0].path[0] === 'session_left') { message = responseMessage(25)}
            if(err.details[0].path[0] === 'absence_left') { message = responseMessage(26)}
            if(err.details[0].path[0] === 'is_payed') { message = responseMessage(27)}
            if(err.details[0].path[0] === 'teacherـpercentage') { message = responseMessage(28)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.patch('/update-class',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .required(),
            teacher : Joi.string()
                .required(),
            student : Joi.string()
                .required(),
            session_price : Joi.number()
                .required(),
            week_day : Joi.string()
                .required(),
            houre : Joi.string()
                .required(),
            duration: Joi.string()
                .required(),
            session_left: Joi.number()
                .required(),
            absence_left: Joi.number()
                .required(),
            is_payed : Joi.boolean()
                .required(),
            teacherـpercentage : Joi.number()
                .required()
        })
        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.update_class(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(31)}
            if(err.details[0].path[0] === 'teacher') { message = responseMessage(19)}
            if(err.details[0].path[0] === 'student') { message = responseMessage(20)}
            if(err.details[0].path[0] === 'session_price') { message = responseMessage(21)}
            if(err.details[0].path[0] === 'week_day') { message = responseMessage(22)}
            if(err.details[0].path[0] === 'houre') { message = responseMessage(23)}
            if(err.details[0].path[0] === 'duration') { message = responseMessage(24)}
            if(err.details[0].path[0] === 'session_left') { message = responseMessage(25)}
            if(err.details[0].path[0] === 'absence_left') { message = responseMessage(26)}
            if(err.details[0].path[0] === 'is_payed') { message = responseMessage(27)}
            if(err.details[0].path[0] === 'teacherـpercentage') { message = responseMessage(28)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.delete('/delete-class',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .required()
        })
        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.delete_class(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.patch('/refactore-class',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .required()
        })
        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.refactore_class(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get_classes',async(req,res) => {
    try{
        const schema = Joi.object({
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_classes(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'only_finished') { message = responseMessage(35)}
            if(err.details[0].path[0] === 'only_not_finished') { message = responseMessage(35)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get_class',async(req,res) => {
    try{
        const schema = Joi.object({
            class_id : Joi.number()
                .required(),
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_class(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result[0]
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'class_id') { message = responseMessage(33)}
            if(err.details[0].path[0] === 'only_finished') { message = responseMessage(35)}
            if(err.details[0].path[0] === 'only_not_finished') { message = responseMessage(35)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.post('/add-session',async(req,res) => {
    try{
        const valid_status = ['presence','valid_absence','invalid_absence']
        const schema = Joi.object({
            class_id : Joi.number()
                .required(),
            status : Joi.string()
                .valid(...valid_status)
                .required(),
            description : Joi.string()
                .optional(),
            session_date : Joi.date()
                .required(),
        })
        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.add_session(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'class_id') { message = responseMessage(33)}
            if(err.details[0].path[0] === 'status') { message = responseMessage(37)}
            if(err.details[0].path[0] === 'description') { message = responseMessage(39)}
            if(err.details[0].path[0] === 'session_date') { message = responseMessage(40)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.delete('/delete-session',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .required()
        })
        const values = await schema.validateAsync(req.body)
        await adminCtrl.delete_session(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1)
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(36)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-classes-sessions',async(req,res) => {
    try{
        const schema = Joi.object({
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_classes_session(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'only_finished') { message = responseMessage(35)}
            if(err.details[0].path[0] === 'only_not_finished') { message = responseMessage(35)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-class-sessions',async(req,res) => {
    try{
        const schema = Joi.object({
            class_id : Joi.number()
                .required(),
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_class_session(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'class_id') { message = responseMessage(33)}
            if(err.details[0].path[0] === 'only_finished') { message = responseMessage(35)}
            if(err.details[0].path[0] === 'only_not_finished') { message = responseMessage(35)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})

router.get('/get-salary-report',async(req,res) => {
    try{
        const schema = Joi.object({
            teacher : Joi.string()
                .required(),
            start_date : Joi.date()
                .optional(),
            finish_date : Joi.date()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await adminCtrl.get_salary_report(req,values)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(5)
        if(err.details) {
            if(err.details[0].path[0] === 'teacher') { message = responseMessage(42)}
            if(err.details[0].path[0] === 'start_date') { message = responseMessage(43)}
            if(err.details[0].path[0] === 'finish_date') { message = responseMessage(44)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })

    }
})
module.exports = router
