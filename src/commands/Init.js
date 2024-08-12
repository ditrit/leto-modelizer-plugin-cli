import chalk from 'chalk';
import fs from 'fs';
import { getPluginsFromConfig } from '../services/PluginConfiguration.js';

/**
 * Sanitize name to remove '-' and capitalize letter after.
 * @param {string} name - Name to sanitize.
 * @returns {string} Sanitized name.
 */
function sanitize(name) {
  return name.replaceAll(/(-.)/ig, (v) => v.replace('-', '').toUpperCase());
}

/**
 * Initialize plugin.
 * @param {Object} program - Program to run command.
 */
export default function setup(program) {
  program.command('init')
    .description('Init plugin files')
    .action(async () => {
      let plugins = [];

      const allPlugins = getPluginsFromConfig();
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

      plugins = Object.keys(packageJson.dependencies)
        .map((key) => allPlugins.find((plugin) => plugin.packageKey === key))
        .filter((value) => !!value);

      plugins.forEach((plugin) => {
        const srcDir = `./node_modules/${plugin.packageKey}/public/`;
        const distDir = `./public/plugins/${plugin.name}/`;

        if (!fs.existsSync(srcDir)) {
          console.log(`\n${chalk.red('✘')} Plugin '${plugin.name}': No icons and models are imported.`);
          return;
        }

        fs.cpSync(srcDir, distDir, { recursive: true });

        console.log(`\n${chalk.green('✔')} Plugin '${plugin.name}': Icons and models are imported.`);
      });

      if (plugins.length > 0) {
        const pluginImports = plugins.map(
          (plugin) => `import ${sanitize(plugin.name)} from '${plugin.packageKey}';`,
        );
        const content = [
          pluginImports.join('\n'),
          '\nexport default {',
          plugins.map((plugin) => `${sanitize(plugin.name)},`).join('\n'),
          '};',
        ].join('\n');

        if (!fs.existsSync('src/plugins')) {
          fs.mkdirSync('src/plugins');
        }

        fs.writeFileSync('src/plugins/index.js', content);

        console.log(`\n${chalk.green('✔')} 'src/plugins/index.js' has been created or updated.\n`);
      }
    });
}
