const express = require('express')
const Joi = require('joi')
const userCtrl = require('../controllers/user.controller')
const router = new express.Router()
const responseMessage = require('../functions/readMessage')

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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "object",
                "data": result[0]
            }
        })
    }catch(err){
        console.log(err);
        
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
        
        res.status(201).send({
            "metadata": responseMessage(1),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        console.log(err);
        
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
        
        res.status(201).send({
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

module.exports = router