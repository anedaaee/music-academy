const fs = require('fs');

async function loadMessages(pool) {
    try {
        pool.getConnection((err,connection) => {
            if(err){
                throw err
            }

            connection.query(`SELECT * FROM error_messages` , (err,results)=>{
                connection.release();
                if (err) {
                    throw err;
                }
                const messages = results
                const textMessages = JSON.stringify(messages)
                fs.writeFileSync(`messages.txt`, textMessages)
            })
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = loadMessages