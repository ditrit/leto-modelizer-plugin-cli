#! /usr/bin/env node
const { Command } = require('commander');
const commands = require('./commands');

const program = new Command();

program
  .name('leto-modelizer-plugin-cli')
  .description('CLI install and manage plugins in leto-modelizer')
  .version('1.0.0');

Object.keys(commands).forEach((command) => commands[command].setup(program));

program.parse();
