require('dotenv').config({path:'../.env'});


const get_config = () => {
    const jsonConfig = Object.keys(process.env).reduce((acc, key) => {

        const key_splited = key.split('_')
        
        if(key_splited[0] == 'APP'){
            acc[key] = process.env[key];
        }
        return acc;
      }, {});

    return jsonConfig
}

module.exports = get_config
