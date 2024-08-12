import chalk from 'chalk';
import * as CommandLinePluginRetriever from '../services/CommandLinePluginRetriever.js';
import * as PromptPluginRetriever from '../services/PromptPluginRetriever.js';
import * as PluginInstallator from '../services/PluginInstallator.js';
import { generatePluginsFile } from '../services/PluginConfiguration.js';

/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Install plugin.
 * @param {Object} program - Commander program to run command.
 */
export default function setup(program) {
  program.command('install')
    .description('Install plugin in leto-modelizer')
    .action(async () => {
      const userInput = process.argv.slice(3);
      const { retrieve } = userInput.length !== 0
        ? CommandLinePluginRetriever
        : PromptPluginRetriever;

      let plugins = await retrieve(userInput, 'install');

      if (plugins.length === 0) {
        console.log(`\n${chalk.red('✘')} No plugin has been installed.`);

        return;
      }

      console.log(`\n${chalk.blue.bold('⚒')} Installing plugin(s) via npm...`);

      let hasError = false;

      plugins.forEach((plugin) => {
        if (PluginInstallator.install(plugin)) {
          console.log(`\n${chalk.green('✔')} Installation of ${plugin.name}@${plugin.version} successful !`);
        } else {
          hasError = true;
          plugins = plugins.filter(({ name }) => plugin.name !== name);

          console.log(`\n${chalk.red('✘')} An error occurred while installing ${plugin.name} !`);
        }
      });

      if (hasError) {
        console.log(`\n${chalk.yellow('⚠')} Installation is done with error(s).`);
      } else {
        console.log(`\n${chalk.green('✔')} Installation is done.`);
      }

      generatePluginsFile();
    });
}
