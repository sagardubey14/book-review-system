# Book Review System API Endpoints Documentation

## Overview

This document provides an overview of the Book Review System API, which includes user authentication, book management, and review functionalities. Each section describes the endpoints, including the required HTTP methods, input data, expected responses, and detailed explanations for how each endpoint operates.

---

## Installation Instructions

### 1️⃣ Install Dependencies

To get started, install the necessary dependencies for the project:

```bash
npm install
```

### 2️⃣ Start the Server

You can run the server in development mode (with auto-reload) or in normal mode.

* For **development with auto-reload**:

```bash
npx nodemon server.js
```

* Or for a **normal start**:

```bash
node server.js
```

✅ The server will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Setup Instructions for the Book Review API

### 1️⃣ Create `.env` File

At the root of your project, create a `.env` file to configure environment variables. Add the following content:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/book_review
JWT_SECRET=your_jwt_secret_key_here
```

---

### Notes:

1. **PORT**: Specifies the port on which the server will run.
2. **MONGO\_URI**: Connection string for the MongoDB database.
3. **JWT\_SECRET**: A secret key used for JWT (JSON Web Token) authentication.

---
# 📘 MongoDB Schema Design

## 1. 🧑 User Schema

| Field     | Type     | Required | Unique | Description           |
|-----------|----------|----------|--------|-----------------------|
| username  | String   | ✅       | ❌     | The user's name       |
| email     | String   | ✅       | ✅     | User's email address  |
| password  | String   | ✅       | ❌     | Hashed password       |
| createdAt | Date     | ✅       | ❌     | Auto-generated        |
| updatedAt | Date     | ✅       | ❌     | Auto-updated on save  |

---

## 2. 📚 Book Schema

| Field       | Type                          | Required | Description                        |
|-------------|-------------------------------|----------|------------------------------------|
| title       | String                        | ✅       | Title of the book                  |
| author      | String                        | ❌       | Name of the author                 |
| genre       | String                        | ❌       | Genre/category of the book         |
| description | String                        | ❌       | Description or summary             |
| createdBy   | ObjectId (ref: `User`)        | ❌       | The user who added the book        |
| createdAt   | Date                          | ✅       | Auto-generated                     |
| updatedAt   | Date                          | ✅       | Auto-updated on save               |

---

## 3. 🌟 Review Schema

| Field     | Type                          | Required | Description                              |
|-----------|-------------------------------|----------|------------------------------------------|
| bookId    | ObjectId (ref: `Book`)        | ✅       | The book being reviewed                  |
| userId    | ObjectId (ref: `User`)        | ✅       | The user who posted the review           |
| rating    | Number (1 to 5)               | ✅       | Rating out of 5                          |
| comment   | String                        | ❌       | Optional review comment                  |
| createdAt | Date                          | ✅       | Auto-generated                           |
| updatedAt | Date                          | ✅       | Auto-updated on save                     |

---

## 🔗 Relationships

- A **User** can create many **Books**.
- A **User** can write many **Reviews**.
- A **Book** can have many **Reviews**.

---

## Authentication API

These endpoints handle user authentication, including signup and login.

### 1. **Signup API (POST /auth/signup)**

This endpoint is used to create a new user account by providing a username, email, and password. Once a user is successfully created, they receive a success message.

- **Endpoint:** `http://localhost:3000/auth/signup`
- **Method:** `POST`
- **Input:**
    ```json
    {
      "username": "johnDoe123",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "message": "User created successfully"
    }
    ```
- **Explanation:** The `POST /auth/signup` endpoint accepts the user's information and creates an account in the system. If successful, it responds with a message confirming that the user was created.

---

### 2. **Login API (POST /auth/login)**

This endpoint is used for logging in with the user's email and password. It returns a JWT token which should be used for authenticated requests in the future.

