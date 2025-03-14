const express = require('express')
const Joi = require('joi')
const userCtrl = require('../controllers/user.controller')
const router = new express.Router()
const responseMessage = require('../functions/readMessage')

router.get('/check-auth',async(req,res) => {
    try{
        res.status(200).send({
            "metadata": responseMessage(1)
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

router.get('/get_classes',async(req,res) => {
    try{
        const schema = Joi.object({
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await userCtrl.get_classes(req,values)
        
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
        const result = await userCtrl.get_class(req,values)
        
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

router.get('/get-classes-sessions',async(req,res) => {
    try{
        const schema = Joi.object({
            only_finished : Joi.boolean()
                .optional(),
            only_not_finished : Joi.boolean()
                .optional()
        })
        const values = await schema.validateAsync(req.query)
        const result = await userCtrl.get_classes_session(req,values)
        
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
        const result = await userCtrl.get_class_session(req,values)
        
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

router.patch('/update-profile', async(req,res) => {
    try{
        const schema = Joi.object({
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
        const result = await userCtrl.update_user(req,values)
        
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

        const result = await userCtrl.add_profile(req)
        
        res.status(200).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
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

router.get('/get-profile', async(req,res) => {
    try{
        const schema = Joi.object({
            id: Joi.number()
                .required(),
        })

        const values = await schema.validateAsync(req.query)
        const result = await userCtrl.get_profile(req,values)
        
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



router.get('/who', async(req,res) => {
    try{
        const result = await userCtrl.who(req)
        
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

module.exports = router