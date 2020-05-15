# nms-Ticketing - Auth Service

- Users creation
- Authentication

### API Endpoints

| ENDPOINT                                           | DESCRIPTION                            |
| -------------------------------------------------- | -------------------------------------- |
| [GET /api/users/current-user](#get-apicurrentuser) | Get current logged in user information |
| [POST /api/users/signup](#post-apiuserssignup)     | Register new user                      |
| [POST /api/users/signin](#post-apiuserssignin)     | Sign in an existing user               |
| [POST /api/users/signout](#post-apiuserssignout)   | Sign out an existing user              |

#### GET /api/users/current-user

_**Description**: Gets information of a currently logged in user, cookie must have been set in headers_.

Response body:

```json
{
  "currentUser": {
    "id": "5ebe813b1537b700233d2896",
    "email": "test@test.com"
  }
}
```

#### POST /api/users/signup

_**Description**: Creates a new user, sets cookie in header after successful signup_.

Request body:

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

Response body:

```json
{
  "email": "test@test.com",
  "id": "5ebe813b1537b700233d2896"
}
```

#### POST /api/users/signin

_**Description**: Sign in an existing user, sets cookie in header after successful signin_.

Request body:

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

Response body:

```json
{
  "email": "test@test.com",
  "id": "5ebe813b1537b700233d2896"
}
```

#### POST /api/users/signout

_**Description**: Signs out a signed in user, clears cookie in header after successful signout_.

Request body:

```json
{}
```

Response body:

```json

```
