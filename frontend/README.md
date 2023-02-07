## Vereisten

- [NodeJS](https://nodejs.org)
- [Npm](https://www.npmjs.com/)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...


## Opstarten

- Run `npm install` om de node_modules te installeren.
- Vul de .env file aan.
- run  `npm start`

```
REACT_APP_URL = http://localhost:9000/

REACT_APP_AUTH0_DOMAIN = auth0 domain

REACT_APP_AUTH0_CLIENT_ID=auth0 client id

REACT_APP_AUTH0_API_AUDIENCE= auth0 audience
```



## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

- Maak het bestand cypress.env.json aan en vul dit aan
- Run `npx cypress open`
- Voer testen uit

```

{
  "auth_audience": auth 0 audience,
  "auth_url": "https://auth0 domain/oauth/token",
  "auth_client_id": "auth0 id",
  "auth_client_secret": "auth0 secret",
  "auth_username": test user,
  "auth_password": password
}

```