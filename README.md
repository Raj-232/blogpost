## Getting Started

First, clone the repo [git@github.com:Raj-232/bookusshow.git](git@github.com:Raj-232/bookusshow.git)

install dependencies using
```bash
npm install

```
run the development server:

```bash
npm start

```

Open [http://localhost:8080](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `index.js`. The page auto-updates as you edit the file.


## API Documentation

### User Authentication

#### Sign Up
- **URL:** `/api/v1/user/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }

