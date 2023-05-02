const fs = require('fs');
const { execSync } = require('node:child_process');

/**
 * Execute npm install command and read the package.json file to check the dependencies.
 *
 * @param {Object} plugin - Plugin to install.
 * @param {String} plugin.name - Name of the plugin.
 * @param {String} plugin.url - Url of the plugin.
 * @returns {Boolean} True if install command is done and the dependencies are updated,
 * otherwise false.
 */
function install({ name, url }) {
  try {
    execSync(`npm install -s ${url}`);
  } catch (err) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  return Object.keys(packageJson.dependencies).includes(name);
}

/**
 * Generate plugin configuration file.
 *
 * @param {Array<Object>} plugins - Array of plugin object.
 */
function generateConfigurationFile(plugins) {
  const content = {
    plugins: plugins.map((plugin) => plugin.name),
  };

  if (fs.existsSync('plugin.config.json')) {
    const pluginConfig = JSON.parse(fs.readFileSync('plugin.config.json', 'utf8'));
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const isPluginAlreadyInstalled = plugins
      .every(({ name }) => Object.keys(packageJson.dependencies).includes(name));

    if (isPluginAlreadyInstalled) {
      content.plugins = [...new Set(pluginConfig.plugins)];
    } else {
      content.plugins = [...new Set(content.plugins.concat(pluginConfig.plugins))];
    }
  }

  fs.writeFileSync('plugin.config.json', JSON.stringify(content, null, 2));
}

module.exports = {
  install,
  generateConfigurationFile,
};
