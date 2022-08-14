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
        "fullName": "Update User",
        "email": "test@gmail.com"
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
### SignUp User
```
    curl --location --request POST 'localhost:3000/v1/auth/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "fullName": "Test User"
    }'
```
### LogIn User
```
    curl --location --request POST 'localhost:3000/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "fullName": "Test User"
    }'
```
### CountPerCountry Books
```
    curl --location --request GET 'localhost:3000/v1/books/count-per-country' \
    --header 'Content-Type: application/json'
```
### GetNew Books
```
    curl --location --request GET 'localhost:3000/v1/books/new-books' \
    --header 'Content-Type: application/json'
```