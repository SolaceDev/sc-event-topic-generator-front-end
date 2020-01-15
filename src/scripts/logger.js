const logger = function (debugOn) {
    const warn = function warn(...text) {
        console.log(`%c${text}`, "color: yellow");
    };

    const error = function error(...text) {
        console.log(`%c${text}`, "color: red");
    };

    const data = function logData(...text) {
        console.log(`%c${text}`, "color: rgb(50, 50, 50)");
    };

    const emphasis = function logEmphasis(...text) {
        console.log(`%c${text}`, "color: rgb(0, 0, 0)");
    };

    const info = function info(...text) {
        console.log(...text);
    };

    const debug = function debug(...text) {
        if (debugOn) {
            console.log(`%c${text}`, "color: rgb(0, 255, 255)");
        }
    };
    return {
        warn: warn,
        error: error,
        data: data,
        emphasis: emphasis,
        info: info,
        debug: debug
    };
};

export {
    logger
};