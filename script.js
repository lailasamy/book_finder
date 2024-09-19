document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-query').value;
    if (query) {
        fetchBooks(query);
    }
});

document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('books-list').style.display = 'none';
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('search-query').value = ''; // Clear the input field
});

function fetchBooks(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`;
    const booksList = document.getElementById('books-list');
    const searchContainer = document.getElementById('search-container');
    const backButton = document.getElementById('back-button');

    // Show loading animation (if added)
    booksList.innerHTML = '<div class="loading">Loading...</div>';
    searchContainer.style.display = 'none';
    backButton.style.display = 'inline-block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    if (books && books.length) {
        books.forEach(book => {
            const bookInfo = book.volumeInfo;
            const bookElement = document.createElement('div');
            bookElement.className = 'book-item';

            bookElement.innerHTML = `
                <img src="${bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}" alt="${bookInfo.title}">
                <div>
                    <h3>${bookInfo.title}</h3>
                    <p>Author(s): ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}</p>
                    <p>Published Date: ${bookInfo.publishedDate || 'Unknown'}</p>
                    <a href="${bookInfo.infoLink}" target="_blank">More Info</a>
                </div>
            `;

            booksList.appendChild(bookElement);
        });
    } else {
        booksList.innerHTML = '<p>No books found.</p>';
    }
    
    // Show the results
    booksList.style.display = 'flex';
}

