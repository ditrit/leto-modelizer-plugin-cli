import chalk from 'chalk';
import * as CommandLinePluginRetriever from '../services/CommandLinePluginRetriever.js';
import * as PromptPluginRetriever from '../services/PromptPluginRetriever.js';
import * as PluginUninstallator from '../services/PluginUninstallator.js';
import { generatePluginsFile } from '../services/PluginConfiguration.js';

/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Uninstall plugin.
 * @param {Object} program - Commander program to run command.
 */
export default function setup(program) {
  program.command('uninstall')
    .description('Uninstall plugin in leto-modelizer')
    .action(async () => {
      const userInput = process.argv.slice(3);
      const { retrieve } = userInput.length !== 0
        ? CommandLinePluginRetriever
        : PromptPluginRetriever;

      let plugins = await retrieve(userInput, 'uninstall');

      if (plugins.length === 0) {
        console.log(`\n${chalk.red('✘')} No plugin has been deleted.`);

        return;
      }

      console.log(`\n${chalk.blue.bold('⚒')} Deleting plugin(s) via npm...`);

      let hasError = false;

      plugins.forEach((plugin) => {
        if (PluginUninstallator.uninstall(plugin)) {
          console.log(`\n${chalk.green('✔')} Deletion of ${plugin.name}@${plugin.version} successful !`);
        } else {
          hasError = true;
          plugins = plugins.filter(({ name }) => plugin.name !== name);

          console.log(`\n${chalk.red('✘')} An error occurred while deleting ${plugin.name} !`);
        }
      });

      if (hasError) {
        console.log(`\n${chalk.yellow('⚠')} Deletion is done with error(s).`);
      } else {
        console.log(`\n${chalk.green('✔')} Deletion is done.`);
      }

      generatePluginsFile();

      console.log(`\n${chalk.yellow('⚠')} You may have to delete your 'node_modules' and reinstall all, here is command: ${chalk.bold('`rm -rf node_modules && npm install`')}.`);
    });
}
