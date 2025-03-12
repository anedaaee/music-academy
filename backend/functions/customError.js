class CustomError extends Error {
    constructor(name , message) {
        super(message.err_english);
        this.name = 'CustomError';
        this.isCustom = 1;
        this.reason = message
    }
}

module.exports = CustomError