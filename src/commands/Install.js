const chalk = require('chalk');
const fs = require('fs');
const { execSync } = require('node:child_process');
const pluginPrompt = require('../prompts/Plugin');

exports.setup = (program) => {
  program.command('install')
    .description('Install plugin in leto-modelizer')
    .action(async () => {
      let pluginName;
      let repositoryUrl;
      const argumentsArray = process.argv.slice(3);

      const parseArguments = (args) => {
        const parsedArgs = {};
        args.forEach((arg) => {
          const [name, value] = arg.split('=');
          parsedArgs[name] = value;
        });
        return parsedArgs;
      };

      if (argumentsArray.length !== 0) {
        const args = parseArguments(argumentsArray);
        pluginName = args['repository-name'];
        repositoryUrl = args['repository-url'];
        const isValidPluginName = /^[a-zA-Z\s-]+$/.test(pluginName);
        const isValidRepositoryUrl = /^(?:git@|http:\/\/|https:\/\/).+\.git(#.+)?$/.test(repositoryUrl);
        if (!isValidPluginName || !isValidRepositoryUrl) {
          console.log(`\n${chalk.red('✘')} Repository name and/or url invalid.`);
          return;
        }
      } else {
        pluginName = (await pluginPrompt.getName()).pluginName;
        repositoryUrl = (await pluginPrompt.getRepositoryUrl()).repositoryUrl;
      }

      console.log(`\n${chalk.blue.bold('⚒')} Installing plugin via npm...`);
      execSync(`npm install -s "${repositoryUrl}"`);

      console.log(`\n${chalk.green('✔')} Installation succeed !`);

      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const isPluginInstalled = Object
        .keys(packageJson.dependencies)
        .includes(pluginName);
      if (!isPluginInstalled) {
        console.log(`\n${chalk.red('✘')} Could not find plugin name in package.json dependencies`);
        return;
      }

      const content = {
        plugins: [
          pluginName,
        ],
      };

      if (fs.existsSync('plugin.config.json')) {
        const pluginConfig = JSON.parse(fs.readFileSync('plugin.config.json', 'utf8'));
        if (pluginConfig.plugins.includes(pluginName)) {
          content.plugins = pluginConfig.plugins;
        } else {
          content.plugins = content.plugins.concat(pluginConfig.plugins);
        }
      }

      fs.writeFileSync('plugin.config.json', JSON.stringify(content, null, 2));
      console.log(`\n${chalk.yellow('⚠')} If you have install all your plugin, please ${chalk.bold('\'npm run plugin:init\'')}.\n`);
    });
};
