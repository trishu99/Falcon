/**
 * capitalise title cases words and if the word is <= 3 it makes them all uppercase
 * @function
 * @param {string} sourceKey The news source id
 * @returns {string} string
 */
export default function capitalise(sourceKey) {
  return sourceKey.split('-')
    .map((word) => {
      if (word.length <= 3) {
        if (word.toLowerCase() === 'the') {
          return word[0].toUpperCase() + word.substr(1);
        }
        return word.substr(0, word.length).toUpperCase() + word.substr(word.length + 1);
      }
      return word.charAt(0).toUpperCase() + word.substr(1);
    })
    .join(' ');
}
