import { Command } from 'commander';
import commands from './commands/index.js';

const program = new Command();

program
  .name('leto-modelizer-plugin-cli')
  .description('CLI install and manage plugins in leto-modelizer')
  .version('1.0.0');

Object.keys(commands).forEach((command) => commands[command](program));

program.parse();
