const quoteConstainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loader
function loading() {
  loader.hidden = false;
  quoteConstainer.hidden = true;
}

// Hide Loader
function completeLoad() {
  quoteConstainer.hidden = false;
  loader.hidden = true;
}

//function to show new quote
function newQuote() {
  loading();
  // Pick a random quote from the array apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if authoor is empty or is unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check if quote lenght is long to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote and hide the loader
  quoteText.textContent = quote.text;
  completeLoad();
}

// Quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error
  }
}

//Tweet the Quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

//Event Listners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load....
getQuotes();
