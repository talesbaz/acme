# Acme API
[![CircleCI](https://circleci.com/gh/talesbaz/acme.svg?style=svg)](https://circleci.com/gh/talesbaz/acme)

## Pre-requisites
This project was builded using `node v10` and `npm`, so you'll need node and npm to run it. You can get:
- `brew install node` or download the `.pkg` file from (https://nodejs.org/en/)
- `apt install nodejs npm` for linux debian like users

## Installing
You'll need to install the project dependencies:
```sh
npm install
```

## Environment files
This project uses the `dotenv` package for environment configuration variables. You'll need to set somenthing like that:

```sh
$ cat .env.ENVIRONMENT_TARGET
MONGO_URI=mongo_uri_for_test_database
JWT_SECRET=jwt_secret_for_sign_test_tokens
UUID_NAMESPACE=uuid_namespace_for_sign_guid
```

## Running
### Development
```sh
$ npm start:dev
```
### As daemon
```sh
$ npm start
```

## Tests
To run the tests:
```sh
npm test
```

## Support
Over `.postman` folder you can find the `collections` and `environment vars` for `Postman` or `Insomnia`.

### Some points of improvement
  - Uncouple payload validation from controllers
  - User aws vault for the environment vars
  - Fix some structure names
  - Add swagger
  - Add api versioning standard like `api/v1/xxx`
