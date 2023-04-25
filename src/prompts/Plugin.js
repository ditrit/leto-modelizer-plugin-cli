const prompts = require('prompts');
const { rules } = require('../services/helper');

exports.getName = () => prompts({
  type: 'text',
  name: 'pluginName',
  message: 'What is your plugin name?',
  validate: (value) => rules.pluginNameRegex.test(value) || 'Plugin name must be only letters, spaces, or dashes',
});

exports.getRepositoryUrl = () => prompts({
  type: 'text',
  name: 'repositoryUrl',
  message: 'What is your git repository url?',
  validate: (value) => rules.repositoryUrlRegex.test(value)
    || 'Invalid repository url, must be like "git@github.com/repository.git", "http(s)://github.com/repository.git" or "http(s)://github.com/repository.git#1.0.0"',
});

exports.getInstallationType = () => prompts({
  type: 'select',
  name: 'type',
  message: 'Choose your installation type:',
  choices: [
    { title: 'Official plugins', value: 'official' },
    { title: 'Custom plugin', value: 'custom' },
  ],
  initial: 0,
});

exports.getOfficialPlugins = (choices) => prompts({
  type: 'multiselect',
  name: 'type',
  message: 'Choose plugin(s) to install',
  choices,
  initial: 0,
});

exports.confirmInstallation = ({ name, version }) => prompts({
  type: 'toggle',
  name: 'value',
  message: `Install ${name} (${version}) ?`,
  initial: true,
  active: 'yes',
  inactive: 'no',
});
