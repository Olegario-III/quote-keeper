// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDW--pobxRHviOBsUY2URV9hdfsaJzMkPU",
    authDomain: "quote-keeper-d4607.firebaseapp.com",
    projectId: "quote-keeper-d4607",
    storageBucket: "quote-keeper-d4607.appspot.com",
    messagingSenderId: "769114323446",
    appId: "1:769114323446:web:8a58c8debdbbba3893efd7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();




// Function to load quotes from firebase database
function displayRandomQuote() {
    db.collection('quotes').get()
      .then(snapshot => {
        const quotes = [];
        snapshot.forEach(doc => quotes.push(doc.data()));
        if (quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];
          document.getElementById('random-quote').innerText = `"${randomQuote.text}" - ${randomQuote.author}`;
        } else {
          document.getElementById('random-quote').innerText = "No quotes available.";
        }
      })
      .catch(error => {
        console.error('Error loading quotes:', error);
      });
  }

// Function to add quote to firebase database
function addQuote() {
    const newQuoteText = document.getElementById('new-quote').value.trim();
    const authorText = document.getElementById('author-txt').value.trim();
  
    if (newQuoteText && authorText) {
      db.collection('quotes').add({
        text: newQuoteText,
        author: authorText
      })
      .then(() => {
        alert('Quote added successfully!');
        displayRandomQuote();
        clearInputs();
      })
      .catch((error) => {
        console.error('Error adding quote: ', error);
      });
    } else {
      alert('Please enter both a quote and an author.');
    }
  }

// Function to clear input fields
function clearInputs() {
    document.getElementById('new-quote').value = '';
    document.getElementById('author-txt').value = '';
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addQuote);
document.getElementById('clear-btn').addEventListener('click', clearInputs);

// Initial display of a random quote
displayRandomQuote();
// Function to search quotes
function searchQuotes() {
    const searchText = document.getElementById('search-btn').value.toLowerCase();
    const quotes = loadQuotes();
    const filteredQuotes = quotes.filter(quote =>
        quote.text.toLowerCase().includes(searchText) ||
        quote.author.toLowerCase().includes(searchText)
    );

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        document.getElementById('random-quote').innerText = `"${randomQuote.text}" - ${randomQuote.author}`;
    } else {
        document.getElementById('random-quote').innerText = "No matching quotes found.";
    }
}

// Event listener for search input
document.getElementById('search-btn').addEventListener('input', searchQuotes);
// Function to display search results
function displaySearchResults() {
    const searchText = document.getElementById('search-btn').value.toLowerCase();
    const searchResultDiv = document.getElementById('serch-result');
    searchResultDiv.innerHTML = '';
  
    db.collection('quotes').get()
      .then(snapshot => {
        const quotes = [];
        snapshot.forEach(doc => quotes.push(doc.data()));
  
        const filteredQuotes = quotes.filter(quote => 
          quote.text.toLowerCase().includes(searchText) || 
          quote.author.toLowerCase().includes(searchText)
        );
  
        if (filteredQuotes.length > 0) {
          filteredQuotes.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.innerText = `"${quote.text}" - ${quote.author}`;
            searchResultDiv.appendChild(quoteElement);
          });
        } else {
          searchResultDiv.innerText = "No matching quotes found.";
        }
      })
      .catch(error => {
        console.error('Error searching quotes:', error);
      });
  }

// Update event listener for search input
document.getElementById('search-btn').addEventListener('input', displaySearchResults);