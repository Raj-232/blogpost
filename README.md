## Getting Started

First, clone the repo [https://github.com/Raj-232/blogpost.git](https://github.com/Raj-232/blogpost.git)

## require mongodb in your system

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

#### Sign In
- **URL:** `/api/v1/user/signin`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }

## Send the token to Header in all api call


#### management

#### get  user

- **URL:** `/api/v1//user/:userid`
- **Method:** `GET`

#### update user
- **URL:** `/api/v1//user/:userid`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }

#### delete user
- **URL:** `/api/v1//user/:userid`
- **Method:** `DELETE`

### BlogPost

#### getall post
- **URL:** `/api/v1/blogpost`
- **Method:** `GET`

#### createPost
- **URL:** `/api/v1/blogpost?page=1&limit=10`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
   "title": "Sample Post Title",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "authorId": userid
  }
#### get ALL post by id
- **URL:** `/user/blogpost/:authorId`
- **Method:** `GET`

#### get post by id
- **URL:** `/blogpost/:postid`
- **Method:** `GET`

#### updatePost
- **URL:** `/api/v1/blogpost/:postid`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
   "title": "Sample Post Title",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "authorId": userid
  }
  
#### deletepost
- **URL:** `/blogpost/:postid`
- **Method:** `DELETE`

### comments api

### create postcomment
- **URL:** `/api/v1/postcomment`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
  "content": "This is a sample comment.",
  "postId": postid
  "authorId": userid
  }
### update postcomment
- **URL:** `/api/v1/postcomment/:commendId`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "content":"gaminga industry was so coll ",
    "authorId":userid
  }

### delete postcomment
- **URL:** `/api/v1/postcomment/:commendId`
- **Method:** `DELETE`
- **Request Body:**
  ```json
  {
    "authorId":userid
  }

### get all postcomment
- **URL:** `/api/v1/post/postcomment/:postId?page=1&limit=10`
- **Method:** `GET`

### get postcomment by id
- **URL:** `/api/v1/postcomment/:postId`
- **Method:** `GET`
