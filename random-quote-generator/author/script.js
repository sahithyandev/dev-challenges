//@ts-nocheck

let getParams = function (url) {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

document.body.onload = function () {
    let {author} = getParams(window.location.href);
    getQuotes(author).then(d => {
        for (let quote of d.quotes) {
            addQuoteToDOM(generateQuoteElement(quote));
        }
        $('author').innerHTML = author
        window.document.title = `Quotes of ${author} | RQG`
    });
}

async function getQuotes(author) {
    let response = await fetch(`${API}/authors/${author}?page=1&limit=10`)
    return await response.json();
}


function generateQuoteElement(quote) {
    console.log(quote);
    if ('content' in document.createElement('template')) {
        let clone = document.getElementById('quote-template').content.cloneNode(true);
        clone.getElementById('quote-content').innerHTML = quote.quoteText
        return clone;
    }
}

function addQuoteToDOM(quoteElement) {
    document.getElementById('quote-container').appendChild(quoteElement);
}