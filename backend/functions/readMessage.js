const fs = require("fs")

function responseMessage(code) {
    try {
        const messages = JSON.parse(fs.readFileSync(`messages.txt`))
        const mesasge = messages.filter((v) => v.id == code)
        return mesasge[0]
    } catch (err) {
        console.log(err);
    }
}

module.exports = responseMessage