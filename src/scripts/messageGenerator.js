import {
    getTopicList
} from "./topicGenerator";
import {
    TopicPublisher
} from "./TopicPublisher";
import solace from 'solclientjs';

const messageGenerator = function messageGenerator(url, username, password, msgVpn, numberOfMessagesToSend, messagesPerSecond) {
    let topicPublisher = {};

    function start(successCallback, failureCallback, doneCallback) {
        var factoryProps = new solace.SolclientFactoryProperties();
        factoryProps.profile = solace.SolclientFactoryProfiles.version10;
        solace.SolclientFactory.init(factoryProps);
        // enable logging to JavaScript console at WARN level
        // NOTICE: works only with "solclientjs-debug.js"
        solace.SolclientFactory.setLogLevel(solace.LogLevel.WARN);

        topicPublisher = TopicPublisher(url, username, password, msgVpn);
        topicPublisher.connect(sendToTopic, successCallback, failureCallback, doneCallback);
    }

    function sendToTopic(doneCallback) {
        console.log("Send to topic");
        if (messagesPerSecond > 1000) {
            sendFirehose(1, doneCallback);
        } else {
            sendTimed(1, doneCallback);
        }
    }

    function sendFirehose(idx, doneCallback) {
        if (!topicPublisher.publish(getTopicList().join("/"))) {
            setTimeout(() => sendFirehose(idx, doneCallback), 100);
        } else {
            if (idx < numberOfMessagesToSend) {
                idx += 1;
                sendFirehose(idx, doneCallback);
            } else {
                cleanup(doneCallback);
            }
        }
    }

    function sendTimed(idx, doneCallback) {
        if (!topicPublisher.publish(getTopicList().join("/"))) {
            // Filled the buffers, wait a sec
            setTimeout(() => sendTimed(idx, doneCallback), 1000);
        } else {
            if (idx < numberOfMessagesToSend) {
                idx += 1;
                setTimeout(() => sendTimed(idx, doneCallback), 1000 / messagesPerSecond);
            } else {
                cleanup(doneCallback);
            }
        }
    }

    function cleanup(doneCallback) {
        topicPublisher.disconnect();
        if (doneCallback !== null) {
            doneCallback();
        }
    }

    return {
        start: start
    };
};

export { messageGenerator };