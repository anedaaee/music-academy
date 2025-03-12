const express = require('express')
const Joi = require('joi')
const adminCtrl = require('../controllers/admin.controller')
const router = new express.Router()
const responseMessage = require('../functions/readMessage')


router.post('/register-user', async(req,res) => {
    try{
        console.log('hi');
        
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

module.exports = router
