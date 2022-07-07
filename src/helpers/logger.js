const consoleColorCodes = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    fgRed: '\x1b[31m',
    fgMagenta: '\x1b[35m',
};

const logLevelToConsoleColorCode = {
    log: consoleColorCodes.bright,
    error: consoleColorCodes.fgRed,
    warn: consoleColorCodes.fgMagenta,
};

function colorString(string, logLevel) {
    return (logLevelToConsoleColorCode[logLevel] || consoleColorCodes.reset)
        + string
        + consoleColorCodes.reset;
}

const TAKE_N_FIRST_FROM_STACK = 2;
function trimError(error) {
    const errorStackAsArray = error.stack.split('\n');
    return errorStackAsArray
        .splice(0, Math.min(TAKE_N_FIRST_FROM_STACK, errorStackAsArray.length))
        .join('\n');
}

function logger(dataToLog, context = '', logLevel = 'log') {
    const timeStr = (new Date()).toJSON();

    let logStr = `[${timeStr}]:`;

    if (context) {
        logStr += ` {{ ${context} }} `;
    }

    logStr = colorString(logStr, logLevel);

    let logData = dataToLog;
    if (dataToLog instanceof Error) {
        logData = trimError(dataToLog);
    }

    console[logLevel](logStr, logData);
}

module.exports = logger;
