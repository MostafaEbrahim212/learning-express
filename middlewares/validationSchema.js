const { body } = require('express-validator');


const validationSchema = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 3 }),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be a number'),
    ]
}



module.exports = {
    validationSchema
}