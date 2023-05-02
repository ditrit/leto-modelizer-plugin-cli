const chalk = require('chalk');
const CommandLinePluginRetriever = require('../services/CommandLinePluginRetriever');
const PromptPluginRetriever = require('../services/PromptPluginRetriever');
const PluginInstallator = require('../services/PluginInstallator');

exports.setup = (program) => {
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
          console.log(`\n${chalk.green('✔')} Installation of ${plugin.name} successful !`);
        } else {
          hasError = true;
          plugins = plugins.filter(({ name }) => plugin.name !== name);

          console.log(`\n${chalk.red('✘')} An error occured while installing ${plugin.name} !`);
        }
      });

      console.log(`\n${chalk.blue.bold('⚒')} Generating configuration file...`);

      PluginInstallator.generateConfigurationFile(plugins);

      if (hasError) {
        console.log(`\n${chalk.yellow('⚠')} Installation and configuration are done with error(s).`);
      } else {
        console.log(`\n${chalk.green('✔')} Installation and configuration are done.`);
      }

      console.log(`\n${chalk.yellow('⚠')} If all your plugins are installed, please ${chalk.bold('\'npm run plugin:init\'')}.\n`);
    });
};
