'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const strings = require('../../helpers/strings');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the fantastic ' +
          chalk.red('generator-protractor-typescript') +
          ' ' +
          chalk.yellow('for awesome page objects!')
      )
    );

    const prompts = {
      once: [
        {
          type: 'input',
          name: 'className',
          message: 'What is the class name?',
          default: 'App'
        },
        {
          type: 'input',
          name: 'fileName',
          message: 'What is the file name?',
          default: 'app.po'
        },
        {
          type: 'input',
          name: 'location',
          message: 'Would you like to change the file location?',
          default: 'e2e/app/'
        },
        {
          type: 'confirm',
          name: 'addElement',
          message: 'Would you like to add an element to page object?',
          default: false
        }
      ],
      loop: [
        {
          type: 'input',
          name: 'elementName',
          message: 'What is the element name?',
          default: 'ElementName'
        },
        {
          type: 'confirm',
          name: 'elementUniqueness',
          message: 'Is the element unique on the page?',
          default: true
        },
        {
          type: 'list',
          name: 'selectorType',
          message: 'How you pretend to query element?',
          choices: ['by css', 'by link text'],
          default: 'by css'
        },
        {
          type: 'input',
          name: 'elementSelector',
          message: 'Which is the element selector?',
          default: 'selector'
        },
        {
          type: 'confirm',
          name: 'oneMore',
          message: 'Would you like to add another element to page object?',
          default: false
        }
      ]
    };

    this.props = {
      file: {},
      elementsInfo: []
    };

    return this.prompt(prompts.once).then(props => {
      // To access props later use this.props.someAnswer;
      this.props.file = props;
      if (!props.addElement) {
        return;
      }

      const loopPrompt = this.prompt(prompts.loop);
      const loopThen = props => {
        const oneMorePrompt = props.oneMore;
        this.props.elementsInfo.push(props);
        if (oneMorePrompt) {
          return this.prompt(prompts.loop).then(loopThen);
        }
      };

      return loopPrompt.then(loopThen);
    });
  }

  writing() {
    const props = this.props;
    const selectors = [];
    const declarations = [];
    const constructorStatements = [];

    props.elementsInfo.forEach(info => {
      const elementVar = strings.firstToLower(info.elementName);
      const elementConst = strings.capitalize(info.elementName);
      const uniqueElement = info.elementUniqueness;
      const elementType = uniqueElement ? 'ElementFinder' : 'ElementArrayFinder';
      const elementFindMethod = uniqueElement ? 'element' : 'element.all';
      const searchByLinkText = info.selectorType === 'by link text';
      const byMethod = searchByLinkText ? 'by.linkText' : 'by.css';
      const selector = elementConst + (searchByLinkText ? 'LinkText' : 'Selector');
      selectors.push(`const ${selector} = '${info.elementSelector}';`);
      declarations.push(`${elementVar}: ${elementType} = null;`);
      constructorStatements.push(
        `this.${elementVar} = ${elementFindMethod}(${byMethod}(${selector}));`
      );
    });
    const procReplacer = {
      process: function(content) {
        let newContent = content
          .toString()
          .split('/* Class Name */')
          .join(props.file.className);

        if (!props.elementsInfo.length) {
          return newContent;
        }

        newContent = newContent
          .toString()
          .split('/* Members Declaration */')
          .join(declarations.join('\n\t'));
        newContent = newContent
          .toString()
          .split('/* Constructor Body */')
          .join(constructorStatements.join('\n\t\t'));
        newContent = newContent
          .toString()
          .split('/* Elements Selector */')
          .join(selectors.join('\n\t'));
        return newContent;
      }
    };

    this.fs.copy(
      this.templatePath('po.ts'),
      this.destinationPath(this.props.file.location + this.props.file.fileName + '.ts'),
      procReplacer
    );
  }

  install() {}
};
