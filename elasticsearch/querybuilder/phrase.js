module.exports.getQueryBody = function (field, phrase) {
    let body = {
        query: {
            "match_phrase": {
                field: phrase
            }
        }
    };

    return body;
};