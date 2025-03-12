const config = require('../functions/config')
const passportJWT = require("passport-jwt")
const appPool = require('../db/mysql')
const request = require('../db/request')
const JWTStrategy   = passportJWT.Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  config().APP_JWT_SECRET
};

const strategy = new JWTStrategy(options,async(payload , done) => {
    try{
        let today = Date.now() / 1000;
        if( today > payload.exp){
            const query = `select phone_number,role,is_active from ${config().APP_DB_NAME}.user_profile where phone_number=?;`;
            const result = await request(query,[token.user.phone_number],appPool)

            if(!result[0]){
                throw { customError: 11, statusCode: 401}
            }
            done(null,false,{message : 'token expired'});
        }else{
            done(null,payload.sub.user);
        }
    }catch(error){
        done(error,false);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
}

