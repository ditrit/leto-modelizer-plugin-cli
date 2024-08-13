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

/**
 * Sanitize name to remove '-' and capitalize letter after.
 * @param {string} name - Name to sanitize.
 * @returns {string} Sanitized name.
 */
function sanitize(name) {
  return name.replaceAll(/(-.)/ig, (v) => v.replace('-', '').toUpperCase());
}

/**
 * Generate `src/plugins/index.js` that list of installed plugin to be used in Leto-Modelizer.
 */
export function generatePluginsFile() {
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

  console.log('\nList of all installed plugins:');
  allInstalledPlugins.forEach((plugin) => {
    console.log(`\n  • ${plugin.name}@${plugin.version}`);
  });
}
