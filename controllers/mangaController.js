const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;
const statuses = ['Finished', 'Releasing', 'Hiatus', 'Cancelled'];

const arraySanitizer = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

const titleLengthErr = (field, {min = 1, max}) => `${field} must be between ${min} and ${max}`;
const dateErr = (field) => `${field} must be a valid date.`;
const notInErr = 'The option selected is not among the options'

const validateManga = [
  body('title').trim()
    .isLength({ min: 1, max: 100 }).withMessage(titleLengthErr('title', {min:1, max:100})),
  
  body('description').optional({ values: 'falsy' }).trim()
    .isLength({ min: 1, max: 1000 }).withMessage(titleLengthErr('description', {min:1, max:1000})),

  body('status').trim()
    .isLength({ min: 1, max: 10 }).withMessage(titleLengthErr('status', {min:1, max:10}))
    .isIn(statuses).withMessage(notInErr),
  
  body('startdate').trim()
    .isDate().withMessage(dateErr('start date'))
    .custom((startdate, { req }) => {
      const raw = req.body.enddate;
      const status = req.body.status;

      if (!raw) {
        if (status === 'Finished' || status === 'Cancelled') {
          throw new Error('End date must be a valid date');
        }
        return true;
      }

      const enddate = (raw instanceof Date) ? raw : new Date(raw);
      if (!(enddate instanceof Date) || isNaN(enddate)) {
        throw new Error('End date must be a valid date');
      }

      const start = (startdate instanceof Date) ? startdate : new Date(startdate);
      if (start > enddate) {
        throw new Error('Start date cannot be after end date');
      }

      return true;
    }),
  
  body('enddate').optional({ values: 'falsy' }).trim()
    .isDate().withMessage(dateErr('end date'))
    .custom((enddate, { req }) => {

      const status = req.body.status;

      if (status === 'Finished' || status === 'Cancelled') {
        if (!enddate) {
          throw new Error('End date is required when status is Finished or Cancelled');
        }
      }

      if (enddate && req.body.startdate) {
        const startDate = new Date(req.body.startdate);
        const endDate = new Date(enddate);
        if (endDate < startDate) {
          throw new Error('End date cannot be before start date');
        }
      }

      const mustBeNull = ['Releasing', 'Hiatus'].includes(status);
      if (mustBeNull && enddate) {
        throw new Error('End date must be empty when status is Releasing or Hiatus');
      }

      return true;
    }),

  body('staff')
    .customSanitizer(arraySanitizer)
    .isArray().withMessage('Staff must be properly formatted'),

  body('genres')
    .customSanitizer(arraySanitizer)
    .isArray().withMessage('Genres must be properly formatted'),
];