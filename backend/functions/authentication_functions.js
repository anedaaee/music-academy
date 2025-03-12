const jsonwebtoken = require('jsonwebtoken');
const config = require('../functions/config')

async function issueJWT(user) {
  try{  
    const expiresIn = '7d';
    const payload = {
      sub: {
        user : user 
      },
      iat: Date.now() / 1000,
    };

    const signedToken = await jsonwebtoken.sign(payload, config().APP_JWT_SECRET, { expiresIn: expiresIn});

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn,
      iat: payload.iat
    }
  }catch(err){
    throw err
  }
}
module.exports.issueJWT = issueJWT;