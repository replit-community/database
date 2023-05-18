# Database Server

Fully featured Koa backend for database API

-   Create new user accounts
-   Create multiple key-value bins
    -   Create new API keys w/ permissions to interact with bins

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

I use Vitest to test basic server routes, such as logging in or creating new bins. Unfortunately, it does require the development server to be online (you could technically use `createApp` in `beforeAll` because it does include a dispose function, but the tests are run in parallel and shouldn't impact each other)

```bash
npm run dev     # start development server
npm run test    # run test suite
```

### Docker

INCOMPLETE

```bash
docker compose up
```
