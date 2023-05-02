const chalk = require('chalk');
const fs = require('fs');
const pluginPrompt = require('../prompts/Plugin');
const PluginValidator = require('./PluginValidator');

/**
 * Get plugin name and url from prompts and check if they are valid.
 *
 * @returns {Promise<Array<Object>>} A promise with an array of object containing
 * the validated plugin name and URL, otherwise an empty array.
 */
async function getCustomPlugin() {
  const { pluginName } = (await pluginPrompt.getName());
  const { repositoryUrl } = (await pluginPrompt.getRepositoryUrl());
  const validator = new PluginValidator(pluginName, repositoryUrl);

  if (!validator.isValid()) {
    return [];
  }

  return [{ name: pluginName, url: repositoryUrl }];
}

/**
 * Confirm the installation of a single plugin with prompt.
 *
 * @param {Array<Object>} plugin - Array with a single plugin object.
 * @returns {Promise<Array<Object>>} A promise with an array containing a plugin object
 * otherwise an empty array.
 */
async function getOnePluginToInstall(plugin) {
  console.log(`\n${chalk.italic(' One plugin available')}\n`);

  const { name, url, version } = plugin[0];
  const { value } = (await pluginPrompt.confirmInstallation({ name, version }));

  return value ? [{ name, url }] : [];
}

/**
 * Select one or more plugins to install from a prompt list of available plugins.
 *
 * @param {Array<Object>} plugins - Array of objects representing the available plugins.
 * @returns {Promise<Array<Object>>} A promise with an array of selected plugin objects,
 * otherwise an empty array.
 */
async function getMultiPluginsToInstall(plugins) {
  const pluginNames = plugins.map(({ name }) => name).join(', ');

  console.log(`\n${chalk.italic(' Official plugin(s) : ')}${chalk.italic(pluginNames)}\n`);

  const pluginList = plugins.map((plugin) => ({ title: `${plugin.name} (${plugin.version})`, value: plugin.url }));
  const selectedPlugins = (await pluginPrompt.getOfficialPlugins(pluginList)).type;

  if (!selectedPlugins || selectedPlugins.length === 0) {
    return [];
  }

  return selectedPlugins
    .map((url) => ({
      name: plugins.find((plugin) => plugin.url === url).name,
      url,
    }));
}

/**
 * Read the contents of the 'leto-modelizer-plugin-cli.json' file
 * and parse it to return the list of official plugins.
 *
 * @returns {Array} The list of official plugins, otherwise an empty array.
 */
function getPluginsFromConfig() {
  if (!fs.existsSync('leto-modelizer-plugin-cli.json')) {
    return [];
  }

  return JSON.parse(fs.readFileSync('leto-modelizer-plugin-cli.json', 'utf8'));
}

/**
 * Get list of official plugins, call the corresponding function to prompt the user
 * to confirm or to select official plugin(s) to install.
 *
 * @returns {Promise<Array>} An array of objects representing the plugin(s),
 * otherwise an empty array.
 */
async function getOfficialPlugins() {
  const plugins = getPluginsFromConfig();

  if (plugins.length === 0) {
    console.log(`\n${chalk.red('✘')} No official plugins available.`);

    return [];
  }

  if (plugins.length === 1) {
    return getOnePluginToInstall(plugins);
  }

  return getMultiPluginsToInstall(plugins);
}

/**
 * Prompt the user to choose between installing an official or custom plugin.
 *
 * @returns {Promise<Array<Object>>} An array of plugin objects to be installed,
 * which contain the name and URL of each selected plugin. If no plugins are available or selected,
 * an empty array is returned.
 */
async function retrieve() {
  const installationType = (await pluginPrompt.getInstallationType()).type;

  if (installationType === 'official') {
    return getOfficialPlugins();
  }

  return getCustomPlugin();
}

module.exports = {
  retrieve,
};
