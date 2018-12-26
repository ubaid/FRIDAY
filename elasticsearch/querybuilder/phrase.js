module.exports.getQueryBody = (field, phrase) => {
  return {
    query: {
      match_phrase: {
        [field]: phrase,
      },
    },
  };
};
