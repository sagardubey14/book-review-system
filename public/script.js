async function fetchApi(endpoint, method, data = {}, token = '') {
    const isDevelopment = window.location.hostname === 'localhost';
    const baseUrl = isDevelopment ? 'http://localhost:3000' : '';

    const url = `${baseUrl}/${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return { error: 'An error occurred while fetching data' };
    }
}

function toggleInput(endpoint) {
    const inputs = document.getElementById(`${endpoint}Inputs`);
    inputs.style.display = (inputs.style.display === 'none' || inputs.style.display === '') ? 'block' : 'none';
}

async function handleApiRequest(endpointType) {
    let data = {};
    let endpoint = '';
    let method = '';
    let token = '';

    switch (endpointType) {
        case 'signup':
            endpoint = 'auth/signup';
            method = 'POST';
            data = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            };
            break;

        case 'login':
            endpoint = 'auth/login';
            method = 'POST';
            data = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value,
            };
            break;

        case 'createBook':
            endpoint = 'books';
            method = 'POST';
            token = document.getElementById('token').value;
            data = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                genre: document.getElementById('bookGenre').value,
                description: document.getElementById('bookDescription').value,
            };
            break;

        case 'listBooks':
            endpoint = 'books';
            method = 'GET';
            token = document.getElementById('tokenList').value;
            data = {
                page: document.getElementById('page').value,
                limit: document.getElementById('limit').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
            };
            break;

        case 'getBook':
            endpoint = `books/${document.getElementById('bookId').value}`;
            method = 'GET';
            token = document.getElementById('tokenGetBook').value;
            break;

        case 'addReview':
            endpoint = `books/${document.getElementById('reviewBookId').value}/reviews`;
            method = 'POST';
            token = document.getElementById('tokenAddReview').value;
            data = {
                rating: document.getElementById('rating').value,
                comment: document.getElementById('comment').value,
            };
            break;

        case 'updateReview':
            endpoint = `reviews/${document.getElementById('reviewId').value}`;
            method = 'PUT';
            token = document.getElementById('tokenUpdateReview').value;
            data = {
                rating: document.getElementById('updateRating').value,
                comment: document.getElementById('updateComment').value,
            };
            break;

        case 'deleteReview':
            endpoint = `reviews/${document.getElementById('reviewIdToDelete').value}`;
            method = 'DELETE';
            token = document.getElementById('tokenDeleteReview').value;
            break;

        case 'searchBooks':
            endpoint = 'books/search';
            method = 'GET';
            token = document.getElementById('tokenSearchBooks').value;
            data = {
                title: document.getElementById('searchTitle').value,
                author: document.getElementById('searchAuthor').value,
                genre: document.getElementById('searchGenre').value,
            };
            break;

        default:
            console.error('Invalid endpoint type');
            return;
    }

    const result = await fetchApi(endpoint, method, data, token);

    document.getElementById('commonResponse').textContent = JSON.stringify(result, null, 2);
}

document.getElementById('signupButton').addEventListener('click', () => handleApiRequest('signup'));
document.getElementById('loginButton').addEventListener('click', () => handleApiRequest('login'));
document.getElementById('createBookButton').addEventListener('click', () => handleApiRequest('createBook'));
document.getElementById('listBooksButton').addEventListener('click', () => handleApiRequest('listBooks'));
document.getElementById('getBookButton').addEventListener('click', () => handleApiRequest('getBook'));
document.getElementById('addReviewButton').addEventListener('click', () => handleApiRequest('addReview'));
document.getElementById('updateReviewButton').addEventListener('click', () => handleApiRequest('updateReview'));
document.getElementById('deleteReviewButton').addEventListener('click', () => handleApiRequest('deleteReview'));
document.getElementById('searchBooksButton').addEventListener('click', () => handleApiRequest('searchBooks'));
