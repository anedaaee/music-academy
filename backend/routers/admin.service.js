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
        res.status(201).send({
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
                .optional(),
            name: Joi.string()
                .optional(),
            last_name: Joi.string()
                .optional(),
            mobile: Joi.string()
                .optional(),
            phone: Joi.string()
                .optional(),
            email:Joi.string()
                .email()
                .optional(),
            address:Joi.string()
                .optional(),
            national_id:Joi.string()
                .optional()
        })

        const values = await schema.validateAsync(req.body)
        const result = await adminCtrl.update_user(req,values)
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
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

module.exports = router
