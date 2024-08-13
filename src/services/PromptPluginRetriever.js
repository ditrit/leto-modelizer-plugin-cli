import chalk from 'chalk';
import * as pluginPrompt from '../prompts/Plugin.js';
import { getPluginsFromConfig } from './PluginConfiguration.js';
/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Confirm the installation of a single plugin with prompt.
 *
 * @param {Plugin[]} plugins - Array with a single plugin object.
 * @returns {Promise<Plugin[]>} A promise with an array containing a plugin object
 * otherwise an empty array.
 */
async function getOnePluginToInstall(plugins, action) {
  const value = (await pluginPrompt.confirmAction(plugins[0], action));

  return value ? plugins : [];
}

/**
 * Select one or more plugins to install from a prompt list of available plugins.
 *
 * @param {Plugin[]} plugins - Array of objects representing the available plugins.
 * @returns {Promise<Plugin[]>} A promise with an array of selected plugin objects,
 * otherwise an empty array.
 */
async function getMultiPluginsToInstall(plugins, action) {
  const selectedPlugins = await pluginPrompt.getOfficialPlugins(plugins, action);

  if (!selectedPlugins || selectedPlugins.length === 0) {
    return [];
  }

  return selectedPlugins;
}

/**
 * Get list of official plugins, call the corresponding function to prompt the user
 * to confirm or to select official plugin(s) to install.
 *
 * @returns {Promise<Plugin[]>} An array of objects representing the plugin(s),
 * otherwise an empty array.
 */
async function getOfficialPlugins(action) {
  const plugins = getPluginsFromConfig();

  if (plugins.length === 0) {
    console.log(`\n${chalk.red('✘')} No official plugins available.`);

    return [];
  }

  if (plugins.length === 1) {
    return getOnePluginToInstall(plugins, action);
  }

  return getMultiPluginsToInstall(plugins, action);
}

/**
 * Prompt the user to choose between installing an official or custom plugin.
 *
 * @returns {Promise<Plugin[]>} An array of plugin objects to be installed,
 * which contain the name and URL of each selected plugin. If no plugins are available or selected,
 * an empty array is returned.
 */
export async function retrieve(inputs, action) {
  return getOfficialPlugins(action);
}
