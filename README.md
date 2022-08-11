### Validation
```
    https://joi.dev/
```

### POST http://localhost:3000/api/v1/user/register Content-Type: application/json

{ "firstname" : "Test", "lastname" : "Tester", "email": "test@mail.com", "password": "12345678" }

### POST http://localhost:3000/api/v1/user/login Content-Type: application/json

{ "email": "test@mail.com", "password": "12345678" }

### POST http://localhost:3000/api/v1/user/refresh/:_id Content-Type: application/json

### GET http://localhost:3000/api/v1/user/list/:_id Content-Type: application/json

### GET http://localhost:3000/api/v1/user/logout/:_id Content-Type: application/json

### DELETE http://localhost:3000/api/v1/user/delete/:_id Content-Type: application/json