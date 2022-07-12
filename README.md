### Validation
```
  https://hapi.dev/family/joi/
```

### Find User
```
  curl --location --request GET 'localhost:3000/v1/users/find' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@gmail.com"
  }'
```

### Create User
```
  curl --location --request POST 'localhost:3000/v1/users/create' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@gmail.com",
    "fullName": "Test User"
  }'
```

### Update User
```
  curl --location --request PUT 'localhost:3000/v1/users/update' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "fullName": "Update User"
  }'
```

### Delete User
```
  curl --location --request DELETE 'localhost:3000/v1/users/delete' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@gmail.com"
  }'
```

### Get User
```
  curl --location --request GET 'localhost:3000/posts' \
  --header 'Authorization: Bearer 'accessToken'' \
  --data-raw '{
    "fullName": "John Hey",
    "email": "john@gmail.com",
    "password": "helloworld"
  }'

```

### Get Tokens
```
  curl --location --request GET 'localhost:3000/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "accToken": "AccessToken",
    "refToken": "RefreshToken",
  }'

```

### Get Refresh Token
```
  curl --location --request GET 'localhost:3000/token' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    accessToken: 'accessToken',
  }'

```

### Delete Token
```
  curl --location --request GET 'localhost:3000/logout' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "message": "Logged out"
  }'

```

### Get books count per country
```

  curl --location --request GET 'localhost:3000/v1/books/count-per-country' \
  --header 'Content-Type: application/json' \

```

### Get new books
```

  curl --location --request GET 'localhost:3000/v1/books/new-books' \
  --header 'Content-Type: application/json' \

```
