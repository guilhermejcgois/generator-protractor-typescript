# generator-protractor-typescript [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/guilhermejcgois/generator-protractor-typescript.svg)](https://greenkeeper.io/)
> Generator for typescript projects that uses Protractor. Protractor is an end-to-end test framework for Angular and AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

Table of Contents
=================
* [Installation](#installation)
* [Generators](#generators)
   * [App](#app)
   * [Auth0 Page Object](#auth0-page-object)
   * [Page Object](#page-object)
* [Contribute](#contribute)
* [Changelog](#changelog)
* [Getting To Know Yeoman](#getting-to-know-yeoman)
* [License](#license)


## Installation

First, install [Yeoman](http://yeoman.io) and generator-protractor-typescript using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-protractor-typescript
```

Then generate your new project:

```bash
yo protractor-typescript
```



## Generators

Available generators:

* [protractor-typescript](#app)
* [protractor-typescript:auth0](#auth0-page-object)
* [protractor-typescript:po](#page-object)

### App
Sets up protractor in existing project with a simple spec that only verifies if is possible to navigate to project initial URL. Also, a page object class is generated too with some nice methods working out the box.

Question spoilers:
```bash
$ yo protractor-typescript

     _-----_     ╭──────────────────────────╮
    |       |    │ Welcome to the fantastic │
    |--(o)--|    │ generator-protractor-typ │
   `---------´   │    escript for awesome   │
    ( _´U`_ )    │     protractor setup!    │
    /___A___\   /╰──────────────────────────╯
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

Note that all paths requested are relative to project root.
? Which is the initial app url? (/)
? Which is the base app url? (http://localhost:4200/)
? Where are your tsconfig file? (tsconfig.json)
? Where are the project output generated? (relative path from project root) (out-tsc/)
```

### Auth0 Page Object
Add a page object for Auth0 login form.

Question spoilers:
```bash
$ yo protractor-typescript:auth0

     _-----_     ╭──────────────────────────╮
    |       |    │ Welcome to the fantastic │
    |--(o)--|    │ generator-protractor-typ │
   `---------´   │    escript for awesome   │
    ( _´U`_ )    │    auth0 page object!    │
    /___A___\   /╰──────────────────────────╯
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Would you like to change the class name? (Auth0Page)
? Would you like to change the file name? (auth0.po)
? Would you like to change the file location? (e2e/)
```

### Page Object
Add a page object. Also, you can start your page object with the page element initialized.

Question spoilers:
```bash
$ yo protractor-typescript:auth0

     _-----_     ╭──────────────────────────╮
    |       |    │ Welcome to the fantastic │
    |--(o)--|    │ generator-protractor-typ │
   `---------´   │ escript for awesome page │
    ( _´U`_ )    │         objects!         │
    /___A___\   /╰──────────────────────────╯
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? What is the class name? (App) 
? What is the file name? (app.po)
? Would you like to change the file location? (e2e/app/)
? Would you like to add an element to page object? (y/N)
# If previous question is yes
? What is the element name? (ElementName)
? Is the element unique on the page? (Y/n)
? How you pretend to query element? (Use arrow keys)
❯ by css 
  by link text
? Which is the element selector? (selector)
? Would you like to add another element to page object? (y/N)
# If previous question is yes, ask again the 5 previous question
```

## Contribute

> Section under construction

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/guilhermejcgois/generator-protractor-typescript/releases)


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Guilherme Gois]()


[npm-image]: https://badge.fury.io/js/generator-protractor-typescript.svg
[npm-url]: https://npmjs.org/package/generator-protractor-typescript
[travis-image]: https://travis-ci.org/guilhermejcgois/generator-protractor-typescript.svg?branch=master
[travis-url]: https://travis-ci.org/guilhermejcgois/generator-protractor-typescript
[daviddm-image]: https://david-dm.org/guilhermejcgois/generator-protractor-typescript.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/guilhermejcgois/generator-protractor-typescript
[coveralls-image]: https://coveralls.io/repos/guilhermejcgois/generator-protractor-typescript/badge.svg
[coveralls-url]: https://coveralls.io/r/guilhermejcgois/generator-protractor-typescript
