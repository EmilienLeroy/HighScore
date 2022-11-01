We're really glad you're reading this. 👏

## Instructions

### Prerequisites

Before install the project you need to have a server with :

- [NodeJS](https://nodejs.org/en/) >= 16.x.x
- [MongoDB](https://www.mongodb.com/) >= 5.x.x

### Install
These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

```console
$ git clone https://github.com/<YOUR-USERNAME>/highscore
$ cd highscore
$ npm install
```

### Develop

Before develop you need to create an `.env` file with all the environnement variables configured. To see all available variables, see the [.env.example](./.env.example) file. After this just run the following command :

```
$ npm run start
```

### Build 

To create the production build just run this command :

```console
$ npm run build
```

You can also easly test the app in production using docker-compose, just run this command:

```console
$ docker-compose up
```

Make and commit your changes. Make sure the commands ``npm run build`` and `docker-compose up` are working.

### Commmit

Before begin to write some code create a branch :

```console
# For a feature always namespace your branch with `feature`
$ git branch -b feature/my-super-feat

# For a hot fix always namespace your branch with `fix`
$ git branch -b fix/fix-a-big-trouble
```

This repository use [gitmoji](https://gitmoji.dev/) as commit convention. You can write commit manually or use the gitmoji-cli :

```console
$ npm install -g gitmoji-cli
```

This is an example of feature commit :

```
✨ My super feature
```


Finally send a GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).