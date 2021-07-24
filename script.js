// jshint esversion: 8
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loader
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// API
async function getQuote() {
    loading();
    
    const apiUrl = 'https://api.quotable.io/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = '- ' + data.author;
        }


        //Reduce font size for long quotes
        if (data.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.content;


        //Stop loader and show quote
        complete();

    } catch (error) {
        getQuote();

    }
}


// tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=Quote of the day - \  ${quote}  ${author}`;
    window.open(twitterUrl, '_blank');
}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();




//                     Dark Mode       

const toggleSwitch = document.querySelector('input[type = "checkbox"]');
const toggleIcon =  document.getElementById('toggle-icon');
//Switch Theme
function switchTheme(event){
   if(event.target.checked){
       document.documentElement.setAttribute('data-theme' , 'dark');
       toggleIcon.children[0].classList.replace('fa-sun' , 'fa-moon');
   }else{
    document.documentElement.setAttribute('data-theme' , 'light');
    toggleIcon.children[0].classList.replace('fa-moon','fa-sun');
   }
  
}
//Event listener
toggleSwitch.addEventListener('change' , switchTheme);


