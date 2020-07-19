//@ts-nocheck

document.body.onload = function() {
    getRandomQuote()
}

function getRandomQuote() {
    fetch(`${API}/quotes/random`).then(res => res.json()).then(d => {
        console.log(d)
        updateQuote(d.quote)
    })
}

function updateQuote(quote) {
    const { quoteAuthor: author, quoteGenre: genre, quoteText } = quote;

    $("quote_content").innerHTML = quoteText;
    $("author_name").innerHTML = author;
    $("quote_genre").innerHTML = genre;
    $("author_link").href = `./author/?author=${author}`
}