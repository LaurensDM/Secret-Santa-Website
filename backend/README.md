## Vereisten

- [NodeJS](https://nodejs.org)
- [Npm](https://www.npmjs.com/)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...


## Opstarten

Om te starten, maak een .env file aan.
Zorg ervoor dat volgende variabelen aangemaakt worden.

```
NODE_ENV="development"
DATABASE_USERNAME="root"
DATABASE_PASSWORD=""
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_NAME="databasenaam"
AUTH_JWKS_URI="https://auth0domain/.well-known/jwks.json"
AUTH_AUDIENCE="audience"
AUTH_ISSUER="https://auth0domain"
AUTH_USER_INFO="https://auth0domain/userinfo"
PORT=poort

```

De waarden van deze variabelen zijn vrij te kiezen naargelang een eigen database.

Start de server op met `npm start`

Indien module not found errors tevoorschijn komen, run `npm install`

## Testen

maak een file .env.test, vul deze aan.
Start met testen door `npm run test` uit te voeren, of `npm run test:coverage`.

```

NODE_ENV="test"
DATABASE_USERNAME="root"
DATABASE_PASSWORD="password"
DATABASE_HOST="host"
DATABASE_PORT=port
DATABASE_NAME="name"
AUTH_JWKS_URI="https://auth0 domain/.well-known/jwks.json"
AUTH_AUDIENCE="audience"
AUTH_ISSUER="https://auth0 domain"
AUTH_USER_INFO="https://auth0 domain/userinfo"
PORT=poort
AUTH_TEST_USER_USER_ID=userId
AUTH_TEST_USER_USERNAME=username
AUTH_TEST_USER_PASSWORD=passwoord
AUTH_TOKEN_URL='https://auth0 domain/oauth/token'
AUTH_CLIENT_ID=auth0id
AUTH_CLIENT_SECRET=auth0secret

```
