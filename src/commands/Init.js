const fs = require('fs');

exports.setup = (program) => {
  program.command('init')
    .description('Init plugin files')
    .action(async () => {
      let plugins = [];

      if (fs.existsSync('plugin.config.json')) {
        const pluginConfig = JSON.parse(fs.readFileSync('plugin.config.json', 'utf8'));
        plugins = plugins.concat(pluginConfig.plugins);
      } else {
        // add red cross with chalk
        console.log('plugin.config.json file was not found. Use \'cli install\' to create it.');
        return;
      }

      plugins.forEach((pluginName) => {
        const srcDir = `./node_modules/${pluginName}/public/plugin/`;
        const distDir = `./public/plugins/${pluginName}/`;

        if (!fs.existsSync(srcDir)) {
          // add red cross with chalk
          console.log(`Plugin '${pluginName}': No icons and models are imported.`);
          return;
        }

        fs.cpSync(srcDir, distDir, { recursive: true });

        // add green check with chalk
        console.log(`Plugin '${pluginName}': Icons and models are imported.`);
      });

      if (plugins.length > 0) {
        const pluginImports = plugins.map(
          (pluginName) => `import ${pluginName} from '${pluginName};`,
        );
        const content = [
          pluginImports.join('\n'),
          'export default {',
          plugins.map((p) => `${p},`).join('\n'),
          '}',
        ].join('\n');

        if (!fs.existsSync('src/plugins')) {
          fs.mkdirSync('src/plugins');
        }

        fs.writeFileSync('src/plugins/index.js', content);

        // add green check with chalk
        console.log('\'src/plugins/index.js\' has beeen created or updated.');
      }
    });
};
