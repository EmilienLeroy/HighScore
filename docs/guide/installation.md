# Installation

:::tip

We highly recommend that you use `docker-compose` to quickly get started with this application

:::

[[toc]]

## Docker compose

### Prerequisites

Before run the following command you need to have a server with :

- [Docker](https://docs.docker.com/engine/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Install

Create a folder and add this `docker-compose.yml` file :

```yaml
version: '3.3'
services:
  highscore:
    image: emilienleroy/highscore:latest
    ports:
      - '8081:8081'
    depends_on:
      - "mongo"
    stdin_open: true
    tty: true
    volumes:
      - ./custom:/opt/custom
      - ./logs:/opt/logs
      - ./config/ban.json:/opt/config/ban.json
    environment:
      - HIGHSCORE_PORT=8081
      - HIGHSCORE_DB_URL=mongodb://mongo:27017/highscore
      - HIGHSCORE_SESSION_SECRET=yoursupersecret
      - HIGHSCORE_TITLE=
      - HIGHSCORE_DESCRIPTION=
      - HIGHSCORE_LOGO_URL=
      - HIGHSCORE_FAVICON_URL=
      - HIGHSCORE_CSS_URL=
      - HIGHSCORE_USERNAME_DOCS=
      - HIGHSCORE_PASSWORD_DOCS=
      - HIGHSCORE_USERNAME_METRICS=
      - HIGHSCORE_PASSWORD_METRICS=
      - HIGHSCORE_DISABLE_DOCS=
      - HIGHSCORE_DISABLE_METRICS=
      - HIGHSCORE_DISABLE_BAD_WORDS=

  mongo:
    image: mongo:5.0.8
    volumes:
      - data:/data/db

volumes: 
  data:

```

:::tip
Go to the [configuration](/guide/configuration) section to get more informations about each environnement variables.
:::

And now run this command :

```shell
$ docker-compose up -d
```

## Manual
:::warning
Use source in production is possible but not recommanded. 
:::

### Prerequisites

Before install the project you need to have a server with :

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Install

First clone the repository and install dependencies using npm.

```shell
$ git clone https://github.com/EmilienLeroy/HighScore.git
$ cd highscore
$ npm install
```

Next add an `.env` file with your configuration. See the `.env.example` file to get more informations about the environment variables. After you need to build the sourcre using the following command :

```shell
$ npm run build
```

When the build it's finish you need to install `pm2` to run the app as a process.

```shell
$ npm install -g pm2
```

Now just run the following command an the app should start :

```shell
$ npm run start:prod
```