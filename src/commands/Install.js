const chalk = require('chalk');
const fs = require('fs');
const { execSync } = require('node:child_process');
const helper = require('../services/helper');

exports.setup = (program) => {
  program.command('install')
    .description('Install plugin in leto-modelizer')
    .action(async () => {
      const pluginNames = [];
      const repositoryUrls = [];
      const userInput = process.argv.slice(3);

      if (userInput.length !== 0) {
        const customPlugin = helper.getPluginByArguments(userInput);

        if (!customPlugin.name || !customPlugin.url) {
          console.log(`\n${chalk.red('✘')} No plugin has been installed.`);
          return;
        }

        pluginNames.push(customPlugin.name);
        repositoryUrls.push(customPlugin.url);
      } else {
        const plugins = await helper.getPluginsByPrompt();

        if (plugins.length === 0) {
          return;
        }

        plugins.forEach((plugin) => {
          pluginNames.push(plugin.name);
          repositoryUrls.push(plugin.url);
        });
      }
      console.log(`\n${chalk.blue.bold('⚒')} Installing plugin(s) via npm...`);
      execSync(`npm install -s ${repositoryUrls.join(' ')}`);

      console.log(`\n${chalk.green('✔')} Installation succeed !`);

      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const isPluginInstalled = pluginNames
        .every((plugin) => Object.keys(packageJson.dependencies).includes(plugin));

      if (!isPluginInstalled) {
        console.log(`\n${chalk.red('✘')} Could not find plugin name in package.json dependencies`);
        return;
      }

      const content = {
        plugins: [
          ...pluginNames,
        ],
      };

      if (fs.existsSync('plugin.config.json')) {
        const pluginConfig = JSON.parse(fs.readFileSync('plugin.config.json', 'utf8'));
        const isPluginAlreadyInstalled = pluginNames
          .every((plugin) => pluginConfig.plugins.includes(plugin));

        if (isPluginAlreadyInstalled) {
          content.plugins = [...new Set(pluginConfig.plugins)];
        } else {
          content.plugins = [...new Set(content.plugins.concat(pluginConfig.plugins))];
        }
      }

      fs.writeFileSync('plugin.config.json', JSON.stringify(content, null, 2));
      console.log(`\n${chalk.yellow('⚠')} If all your plugins are installed, please ${chalk.bold('\'npm run plugin:init\'')}.\n`);
    });
};
