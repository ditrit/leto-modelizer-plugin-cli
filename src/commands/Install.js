const fs = require('fs');
const { execSync } = require('node:child_process');
const pluginPrompt = require('../prompts/Plugin');

exports.setup = (program) => {
  program.command('install')
    .description('Install plugin in leto-modelizer')
    .action(async () => {
      const { pluginName } = await pluginPrompt.getName();
      const { repositoryUrl } = await pluginPrompt.getRepositoryUrl();

      console.log('Installing plugin via npm...');
      execSync(`npm install -s "${repositoryUrl}"`);

      // add green check with chalk
      console.log('Installation succeed !');

      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const isPluginInstalled = Object
        .keys(packageJson.dependencies)
        .includes(pluginName);
      if (!isPluginInstalled) {
        // add red cross with chalk
        console.log('Could not find plugin name in package.json dependencies');
        return;
      }

      const content = {
        plugins: [
          pluginName,
        ],
      };

      if (fs.existsSync('plugin.config.json')) {
        const pluginConfig = JSON.parse(fs.readFileSync('plugin.config.json', 'utf8'));
        if (pluginConfig.plugins.includes(pluginName)) {
          content.plugins = pluginConfig.plugins;
        } else {
          content.plugins = content.plugins.concat(pluginConfig.plugins);
        }
      }

      fs.writeFileSync('plugin.config.json', JSON.stringify(content, null, 2));
      // add info icon with chalk
      console.log('If you have install all your plugin, please run cli init.');
    });
};
