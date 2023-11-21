const { fromWorkingDir, getPackage } = require('@arpon/utils');
const pico = require('picocolors');

const PKG = getPackage();

module.exports = {
  command: 'app <command>',
  desc: 'Arpon apps related commands',
  builder: (yargs) => {
    if (PKG == null) {
      console.error(pico.red('No "package.json" found. Is this a manydots app directory?"'));
      process.exit(1);
    }
    process.chdir(PKG.rootDir);

    if (typeof PKG.manydots === 'undefined') {
      console.error(
        pico.red(
          `No "manydots" property found at "${PKG.rootDir}" Is this an manydots app directory?"`,
        ),
      );
      process.exit(1);
    }

    /** Add the node_modules/.bin of the current app to the PATH env variable */
    process.env.PATH +=
      (process.platform === 'win32' ? ';' : ':') + fromWorkingDir('node_modules', '.bin');

    return yargs.demand(2).commandDir('./commands');
  },
};
