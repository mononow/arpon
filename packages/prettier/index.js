const { lineLength } = require('./shared.cjs');

module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: lineLength,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: true,
  plugins: [],
  pluginSearchDirs: false,
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
