import chalk from 'chalk';
import fs from 'fs';
import * as CommandLinePluginRetriever from '../services/CommandLinePluginRetriever.js';
import * as PromptPluginRetriever from '../services/PromptPluginRetriever.js';
import * as PluginInstallator from '../services/PluginInstallator.js';
import { getPluginsFromPackage } from '../services/PluginConfiguration.js';

/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Sanitize name to remove '-' and capitalize letter after.
 * @param {string} name - Name to sanitize.
 * @returns {string} Sanitized name.
 */
function sanitize(name) {
  return name.replaceAll(/(-.)/ig, (v) => v.replace('-', '').toUpperCase());
}

/**
 * Install plugin.
 * @param {Object} program - Program to run command.
 */
export default function setup(program) {
  program.command('install')
    .description('Install plugin in leto-modelizer')
    .action(async () => {
      const userInput = process.argv.slice(3);
      const { retrieve } = userInput.length !== 0
        ? CommandLinePluginRetriever
        : PromptPluginRetriever;

      let plugins = await retrieve(userInput);

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

      if (!fs.existsSync('src/plugins')) {
        fs.mkdirSync('src/plugins');
      }

      const allInstalledPlugins = getPluginsFromPackage();

      fs.writeFileSync('src/plugins/index.js', [
        ...allInstalledPlugins.map(
          (plugin) => `import ${sanitize(plugin.name)} from '${plugin.packageKey}';`,
        ),
        '\nexport default {',
        ...allInstalledPlugins.map((plugin) => `  ${sanitize(plugin.name)},`),
        '};\n',
      ].join('\n'));

      console.log('\nList of all  installed plugins:');
      allInstalledPlugins.forEach((plugin) => {
        console.log(`\n  • ${plugin.name}@${plugin.version}`);
      });
    });
}
