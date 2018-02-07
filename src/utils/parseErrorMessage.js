const logger = require('./logger').getLogger('utils/fabric/parseErrorMessage');

const INVOKE_REGEX = /^.*?Calling\s+chaincode\s+Invoke\(\)\s+returned\s+error\s+response\s+(.*)\..*?$/i;

module.exports = function parseErrorMessage(message) {
    try {
        if (INVOKE_REGEX.test(message)) {
            const match = message.match(INVOKE_REGEX)[1];
            const errorResponse = JSON.parse(match);
            return Array.isArray(errorResponse) ? errorResponse[0] : errorResponse;
        }
    } catch (e) {
        logger.error(`Unable to parse error details from error: ${message}.`);
    }

    return message;
};
