const pluginNameRegex = /^[a-zA-Z\s-]+$/;
const repositoryUrlRegex = /^(?:git@|http:\/\/|https:\/\/).+\.git(#.+)?$/;

/**
 * Class used for validating a plugin's name and repository URL.
 */
class PluginValidator {
  /**
   * Default constructor.
   *
   * @param {String} name - Plugin name.
   * @param {String} url - Plugin repository URL.
   */
  constructor(name, url) {
    this.name = name || null;
    this.url = url || null;
  }

  /**
   * Check if the plugin name and the repository URL are valid.
   * @returns {boolean} True if the plugin name and the repository URL are valid, otherwise false.
   */
  isValid() {
    return this.isPluginNameValid() && this.isRepositoryUrlValid();
  }

  /**
   * Check if the plugin name is valid.
   * @returns {boolean} True if the plugin name is valid, otherwise false.
   */
  isPluginNameValid() {
    return pluginNameRegex.test(this.name);
  }

  /**
   * Check if the repository URL is valid.
   * @returns {boolean} True if the repository URL is valid, otherwise false.
   */
  isRepositoryUrlValid() {
    return repositoryUrlRegex.test(this.url);
  }
}

module.exports = PluginValidator;
