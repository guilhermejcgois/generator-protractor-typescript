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
          chalk.yellow('for awesome protractor setup!')
      )
    );

    this.log(chalk.yellow('Note that all paths requested are relative to project root.'));

    const prompts = [
      {
        type: 'input',
        name: 'initialUrl',
        message: 'Which is the initial app url?',
        default: '/'
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Which is the base app url?',
        default: 'http://localhost:4200/'
      },
      {
        type: 'input',
        name: 'baseTsconfigPath',
        message: 'Where are your tsconfig file?',
        default: 'tsconfig.json'
      },
      {
        type: 'input',
        name: 'outDirPath',
        message:
          'Where are the project output generated? (relative path from project root)',
        default: 'out-tsc/'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const props = this.props;
    const copy = (fn, path, opt) =>
      this.fs[fn](this.templatePath(path), this.destinationPath(path), opt);

    copy('copy', 'e2e/app.po.ts');
    copy('copyTpl', 'e2e/app.e2e-spec.ts', {
      projectName: 'abc',
      initialUrl: props.initialUrl
    });
    copy('copyTpl', 'protractor.conf.js', {
      baseUrl: props.baseUrl
    });

    const tsConfigJson = this.fs.readJSON(this.templatePath('e2e/tsconfig.e2e.json'));
    tsConfigJson.extends = `../${props.baseTsconfigPath}`;
    tsConfigJson.compilerOptions.outDir = `../${props.outDirPath}e2e`;
    this.fs.writeJSON(this.destinationPath('e2e/tsconfig.e2e.json'), tsConfigJson);
  }

  install() {
    this.installDependencies();
  }
};
