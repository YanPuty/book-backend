/**
 *
 * @param {string} dateString
 * @returns {Boolean}
 */
const isValidDateString = (dateString) => {
  // Try parsing the date string into a Date object
  const date = new Date(dateString);

  // Check if the parsed date is a valid date and the input string matches the parsed components
  return (
    !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString
  );
};

module.exports = { isValidDateString };
