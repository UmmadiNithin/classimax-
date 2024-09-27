const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400,
            });
        }
        next();
    };
};

module.exports = { validate };
