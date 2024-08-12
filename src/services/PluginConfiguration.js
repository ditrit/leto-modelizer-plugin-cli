import fs from 'fs';
import Plugin from '../models/Plugin.js';

/**
 * Read the contents of the 'leto-modelizer-plugin-cli.json' file
 * and parse it to return the list of official plugins.
 *
 * @returns {Plugin[]} The list of official plugins, otherwise an empty array.
 */
export function getPluginsFromConfig() {
  if (!fs.existsSync('leto-modelizer-plugin-cli.json')) {
    return [];
  }

  const plugins = JSON.parse(fs.readFileSync('leto-modelizer-plugin-cli.json', 'utf8'));

  return plugins.map((data) => new Plugin(data));
}

/**
 * Retrieve plugins from the 'leto-modelizer-plugin-cli.json' file
 * and include only those that are listed in the dependencies of 'package.json'.
 *
 * @returns {Plugin[]} The installed plugins, otherwise an empty array.
 */
export function getPluginsFromPackage() {
  const allPlugins = getPluginsFromConfig();
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  return Object.keys(packageJson.dependencies)
    .map((key) => allPlugins.find((plugin) => plugin.packageKey === key))
    .filter((value) => !!value);
}
