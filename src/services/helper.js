const chalk = require('chalk');
const fs = require('fs');
const pluginPrompt = require('../prompts/Plugin');

const pluginNameRegex = /^[a-zA-Z\s-]+$/;
const repositoryUrlRegex = /^(?:git@|http:\/\/|https:\/\/).+\.git(#.+)?$/;
const customPlugin = { name: null, url: null };

async function onePluginToInstall(plugins) {
  console.log(`\n${chalk.italic(' One plugin available')}\n`);

  const { name, url, version } = plugins[0];
  const confirmInstall = (await pluginPrompt.confirmInstallation({ name, version })).value;

  if (!confirmInstall) {
    console.log(`\n${chalk.red('✘')} No plugin has been installed.`);
    return [];
  }

  return [{ name, url }];
}

async function multiPluginsToInstall(plugins) {
  const pluginNames = plugins.map(({ name }) => name);
  console.log(`\n${chalk.blue.bold('⚒')} Official plugin(s) : ${pluginNames.join(', ')}.\n`);

  const pluginList = plugins.map((plugin) => ({ title: `${plugin.name} (${plugin.version})`, value: plugin.url }));
  const selectedPlugins = (await pluginPrompt.getOfficialPlugins(pluginList)).type;

  if (selectedPlugins.length === 0) {
    console.log(`\n${chalk.red('✘')} No plugin has been installed.`);
    return [];
  }

  return selectedPlugins
    .map((url) => ({
      name: plugins.find((plugin) => plugin.url === url).name,
      url,
    }));
}

function parseArguments(args) {
  const parsedArgs = {};
  args.forEach((arg) => {
    const [name, value] = arg.split('=');
    parsedArgs[name] = value;
  });
  return parsedArgs;
}

async function getOfficialPlugins() {
  let selectedPlugins = [];

  if (fs.existsSync('cli.config.json')) {
    const plugins = JSON.parse(fs.readFileSync('cli.config.json', 'utf8'));

    if (plugins.length === 0) {
      console.log(`\n${chalk.yellow('⚠')} No official plugin to install.`);
    } else if (plugins.length === 1) {
      selectedPlugins = await onePluginToInstall(plugins);
    } else {
      selectedPlugins = await multiPluginsToInstall(plugins);
    }
  } else {
    console.log(`\n${chalk.yellow('⚠')} No official plugin to install.`);
  }
  return selectedPlugins;
}

async function getCustomPlugin() {
  customPlugin.name = (await pluginPrompt.getName()).pluginName;
  customPlugin.url = (await pluginPrompt.getRepositoryUrl()).repositoryUrl;
  return customPlugin;
}

exports.rules = { pluginNameRegex, repositoryUrlRegex };

exports.getPluginByArguments = (userInput) => {
  const args = parseArguments(userInput);
  const isValidPluginName = pluginNameRegex.test(args['repository-name']);
  const isValidRepositoryUrl = repositoryUrlRegex.test(args['repository-url']);

  if (!isValidPluginName || !isValidRepositoryUrl) {
    console.log(`\n${chalk.red('✘')} Repository name and/or url invalid.`);
    return customPlugin;
  }

  customPlugin.name = args['repository-name'];
  customPlugin.url = args['repository-url'];
  return customPlugin;
};

exports.getPluginsByPrompt = async () => {
  const installationType = (await pluginPrompt.getInstallationType()).type;

  if (installationType === 'official') {
    const officialPlugins = await getOfficialPlugins();

    if (officialPlugins.length === 0) {
      return [];
    }

    return officialPlugins.map((plugin) => ({ name: plugin.name, url: plugin.url }));
  }
  const customPromptPlugin = await getCustomPlugin();

  if (!customPromptPlugin.name || !customPromptPlugin.url) {
    console.log(`\n${chalk.red('✘')} No plugin has been installed.`);
    return [];
  }

  return [{ name: customPromptPlugin.name, url: customPromptPlugin.url }];
};
