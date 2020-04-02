import {logger} from "./logger";
import {transportSchema} from "./transportJson";

let topicTree = {};

const debug = false;
const log = logger(debug);

const getTopicList = function getTopicList() {
    // Find the root node
    const rootNode = topicTree["nodes"].filter((node) => node.name == "root");
    let topicList = [];
    if (rootNode.length > 0) {
        processDescendants(rootNode[0], topicTree, topicList, null);
    } else {
        log.error("Could not find root node");
    }
    return topicList;
};

function processNode(nodeName, topicTree, topicLevelList) {
    //console.log("Processing node", nodeName);
    let node = topicTree["nodes"].filter((node) => node.name == nodeName)[0];
    let value = null;

    // Check for custom node
    if (node.type === 'custom') {
        const customNode = topicTree["nodes"].filter((custNode) => custNode.name == node.value)[0];
        log.debug("CustomNode", customNode);
        const deepCopyCustomNode = JSON.parse(JSON.stringify(customNode));
        const deepCopyCurrentNode = JSON.parse(JSON.stringify(node));
        if (deepCopyCurrentNode.hasOwnProperty('decendants')) {
            deepCopyCustomNode.decendants = deepCopyCurrentNode.decendants;
        }
        node = deepCopyCustomNode;
    }

    if (node.type.startsWith("random-long")) {
        // Get the format
        const wholeLength = parseInt(node.type.split('-')[2]);
        const decimalLength = parseInt(node.type.split('-')[3]);
        const lower = parseFloat(node.value.split(',')[0]);
        const upper = parseFloat(node.value.split(',')[1]);
        value = (lower + ((upper - lower) * Math.random())).toFixed(decimalLength);
        if (value.indexOf('.') == 2) {
            value = "0" + value;
        }
    } else {
        switch (node.type) {
            case 'const': {
                value = node.value;
                break;
            }
            case 'enum': {
                value = chooseFromList(node.value, node.distribution);
                break;
            }
            case 'normal-int': {
                const mean = parseFloat(node.value.split(',')[0]);
                const variance = parseFloat(node.value.split(',')[1]);
                value = Math.ceil(((randomNormal() - 0.5) * variance) + mean);
                value = (value < 0) ? 0 : value; // must be 0 or >
                break;
            }
        }
    }
    topicLevelList.push(removeSpaces(value));
    processDescendants(node, topicTree, topicLevelList, value);
}

function removeSpaces(value) {
    if (typeof value === 'string') {
        return value.replace(' ', '-');
    }
    return value;
}

function processDescendants(node, topicTree, topicLevelList, value) {
    log.debug("Processing descendants for", node);
    if (node.hasOwnProperty("decendants")) {
        const decendants = node.decendants;
        log.debug(node.decendants);
        if (decendants.hasOwnProperty("useValue")) {
            processNode(value, topicTree, topicLevelList);
        } else {
            if (decendants.children.length == 1) {
                // Only one choice
                processNode(decendants.children[0], topicTree, topicLevelList);
            } else {
                const descendantNodeName = chooseFromList(decendants.children, decendants.distribution);
                log.debug("Choose", descendantNodeName);
                processNode(descendantNodeName, topicTree, topicLevelList);
            }
        }
    } else {
        log.debug("No descendants for", node.name);
    }
}

// Utility methods

// Standard Normal variate using Box-Muller transform.
function randomNormal() {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let randomNormal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    randomNormal = randomNormal / 3.5 + 0.5; // Move from mean 0, variance 1 to mean 0.5, variance .333
    // Make sure we fall in the range of 0 to .999999
    if (randomNormal < 0) {
        randomNormal = 0;
    } else if (randomNormal > 1) {
        randomNormal = 0.99999;
    }
    return randomNormal;
}

function chooseFromList(values, distribution) {
    if (!Array.isArray(distribution)){
        switch (distribution) {
            case "equal": {
                return values[Math.floor(Math.random() * values.length)];
            }
            case "normal": {
                return values[Math.floor(randomNormal() * values.length)];
            }
        }
    } else {

        // Figure out the probabilities
        const total = distribution.reduce((total, num) => total + num);
        //console.log("Total :", total);
        // Pick a random number
        const rand = Math.random();
        
        // Choose the proper number from the array
        if (values.length !== distribution.length) {
            log.error("Values and distributions arrays do not match size!", values, distribution);
        }
        
        let lower = 0;
        for (let idx = 0; idx < values.length; idx ++) {
            let upper = lower + distribution[idx]/total;
            if ((rand >= lower) && (rand < upper)){
                return values[idx];
            }
            lower = upper;
        }
        log.error("Didn't match");
    }
}

function init() {
    topicTree = transportSchema;
    //log.emphasis(getTopicList());
}

init();

// Tests
function testRandomNormal() {
    let histo = [0, 0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
        const idx = Math.floor(randomNormal() * 5);
        histo[idx]++;
    }
    console.log(histo);
}

export {
    getTopicList
};