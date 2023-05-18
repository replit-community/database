# Database Server

Fully featured Koa backend for database API

-   Create new user accounts
-   Create multiple key-value bins
    -   Create new API keys w/ permissions to interact with bins

The types of requests you can make are outlined in `spec`

## Development

```bash
npm install
npm run dev
```

### Environmental Variables

-   `MONGO_USERNAME`: MongoDB database username
-   `MONGO_PASSWORD`: MongoDB database password
-   `COOKIE_SECRET`: Any string (used to sign server side cookies)
-   `JWT_SECRET`: Any key (used to sign JWT tokens)

### Testing

I use Vitest to test basic server routes, such as logging in or creating new bins. It requires the development server to be online, so you could use `npm run dev` or the Docker commands outlined below.

I didn't use use `createApp` in `beforeAll` (I even created a dispose function) because the tests are run in parallel and shouldn't really impact each other.

```bash
npm run dev     # start development server
npm run test    # run test suite
```

### Docker

```bash
docker build -t database-server .
docker run -d -p 3000:3000 --env-file .env database-server
```
