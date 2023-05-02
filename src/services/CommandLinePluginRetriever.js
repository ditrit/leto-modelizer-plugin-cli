const chalk = require('chalk');
const PluginValidator = require('./PluginValidator');

/**
 * Parse an array of string inputs into an object with camelCase names property.
 *
 * @param {Array<String>} inputs - An array of string inputs.
 * @returns {Object} An object with names and their corresponding values.
 */
function parseInputs(inputs) {
  return inputs.reduce((acc, input) => {
    const [name, value] = input.split('=');
    const camelCaseName = name.replace(/-./g, ((chunk) => chunk[1].toUpperCase()));

    acc[camelCaseName] = value;

    return acc;
  }, {});
}

/**
 * Retrieve repository name and URL from inputs and check if they are valid.
 *
 * @param {Array<String>} inputs - An array of string inputs.
 * @returns {Array<Object>} An array of object containing the validated repository name and URL,
 * otherwise an empty array.
 */
async function retrieve(inputs) {
  const { repositoryName, repositoryUrl } = parseInputs(inputs);
  const validator = new PluginValidator(repositoryName, repositoryUrl);

  if (!validator.isValid()) {
    console.log(`\n${chalk.red('✘')} Repository name and/or url invalid.`);

    return [];
  }

  return [{
    name: repositoryName,
    url: repositoryUrl,
  }];
}

module.exports = {
  retrieve,
};
