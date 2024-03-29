/** Reusable yargs options */
const { PLATFORMS } = require('../../consts.js');

module.exports = {
  lintType: {
    description: "The type of file to lint: 'css' or 'js'",
    alias: ['t'],
    default: undefined,
    choices: ['css', 'js'],
  },
  target: {
    description: "The target environment for the app: 'pos' or 'browser'",
    alias: ['t'],
    default: 'pos',
    choices: ['browser', 'pos'],
  },
  development: {
    description: 'Disable minification. Good for debugging',
    alias: ['d'],
    default: false,
    type: 'boolean',
  },
  platform: {
    description: 'Choose the platform to build artifact',
    alias: ['pl'],
    type: 'array',
    default: ['GENERIC'],
    choices: [...PLATFORMS, 'all'],
  },
};
