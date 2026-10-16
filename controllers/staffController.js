const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;

const genders = ['Male', 'Female'];

const validateStaff = [
    body('fullname').trim()
    .isLength({ min:1, max: 255 }).withMessage('Full-name must be between 1 and 255 characters.'),
]

const validateFullyStaff = [
    body('fullname').trim()
        .isLength({ min:1, max: 255 }).withMessage('Full-name must be between 1 and 255 characters.')
        .isAlphanumeric('en-US', { ignore: ' '}).withMessage('Full-name must only contain letters and numbers.'),
    body('birth').optional({ checkFalsy: true }).isISO8601().withMessage('Birth date must be a valid date.'),
    body('gender').optional({ checkFalsy: true }).isIn(genders).withMessage('Gender must be one of the predefined options.'),
]



