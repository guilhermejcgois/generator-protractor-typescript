'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

fdescribe('generator-protractor-typescript:app', () => {
  const defAnswers = {
    initialUrl: '/',
    baseUrl: 'http://localhost:4200/',
    baseTsconfigPath: 'tsconfig.json',
    outDirPath: 'out-tsc/'
  };

  const spec = answers => () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers || {})
      .then(() => {
        const initialUrl = (answers && answers.initialUrl) || defAnswers.initialUrl;
        const baseUrl = (answers && answers.baseUrl) || defAnswers.baseUrl;
        const baseTsconfigPath =
          (answers && answers.baseTsconfigPath) || defAnswers.baseTsconfigPath;
        const outDirPath = (answers && answers.outDirPath) || defAnswers.outDirPath;
        const projectName = 'abc';

        assert.file('protractor.conf.js');
        assert.fileContent('protractor.conf.js', `baseUrl: '${baseUrl}',`);
        assert.file('e2e/app.e2e-spec.ts');
        assert.fileContent(
          'e2e/app.e2e-spec.ts',
          `describe('${projectName} App', () => {`
        );
        assert.fileContent('e2e/app.e2e-spec.ts', `const initialUrl = '${initialUrl}';`);
        assert.file('e2e/app.po.ts');
        assert.file('e2e/tsconfig.e2e.json');
        assert.jsonFileContent('e2e/tsconfig.e2e.json', {
          extends: `../${baseTsconfigPath}`,
          compilerOptions: {
            outDir: `../${outDirPath}e2e`
          }
        });
      });
  };

  it('with default options', spec());
});
