'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('protractor-typescript:po', () => {
  const defAnswers = {
    className: 'App',
    fileName: 'app.po',
    location: 'e2e/app/',
    addElement: false,
    elementName: 'ElementName',
    elementUniqueness: true,
    selectorType: 'by css',
    elementSelector: 'selector',
    oneMore: false
  };

  const spec = answers => () => {
    return helpers
      .run(path.join(__dirname, '../generators/po'))
      .withPrompts(answers || {})
      .then(() => {
        const firstLetter = s => fn => s.replace(/\b\w/g, l => l[fn]());
        const [fileName, className, location, addElement] = (answers && [
          answers.fileName || defAnswers.fileName,
          answers.className || defAnswers.className,
          answers.location || defAnswers.location,
          answers.addElement || defAnswers.addElement
        ]) || [
          defAnswers.fileName,
          defAnswers.className,
          defAnswers.location,
          defAnswers.addElement
        ];
        const filePath = location + fileName + '.ts';

        assert.file(filePath);
        assert.fileContent(filePath, `export class ${className}Page {`);

        if (addElement) {
          const [elementName, elementUniqueness, selectorType, elementSelector] = [
            answers.elementName || defAnswers.elementName,
            answers.elementUniqueness || defAnswers.elementUniqueness,
            answers.selectorType || defAnswers.selectorType,
            answers.elementSelector || defAnswers.elementSelector
          ];

          const element = firstLetter(elementName);
          const elementType = elementUniqueness ? 'ElementFinder' : 'ElementArrayFinder';
          const elementFindMethod = elementUniqueness ? 'element' : 'element.all';
          const elementVar = element('toLowerCase');
          const byMethod = selectorType === 'by css' ? 'by.css' : 'by.linkText';
          const selector =
            element('toUpperCase') + selectorType === 'by css' ? 'Selector' : 'LinkText';
          assert.fileContent(filePath, `const ${selector} = '${elementSelector}';`);
          assert.fileContent(filePath, `${elementVar}: ${elementType} = null;`);
          assert.fileContent(
            filePath,
            `this.${elementVar} = ${elementFindMethod}(${byMethod}(${selector}))`
          );
        } else {
          assert.fileContent(filePath, '/* Elements Selector */');
          assert.fileContent(filePath, '/* Members Declaration */');
          assert.fileContent(filePath, '/* Constructor Body */');
        }
      });
  };

  it('with default options', spec());

  it(
    'with custom options and default element',
    spec({
      className: 'YoppPage',
      fileName: 'yopp.yo',
      location: 'y2y/',
      addElement: true
    })
  );

  describe('with custom options and unique element', () => {
    it(
      'by css',
      spec({
        className: 'YoppPage',
        fileName: 'yopp.yo',
        location: 'y2y/',
        addElement: true,
        elementName: 'MyElement',
        elementUniqueness: true,
        selectorType: 'by css',
        elementSelector: 'my-element'
      })
    );

    it(
      'by link text',
      spec({
        className: 'YoppPage',
        fileName: 'yopp.yo',
        location: 'y2y/',
        addElement: true,
        elementName: 'MyElement',
        elementUniqueness: true,
        selectorType: 'by link text',
        elementSelector: 'my-element'
      })
    );
  });

  describe('with custom options and non-unique element', () => {
    it(
      'by css',
      spec({
        className: 'YoppPage',
        fileName: 'yopp.yo',
        location: 'y2y/',
        addElement: true,
        elementName: 'MyElement',
        elementUniqueness: true,
        selectorType: 'by css',
        elementSelector: 'my-element'
      })
    );

    it(
      'by link text',
      spec({
        className: 'YoppPage',
        fileName: 'yopp.yo',
        location: 'y2y/',
        addElement: true,
        elementName: 'MyElement',
        elementUniqueness: true,
        selectorType: 'by link text',
        elementSelector: 'my-element'
      })
    );
  });
});
