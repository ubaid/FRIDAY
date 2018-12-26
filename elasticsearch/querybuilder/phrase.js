module.exports.getQueryBody = function(field, phrase) {
  const body = {
    query: {
      match_phrase: {
        [field]: phrase,
      },
    },
  };

  return body;
};
