import moment from 'moment';

/**
 * formatDate formats a date using moment.js
 * @function
 * @param {string} date The date to format
 * @returns {Date} Date
 */
export default function formatDate(date) {
  if (date) {
    return moment(date).format('ddd, MMM Do YYYY, h:mm:ss a');
  }
  return '';
}
