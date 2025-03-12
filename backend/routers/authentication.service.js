const express = require('express')
const Joi = require('joi')
const authCtrl = require('../controllers/authentication.controller')
const router = new express.Router()
const responseMessage = require('../functions/readMessage')

router.post('/register',async(req,res) => {
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
router.post('/login', async (req, res) => {
    try{

        const schema = Joi.object({
            username: Joi.string()
                .required(),
            password: Joi.string()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&()])[A-Za-z\d@$!%*#?&()]{8,}$/),
        })
    
        const value = await schema.validateAsync(req.body)
           
        const result = await authCtrl.login(req,value)

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
            if(err.details[0].path[0] === 'phone_number') { message = responseMessage(8)}
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

router.get('/get-all-roles', async (req, res) => {
    try{   
        const roles = await authCtrl.getRoles(req)

        res.status(200).send({
            "metadata": responseMessage(1),
            "body":{
                "type":"array",
                "data":roles
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