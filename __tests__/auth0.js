'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('protractor-typescript:auth0', () => {
  const defAnswers = {
    className: 'Auth0Page',
    fileName: 'auth0.po',
    location: 'e2e/'
  };

  const spec = answers => () => {
    return helpers
      .run(path.join(__dirname, '../generators/auth0'))
      .withPrompts(answers || {})
      .then(() => {
        const fileName = (answers && answers.fileName) || defAnswers.fileName;
        const className = (answers && answers.className) || defAnswers.className;
        const location = (answers && answers.location) || defAnswers.location;
        const filePath = location + fileName + '.ts';
        assert.file(filePath);
        assert.fileContent(filePath, `export class ${className} {`);
      });
  };

  it('with default options', spec());

  it(
    'with custom options',
    spec({ className: 'Yoth0Page', fileName: 'yoth0.yo', location: 'y2y/' })
  );

  it(
    'with custom names only',
    spec({ className: 'OwnAuth0Page', fileName: 'own-auth0.po' })
  );
});
