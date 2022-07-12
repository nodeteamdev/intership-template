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

### Sign-up
```
    curl --location --request POST 'localhost:3000/v1/auth/sign-up' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "fullName": "test",
        "email": "test@gmail.com",
        "password": 12345678
    }'
```

### Sign-in
```
    curl --location --request POST 'localhost:3000/v1/auth/sign-in' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": 12345678
    }'
```
### Logout
```
    curl --location --request POST 'localhost:3000/v1/auth/sign-in' \
    --header 'Content-Type: application/json' \
    --cookie '{
        access_token: valid token
    }'
```

### Refresh
```
    curl --location --request POST 'localhost:3000/v1/auth/refresh' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "refreshToken": "tokenExample"
    }'
```

## Sum of books of each country
```
    curl --location --request GET 'localhost:3000/v1/books/count-per-country' \
    --header 'Content-Type: application/json' \
    --cookie 'accessToken: token for access getting' \
```

## List of newest books
```
    curl --location --request GET 'localhost:3000/v1/books/new-books \
    --header 'Content-Type: application/json' \
    --cookie 'accessToken: token for access getting' \
```