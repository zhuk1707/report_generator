const capitaliseWord = (word) => {
  if (typeof word === 'string' && word.length > 0) {
    return word[0].toUpperCase() + word.slice(1);
  }
  return '';
};

export default capitaliseWord