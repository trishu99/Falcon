/**
 * capitalise: title/book cases the word
 * @function
 * @param {string} word The word to title case
 * @return {string} string
 */
const capitalise = word => word[0].toUpperCase() + word.substr(1);

/**
 * createOptions: creates the sort options
 * @function
 * @param {Array} sortByOptions The list of available sort options
 * @return {Array} Array
 */
const createOptions = (sortByOptions) => {
  const options = [];

  if (sortByOptions.length > 1) {
    sortByOptions.forEach((option, index) => {
      if (index === 0) {
        options.push({
          key: option,
          icon: 'line chart',
          text: capitalise(option),
          value: option,
          content: capitalise(option),
        });
      } else {
        options.push({
          key: option,
          icon: 'newspaper',
          text: capitalise(option),
          value: option,
          content: capitalise(option),
        });
      }
    });
  } else {
    const option = sortByOptions[0];
    options.push({
      key: option,
      icon: 'line chart',
      text: capitalise(option),
      value: option,
      content: capitalise(option),
    });
  }

  return options;
};

export default createOptions;
