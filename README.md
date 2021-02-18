<h1 align="center" style="display:flex;align-items:center;justify-content:center;">
Chatot
</h1>

<p  align="center">
  <a  href="https://www.linkedin.com/in/luan-souza-6b07b1171/">
    <img  alt="Luan Souza"  src="https://img.shields.io/badge/-Luan Souza-282A36?style=for-the-badge&logo=Linkedin&logoColor=white"  />
  </a>

  <img  alt="Repository size"  src="https://img.shields.io/github/repo-size/LuanSilveiraSouza/chatot?color=282A36&style=for-the-badge">

  <a  href="https://github.com/LuanSilveiraSouza/chatot/commits/master">
    <img  alt="GitHub last commit"  src="https://img.shields.io/github/last-commit/LuanSilveiraSouza/chatot?color=282A36&style=for-the-badge">
  </a>

  <img  alt="License"  src="https://img.shields.io/badge/license-MIT-282A36?&style=for-the-badge">
</p>

# :pushpin: Sumary

* [Introduction](#paperclip-introduction)
* [Technologies](#computer-technologies)
* [How to Run](#rocket-how-to-use)
* [Bugs and Issues](#bug-bugs-and-issues)
* [Contributing](#man_mechanic-contributing)
* [License](#books-license)

# :paperclip: Introduction

Chatot is a Web App made with Node.JS. It pretends to be a simple chat application, focused on the technologies around problems related to those type of system. So for example, it not have authentication and authorization implementations, because this is not the focus of the project.
It uses concepts like Clean Architecture to build-up the structural parts, Docker for easy infrastructure management and Tests to code coverage.

# :computer: Technologies

* [NodeJS](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/  )
* [Jest](https://jestjs.io/)
* [Supertest](https://github.com/visionmedia/supertest  )
* [Socket.io](https://socket.io/)
* [Docker](https://www.docker.com/)
* [React](https://reactjs.org/)
* [Chackra UI](https://chakra-ui.com/)
* [Recoil](https://recoiljs.org/)

# :rocket: How to Run

## Backend

```bash
# Build
$ cd server

$ docker-compose build

# Prod mode
$ docker-compose -f docker-compose.yml up

# Dev mode
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Build
$ npm build

# Test
$ npm test
```

## Frontend

```bash
$ cd web

# Use NPM or Yarn
$ yarn install

# Dev mode
$ yarn start
```

After start, the site will be acessed at http://localhost:8080

# :bug: Bugs and Issues

Feel free to open new issues and colaborate with others issues in [Chatot Issues](https://github.com/LuanSilveiraSouza/chatot/issues)

# :man_mechanic: Contributing

This project is completely open source, so if you want, consider forking it and making PRs with the changes you think its helpful to the project growns.

# :books: License

Released in 2020 under [MIT License](https://opensource.org/licenses/MIT)

Made with :heart: by Luan Souza.