- **Endpoint:** `http://localhost:3000/auth/login`
- **Method:** `POST`
- **Input:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJlMjg4Mzc5ODczZWRmMTNlYTZhNTEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ3ODU1NTQ1LCJleHAiOjE3NDc5NDE5NDV9.E_LhB6bkpS8qmUvvKuD3SlsHEUQrw3_Mr8FY0Q6V-AY"
    }
    ```
- **Explanation:** The `POST /auth/login` endpoint checks the user's credentials (email and password). If the credentials are correct, it returns a JWT token that will be used for authentication on other API requests.

---

## Books API

These endpoints are used to manage books in the system, including adding new books, viewing all books, retrieving specific books by ID, and searching for books.

### 1. **Create Book API (POST /books)**

This endpoint allows you to create a new book by providing details like title, author, genre, and description. The book will be added to the system, and a response with the book data will be returned.

- **Endpoint:** `http://localhost:3000/books`
- **Method:** `POST`
- **Headers:**
    - `Authorization: Bearer <Your_Token>`
- **Input:**
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "description": "A story about the American dream and the Roaring Twenties."
    }
    ```
- **Response:**
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "description": "A story about the American dream and the Roaring Twenties.",
      "createdBy": "682defbd150b83750cd08fd8",
      "_id": "682e29b879873edf13ea6a54",
      "createdAt": "2025-05-21T19:30:00.565Z",
      "updatedAt": "2025-05-21T19:30:00.565Z",
      "__v": 0
    }
    ```
- **Explanation:** The `POST /books` endpoint allows authenticated users to add a book to the system. The request must include the book's title, author, genre, and description. The server will return the book's details, including the ID, created timestamp, and author information.

---

### 2. **Get Books API (GET /books)**

This endpoint is used to fetch a list of books, with optional pagination and filtering by author and genre.

- **Endpoint:** `http://localhost:3000/books`
- **Method:** `GET`
- **Query Parameters:**
    - `page` – Page number for pagination.
    - `limit` – Number of items per page.
    - `author` – Filter by author.
    - `genre` – Filter by genre.
- **Example Request:**
    ```
    GET http://localhost:3000/books?page=1&limit=5&author=F. Scott Fitzgerald
    ```
- **Response:**
    ```json
    {
      "total": 1,
      "page": 1,
      "limit": 5,
      "data": [
        {
          "_id": "682e29b879873edf13ea6a54",
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "genre": "Fiction",
          "description": "A story about the American dream and the Roaring Twenties.",
          "createdBy": "682defbd150b83750cd08fd8",
          "createdAt": "2025-05-21T19:30:00.565Z",
          "updatedAt": "2025-05-21T19:30:00.565Z",
          "__v": 0
        }
      ]
    }
    ```
- **Explanation:** The `GET /books` endpoint retrieves a list of books, with optional filters for pagination (`page` and `limit`) and optional filters for author and genre. This allows the frontend to request books from the server based on specific criteria.

---

### 3. **Get Book by ID API (GET /books/:id)**

This endpoint retrieves detailed information about a specific book by its ID, including any reviews and average rating.

- **Endpoint:** `http://localhost:3000/books/:id`
- **Method:** `GET`
- **Input:**
    - Book ID in the URL.
- **Response:**
    ```json
    {
      "book": {
        "_id": "682df0a8881c58dad50bb388",
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt",
        "genre": "Programming",
        "description": "A book about practical software development tips.",
        "createdBy": {
            "_id": "682defbd150b83750cd08fd8",
            "username": "testuser"
        }
      },
      "avgRating": "0.00",
      "reviews": {
        "total": 0,
        "page": 1,
        "limit": 5,
        "data": []
      }
    }
    ```
- **Explanation:** The `GET /books/:id` endpoint retrieves the details of a specific book by its ID. It also includes information about the book’s average rating and reviews, allowing users to see the book's ratings and comments.

---

### 4. **Search Books API (GET /books/search)**

This endpoint allows you to search for books based on title, author, or genre. The search can be refined using query parameters.

