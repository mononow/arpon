module.exports = {
  command: 'new <command>',
  desc: 'Creation of new mononow related structures',
  builder: (yargs) => yargs.demand(2).commandDir('./commands'),
};
