# Lesson8 TypeScript

CommonJS to TypeScript migration of source files of Lesson4 project.

## Quick start

Install dependencies

```bash
npm install
```

Start your MongoDB server and run migrations

```bash
npm run migrateUp
```

Build the TS sources to JS dist

```bash
npm run build
```

Start the server from the build distributions

```bash
npm run start
```

Open [http://localhost:3000/](http://localhost:3000/) in Postman or CURL it as you wish. For example:

```bash
curl -X POST http://localhost:3000/v1/auth/register -H "Content-Type: application/json" -d '{"email":"test@test.com", "password":"123456"}'
```

## Development

To start a server that compiles TS on fly run

```bash
npm run dev   # see nodemon.json for details
```
