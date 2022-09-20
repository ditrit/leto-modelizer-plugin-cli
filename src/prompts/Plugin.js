const prompts = require('prompts');

exports.getName = () => prompts({
  type: 'text',
  name: 'pluginName',
  message: 'What is your plugin name?',
  validate: (value) => /^[a-zA-Z\s-]+$/.test(value) || 'Plugin name must be only letters, spaces, or dashes',
});

exports.getRepositoryUrl = () => prompts({
  type: 'text',
  name: 'repositoryUrl',
  message: 'What is your git repository url?',
  validate: (value) => /^(?:git@|http:\/\/|https:\/\/).+\.git(#.+)?$/.test(value)
    || 'Invalid repository url, must be like "git@github.com/repository.git", "http(s)://github.com/repository.git" or "http(s)://github.com/repository.git#1.0.0"',
});
