import '../styles/index.scss';
import '../styles/slider.css';
import '../styles/solace.css';
import { logger } from "./logger";
import { messageGenerator } from "./messageGenerator";

const debug = false;
const log = logger(debug);
const DEFAULT_MESSAGE_SEND_RATE = 500;
const DEFAULT_NUMBER_MESSAGES_TO_SEND = 500;

var progressTextTimer;

function startTopicScan() {
    var url = getInputTextById("broker-host");
    var vpnName = getInputTextById("broker-msgVpn");
    var clientUsername = getInputTextById("broker-client-username");
    var clientPassword = getInputTextById("broker-client-password");
    var numberOfMessages = getInputTextById("numberOfMessagesSlider");
    var messageRate = getInputTextById("messageRate");

    alertIfNull(url, "Host cannot be empty");
    alertIfNull(vpnName, "Vpn Name cannot be empty");
    alertIfNull(clientUsername, "Client Username cannot be empty");

    log.info(url, vpnName, clientUsername, clientPassword, numberOfMessages, messageRate);

    setTextContentTimed("Connecting to " + url, 30000);
    var messageGen = messageGenerator(url, clientUsername, clientPassword, vpnName,
        numberOfMessages, messageRate);
    messageGen.start(
        // Connected Callback
        function() {
            log.info("Starting to send messages");
            setTextContentTimed("Connected! Sending messages ...", 120000);
        },
        // Error Callback
        function(message){
            log.error(message);
            setTextContent("Error connecting: " + message);
        },
        // Done Callback
        function(){
            log.info("Done");
            setTextContent("Done");
        }
    );
}

function alertIfNull(value, message) {
    if (value === null || value === "") {
        alert(message);
        throw "Empty value not allowed";
    }
}

function setTextContent(message) {
    setTextContentTimed(message, 8000);
}

function setTextContentTimed(message, timeToDisplay) {
    if (progressTextTimer !== null) {
        clearTimeout(progressTextTimer);
    }
    fadeInElement("progress");
    setTextContentById("progress-text", message);
    progressTextTimer = setTimeout(function () {
        fadeOutElement("progress");
        setTextContentById("progress-text", "");
    }, (timeToDisplay));
}

function newNumMessagesSliderEvent(event) {
    newNumMessagesSliderValue(event.target.value);
}

function newNumMessagesSliderValue(value) {
    setTextContentById("numberOfMessages", value);
}

function newMessageRateSliderEvent(event) {
    newMessageRateSliderValue(event.target.value);
}

function newMessageRateSliderValue(newValue) {
    var messageRate = "Max";
    if (newValue <= 20) {
        var messageRate = "Trickle";
    } else if (newValue > 20 && newValue <= 250) {
        messageRate = "Slow";
    } else if (newValue > 250 && newValue <= 750) {
        messageRate = "Medium";
    } else if (newValue > 750 && newValue < 1001) {
        messageRate = "Fast";
    } else {
        messageRate = "Max";
    }
    setTextContentById("message-rate", messageRate);
}

function saveValues(){
    localStorage.setItem("broker-host", getInputTextById("broker-host"));
    localStorage.setItem("broker-msgVpn", getInputTextById("broker-msgVpn"));
    localStorage.setItem("broker-client-username", getInputTextById("broker-client-username"));
    localStorage.setItem("broker-client-password", getInputTextById("broker-client-password"));
    localStorage.setItem("numberOfMessagesSlider", getInputTextById("numberOfMessagesSlider"));
    localStorage.setItem("messageRate", getInputTextById("messageRate"));
}

function clearValues(){
    localStorage.removeItem("broker-host");
    localStorage.removeItem("broker-msgVpn");
    localStorage.removeItem("broker-client-username");
    localStorage.removeItem("broker-client-password");
    localStorage.removeItem("numberOfMessagesSlider");
    localStorage.removeItem("messageRate");
    initializeForm();
}

function initializeForm() {
    setInputTextById("broker-host", localStorage.getItem("broker-host"));
    setInputTextById("broker-msgVpn", localStorage.getItem("broker-msgVpn"));
    setInputTextById("broker-client-username", localStorage.getItem("broker-client-username"));
    setInputTextById("broker-client-password", localStorage.getItem("broker-client-password"));
    setInputTextById("numberOfMessagesSlider", localStorage.getItem("numberOfMessagesSlider") || DEFAULT_NUMBER_MESSAGES_TO_SEND);
    newNumMessagesSliderValue(localStorage.getItem("numberOfMessagesSlider") || DEFAULT_NUMBER_MESSAGES_TO_SEND);
    setInputTextById("messageRate", localStorage.getItem("messageRate") || DEFAULT_MESSAGE_SEND_RATE);
    newMessageRateSliderValue(localStorage.getItem("messageRate") || DEFAULT_MESSAGE_SEND_RATE);
}

/* DOM interaction */
function showElement(element) {
    var x = document.getElementById(element);
    x.style.display = "block";
}

function hideElement(element) {
    var x = document.getElementById(element);
    x.style.display = "none";
}

function fadeInElement(element) {
    var x = document.getElementById(element);
    x.classList.remove("fade-out");
    x.classList.add("fade-in");
}

function fadeOutElement(element) {
    var x = document.getElementById(element);
    x.classList.remove("fade-in");
    x.classList.add("fade-out");
}


function getInputTextById(id) {
    return document.getElementById(id).value;
}

function setInputTextById(id, elementValue) {
    return document.getElementById(id).value = elementValue;
}

function setTextContentById(id, elementValue) {
    const span = document.getElementById(id);
    while (span.firstChild) {
        span.removeChild( span.firstChild);
    }
    span.appendChild( document.createTextNode(elementValue));
}

function registerClickHandlers() {
    document.getElementById("save-local-button").addEventListener("click",saveValues,false);
    document.getElementById("clear-local-button").addEventListener("click",clearValues,false);
    document.getElementById("start-button").addEventListener("click",startTopicScan,false);
    document.getElementById("numberOfMessagesSlider").addEventListener("input", newNumMessagesSliderEvent, false);
    document.getElementById("numberOfMessagesSlider").addEventListener("change", newNumMessagesSliderEvent, false);
    document.getElementById("messageRate").addEventListener("input", newMessageRateSliderEvent, false);
    document.getElementById("messageRate").addEventListener("change", newMessageRateSliderEvent, false);
};

function init() {
    log.info("Starting...");
    registerClickHandlers();
    initializeForm();
    fadeOutElement("progress");
}

init();

