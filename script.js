
        // Function to load quotes from localStorage
        function loadQuotes() {
            const quotes = localStorage.getItem('quotes');
            return quotes ? JSON.parse(quotes) : [];
        }

        // Function to save quotes to localStorage
        function saveQuotes(quotes) {
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }

        // Function to display a random quote
        function displayRandomQuote() {
            const quotes = loadQuotes();
            if (quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                document.getElementById('random-quote').innerText = `"${randomQuote.text}" - ${randomQuote.author}`;
            } else {
                document.getElementById('random-quote').innerText = "No quotes available.";
            }
        }

        // Function to add a new quote
        function addQuote() {
            const newQuoteText = document.getElementById('new-quote').value.trim();
            const authorText = document.getElementById('author-txt').value.trim();

            if (newQuoteText && authorText) {
                const quotes = loadQuotes();
                quotes.push({ text: newQuoteText, author: authorText });
                saveQuotes(quotes);
                document.getElementById('new-quote').value = '';
                document.getElementById('author-txt').value = '';
                displayRandomQuote();
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
            const quotes = loadQuotes();
            const filteredQuotes = quotes.filter(quote => 
            quote.text.toLowerCase().includes(searchText) || 
            quote.author.toLowerCase().includes(searchText)
            );

            const searchResultDiv = document.getElementById('serch-result');
            searchResultDiv.innerHTML = ''; // Clear previous results

            if (filteredQuotes.length > 0) {
            filteredQuotes.forEach(quote => {
                const quoteElement = document.createElement('div');
                quoteElement.innerText = `"${quote.text}" - ${quote.author}`;
                searchResultDiv.appendChild(quoteElement);
            });
            } else {
            searchResultDiv.innerText = "No matching quotes found.";
            }
        }

        // Update event listener for search input
        document.getElementById('search-btn').addEventListener('input', displaySearchResults);