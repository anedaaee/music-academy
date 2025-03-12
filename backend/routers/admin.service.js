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
        const result = await authCtrl.register(req,values)
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

module.exports = router
