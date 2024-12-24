# RESTful API Documentation for Book Management

This document provides a comprehensive guide to the RESTful API for managing books. The API allows you to perform CRUD operations (Create, Read, Update, Delete) on books stored in a MySQL database.

## Prerequisites

1. Node.js and npm are installed on your system.
2. A running MySQL or MariaDB instance.
3. `.env.local` file with the following variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   ```

## Installation

1. Clone the repository or copy the code files.
2. Navigate to the project directory.
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node app.js
   ```
5. The server will run at `http://localhost:3000`.

## Endpoints

### 1. Retrieve All Books

**GET** `/api/buku`

- **Description**: Fetches all books from the database.
- **Response**:
  - 200: Returns an array of books.
  - 500: If there is an issue with the database.

### 2. Retrieve Book by ID

**GET** `/api/buku/:id`

- **Description**: Fetches a single book by its ID.
- **Parameters**:
  - `id` (path parameter): The ID of the book.
- **Response**:
  - 200: Returns the book details.
  - 404: If the book is not found.

### 3. Add a New Book

**POST** `/api/buku`

- **Description**: Adds a new book to the database.
- **Request Body**:
  ```json
  {
    "judul": "string",
    "pengarang": "string",
    "tahun": "number",
    "jumlah": "number"
  }
  ```
- **Response**:
  - 200: Returns a success message and the ID of the new book.
  - 500: If there is an issue with the database.

### 4. Update Book

**PUT** `/api/buku/:id`

- **Description**: Updates the details of a book.
- **Parameters**:
  - `id` (path parameter): The ID of the book.
- **Request Body**:
  ```json
  {
    "judul": "string",
    "pengarang": "string",
    "tahun": "number",
    "jumlah": "number"
  }
  ```
- **Response**:
  - 200: Success message.
  - 500: If there is an issue with the database.

**PATCH** `/api/buku/:id`

- **Description**: Partially updates details of a book.
- **Request Body**:
  Similar to `PUT` but allows partial fields.

### 5. Delete Book

**DELETE** `/api/buku/:id`

- **Description**: Deletes a book from the database.
- **Parameters**:
  - `id` (path parameter): The ID of the book.
- **Response**:
  - 200: Success message.
  - 500: If there is an issue with the database.

## Example Requests

### Fetch All Books

```bash
curl -X GET http://localhost:3000/api/buku
```

### Fetch Book by ID

```bash
curl -X GET http://localhost:3000/api/buku/1
```

### Add a New Book

```bash
curl -X POST http://localhost:3000/api/buku \
-H "Content-Type: application/json" \
-d '{"judul":"Book Title","pengarang":"Author Name","tahun":2023,"jumlah":10}'
```

### Update a Book

```bash
curl -X PUT http://localhost:3000/api/buku/1 \
-H "Content-Type: application/json" \
-d '{"judul":"Updated Title","pengarang":"Updated Author","tahun":2024,"jumlah":15}'
```

### Delete a Book

```bash
curl -X DELETE http://localhost:3000/api/buku/1
```

## Error Handling

- **500 Internal Server Error**: Indicates an issue with the database or server logic.
- **404 Not Found**: Returned when a book with the specified ID does not exist.
- **400 Bad Request**: Returned when the request body is invalid.

## Notes

- Ensure the database and its table are properly configured before starting the server.
- Example database schema for the `buku` table:
  ```sql
  CREATE TABLE buku (
      id INT AUTO_INCREMENT PRIMARY KEY,
      judul VARCHAR(255),
      pengarang VARCHAR(255),
      tahun INT,
      jumlah INT
  );
  ```
