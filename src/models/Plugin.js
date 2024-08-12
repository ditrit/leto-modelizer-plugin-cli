/**
 * Class that represents a plugin in configuration file.
 * @class
 */
class Plugin {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {string} [props.displayName] - Display name of plugin.
   * @param {string} [props.name] - Package name of plugin.
   * @param {string} [props.scope] - Scope/organisation of plugin.
   * @param {string} [props.url] - URL of plugin.
   * @param {string} [props.version] - Package version of plugin.
  */
  constructor(props = {
    id: null,
    displayName: null,
    name: null,
    scope: null,
    url: null,
    version: null,
  }) {
    /**
     * Display name of plugin.
     * @type {string}
     */
    this.displayName = props.displayName || props.name || null;
    /**
     * Package name of plugin.
     * @type {string}
     */
    this.name = props.name || null;
    /**
     * Scope/organisation of plugin.
     * @type {string}
     */
    this.scope = props.scope || null;
    /**
     * URL of plugin.
     * @type {string}
     */
    this.url = props.url || null;
    /**
     * Package version of plugin.
     * @type {string}
     */
    this.version = props.version || null;
  }

  get packageKey() {
    if (this.url) {
      return this.name;
    }

    let scope = '';

    if (this.scope) {
      scope = `@${this.scope}/`;
    }

    return `${scope}${this.name}`;
  }

  get packageValue() {
    if (this.url) {
      return this.url;
    }

    let scope = '';

    if (this.scope) {
      scope = `@${this.scope}/`;
    }

    let version = '';

    if (this.version) {
      version = `@${this.version}`;
    }

    return `${scope}${this.name}${version}`;
  }
}

export default Plugin;
