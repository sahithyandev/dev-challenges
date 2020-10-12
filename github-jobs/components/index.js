// Common code needed for every component

function createStyleLink(fileName) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./styles/components/${fileName}.css`;

    return link;
}

function extractAttributes(element) {
    let attributes = {};
    for (let attribute of element.getAttributeNames()) {
        attributes[attribute] = element.getAttribute(attribute);
    }
    return attributes;
}