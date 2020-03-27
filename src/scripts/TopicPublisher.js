import solace from 'solclientjs';

var jsonV1Body = `{"message": "This is the message body"}`;
var jsonBody = `{"message": "This is the message body", "regularbody", "sdfglsdfjgsldkfgjhsdflkgjhs"}`;
var largeBody = `{"message": "This is the message body asfasdfasdfasdf asdfa sdf as asdf asdfa sdfa sdf",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh",
"asfd": "asdfasfasdfasdfllsdfglksdfjghsldkfjghsdlfkjghsdlfkgjhsdlfkgjhsdflkgjhsdlfkgjhsdflgkjshdflgkjhsdflkjgh",
"fdsasdfasdfasdf": "vfsdwervwerwerfslfgskdfjghwlkehrwlekrhslkdjvnsdfvsdlfkjelkqherlkwjehrvlsdkjfvsdflkjvshd",
"vfsldfkjsvndfvlskn":, "sdfgkjsdfglksjdfhgslkdjfghweoriguwhergwejrghwlekjghsdlfkgjshdflgkjshdflgkjshdlfkjghs",
"sdfgsdfgsdfgs": "sdfgslkdfjghsldkfgjhsdlfkgjhsdlfkgjhsdlfkjghsdlfkgjhsdlfkgjhsldfkgjhsldkfjghsldkfjhgslkdfjh"}`;

var TopicPublisher = function(hosturl, username, pass, vpn) {
    'use strict';
    var publisher = {};
    publisher.session = null;

    // Logger
    publisher.log = function (line) {
        var now = new Date();
        var time = [('0' + now.getHours()).slice(-2), ('0' + now.getMinutes()).slice(-2),
            ('0' + now.getSeconds()).slice(-2)];
        var timestamp = '[' + time.join(':') + '] ';
        console.log(timestamp + line);
    };

    publisher.log('\n*** Publisher is ready to connect ***');

    // Establishes connection to Solace message router
    publisher.connect = function (senderFunction, successfulCallback, failureCallback, doneCallback) {
        // extract params
        if (publisher.session !== null) {
            publisher.log('Already connected and ready to publish messages.');
            failureCallback('Already connected and ready to publish messages.');
            return false;
        }
        // check for valid protocols
        if (hosturl.lastIndexOf('ws://', 0) !== 0 && hosturl.lastIndexOf('wss://', 0) !== 0 &&
            hosturl.lastIndexOf('http://', 0) !== 0 && hosturl.lastIndexOf('https://', 0) !== 0) {
            publisher.log('Invalid protocol - please use one of ws://, wss://, http://, https://');
            failureCallback('Invalid protocol - please use one of ws://, wss://, http://, https://');
            return false;
        }
        if (!hosturl || !username || !pass || !vpn) {
            publisher.log('Cannot connect: please specify all the Solace message router properties.');
            failureCallback('Cannot connect: please specify all the Solace message router properties.');
            return false;
        }
        publisher.log('Connecting to Solace message router using url: ' + hosturl);
        publisher.log('Client username: ' + username);
        publisher.log('Solace message router VPN name: ' + vpn);
        
        // create session
        try {
            publisher.session = solace.SolclientFactory.createSession({
                // solace.SessionProperties
                url:      hosturl,
                vpnName:  vpn,
                userName: username,
                password: pass,
            });
        } catch (error) {
            publisher.log(error.toString());
            failureCallback(error.toString());
            return false;
        }
        // define session event listeners
        publisher.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
            publisher.log('=== Successfully connected and ready to publish messages. ===');
            successfulCallback();
            senderFunction(doneCallback);
        });

        publisher.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
            publisher.log('Connection failed to the message router: ' + sessionEvent.infoStr +
                ' - check correct parameter values and connectivity!');
            failureCallback('Connection failed to the message router: ' + sessionEvent.infoStr +
            ' - check correct parameter values and connectivity!');
        });
        // publisher.session.on(solace.SessionEventCode.DOWN, function () {
        //     console.error("Unable to connect");
        //     failureCallback();
        // });
        publisher.session.on(solace.SessionEventCode.DOWN_ERROR, function (sessionEvent) {
            console.error("Connection to broker is down");
            failureCallback("Connection to broker is down");
        });

        publisher.session.on(solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
            publisher.log('Disconnected.');
            if (publisher.session !== null) {
                publisher.session.dispose();
                publisher.session = null;
            }
        });

        publisher.session.on(solace.SessionEventCode.CAN_ACCEPT_DATA, function (sessionEvent) {
            publisher.log('Can accept data.');
            console.error('Can accept data.');
        });

        return publisher.connectToSolace();   

    };

    // Actually connects the session triggered when the iframe has been loaded - see in html code
    publisher.connectToSolace = function () {
        try {
            publisher.session.connect();
        } catch (error) {
            publisher.log(error.toString());
            return false;
        }
        return true;
    };

    // Publishes one message
    publisher.publish = function(topicName) {
        if (publisher.session !== null) {
            var message = solace.SolclientFactory.createMessage();
            message.setDestination(solace.SolclientFactory.createTopicDestination(topicName));
            message.setBinaryAttachment(jsonBody);
            if (topicName.includes("notice") || topicName.includes("alert")) {
                message.setBinaryAttachment(largeBody);
            } else if (topicName.includes("v1")) {
                message.setBinaryAttachment(jsonV1Body);
            }
            //console.log("Message body", messageBody);
            message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
            //publisher.log('Publishing message "' + messageText + '" to topic "' + topicName + '"...');
            try {
                publisher.session.send(message);
                if (topicName.includes("geo-update")) {
                    publisher.session.send(message);
                    publisher.session.send(message);
                    publisher.session.send(message);
                    publisher.session.send(message);
                }
                //publisher.log('Message published.');
                return true;
            } catch (error) {
                publisher.log(error.toString());
                console.error("Failed");
                return false;
            }
        } else {
            publisher.log('Cannot publish because not connected to Solace message router.');
        }
    };

    // Gracefully disconnects from Solace message router
    publisher.disconnect = function () {
        publisher.log('Disconnecting from Solace message router...');
        if (publisher.session !== null) {
            try {
                publisher.session.disconnect();
            } catch (error) {
                publisher.log(error.toString());
            }
        } else {
            publisher.log('Not connected to Solace message router.');
        }
    };

    return publisher;
};

export {TopicPublisher};