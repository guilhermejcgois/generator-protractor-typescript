'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the fantastic ' +
          chalk.red('generator-protractor-typescript') +
          ' ' +
          chalk.yellow('for awesome auth0 page object!')
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'className',
        message: 'Would you like to change the class name?',
        default: 'Auth0Page'
      },
      {
        type: 'input',
        name: 'fileName',
        message: 'Would you like to change the file name?',
        default: 'auth0.po'
      },
      {
        type: 'input',
        name: 'location',
        message: 'Would you like to change the file location?',
        default: 'e2e/'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('auth0.po.ts'),
      this.destinationPath(this.props.location + this.props.fileName + '.ts'),
      { pageObjectClass: this.props.className }
    );
  }
};
