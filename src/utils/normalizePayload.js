const _ = require('lodash');

module.exports = function normalizePayload(value) {
    if (_.isDate(value)) {

        return value.getTime();
    } else if (_.isString(value)) {

        return value;
    } else if (_.isArray(value)) {

        return _.map(value, (v) => {

            return normalizePayload(v);
        });
    } else if (_.isObject(value)) {

        return _.mapValues(value, (v) => {

            return normalizePayload(v);
        });
    }

    return value;
};