- **Endpoint:** `http://localhost:3000/books/search`
- **Method:** `GET`
- **Query Parameters:**
    - `title` – Search by title.
    - `author` – Search by author.
    - `genre` – Search by genre.
- **Example Request:**
    ```
    GET http://localhost:3000/books/search?title=Great&author=F. Scott Fitzgerald
    ```
- **Response:**
    ```json
    [
      {
        "_id": "682e29b879873edf13ea6a54",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "description": "A story about the American dream and the Roaring Twenties.",
        "createdBy": "682defbd150b83750cd08fd8",
        "createdAt": "2025-05-21T19:30:00.565Z",
        "updatedAt": "2025-05-21T19:30:00.565Z",
        "__v": 0
      }
    ]
    ```
- **Explanation:** The `GET /books/search` endpoint allows users to search for books based on multiple filters (title, author, genre). This endpoint is useful for searching through the library of books.

---

## Review API

These endpoints handle creating, updating, and deleting reviews for books.

### 1. **Create Review API (POST /books/:bookId/reviews)**

This endpoint allows a user to submit a review for a book, including a rating and a comment.

- **Endpoint:** `http://localhost:3000/books/:bookId/reviews`
- **Method:** `POST`
- **Headers:**
    - `Authorization: Bearer <Your_Token>`
- **Input:**
    ```json
    {
      "rating": 4,
      "comment": "Great book! Really enjoyed the storytelling."
    }
    ```
- **Response:**
    ```json
    {
      "_id": "60d9e2f1fbd7c5b5e8b2e1f8",
      "bookId": "60d9e1f4fbd7c5b5e8b2e1f7",
      "userId": "68e2b88f3798739f3ae6a51",
      "rating": 4,
      "comment": "Great book! Really enjoyed the storytelling.",
      "createdAt": "2021-06-12T10:50:33.891Z",
      "updatedAt": "2021-06-12T10:50:33.891Z"
    }
    ```
- **Explanation:** The `POST /books/:bookId/reviews` endpoint allows users to leave a review for a specific book, including a rating and a comment. Reviews are associated with a user and a specific book.

---

### 2. **Update Review API (PUT /reviews/:reviewId)**

This endpoint allows a user to update their own review for a book.

- **Endpoint:** `http://localhost:3000/reviews/:reviewId`
- **Method:** `PUT`
- **Headers:**
    - `Authorization: Bearer <Your_Token>`
- **Input:**
    ```json
    {
      "rating": 5,
      "comment": "Absolutely amazing! A must-read for anyone who loves great literature."
    }
    ```
- **Response:**
    ```json
    {
      "_id": "60d9e2f1fbd7c5b5e8b2e1f8",
      "bookId": "60d9e1f4fbd7c5b5e8b2e1f7",
      "userId": "68e2b88f3798739f3ae6a51",
      "rating": 5,
      "comment": "Absolutely amazing! A must-read for anyone who loves great literature.",
      "createdAt": "2021-06-12T10:50:33.891Z",
      "updatedAt": "2021-06-12T11:00:00.000Z"
    }
    ```
- **Explanation:** The `PUT /reviews/:reviewId` endpoint allows users to update their existing review. Only the user who created the review can modify it.

---

### 3. **Delete Review API (DELETE /reviews/:reviewId)**

This endpoint allows users to delete their own review for a book.

- **Endpoint:** `http://localhost:3000/reviews/:reviewId`
- **Method:** `DELETE`
- **Headers:**
    - `Authorization: Bearer <Your_Token>`
- **Response:**
    ```json
    {
      "message": "Review deleted successfully"
    }
    ```
- **Explanation:** The `DELETE /reviews/:reviewId` endpoint allows users to delete their own review from the system. Only the user who created the review can delete it.

---

**Sagar Dubey**  
📧 [sagardubey353@gmail.com](mailto:sagardubey353@gmail.com)
