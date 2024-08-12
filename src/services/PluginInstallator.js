import fs from 'fs';
import { execSync } from 'node:child_process';
import chalk from 'chalk';

/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Execute npm install command and read the package.json file to check the dependencies.
 *
 * @param {Plugin} plugin - Plugin to install.
 * @returns {Boolean} True if install command is done and the dependencies are updated,
 * otherwise false.
 */
export function install(plugin) {
  try {
    execSync(`npm install -s ${plugin.packageValue}`);
  } catch (err) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (!Object.keys(packageJson.dependencies).includes(plugin.packageKey)) {
    return false;
  }

  const srcDir = `./node_modules/${plugin.packageKey}/public/`;
  const distDir = `./public/plugins/${plugin.name}/`;

  if (!fs.existsSync(srcDir)) {
    console.log(`\n${chalk.red('✘')} Plugin '${plugin.name}': No icons and models are imported.`);
    return true;
  }

  fs.cpSync(srcDir, distDir, { recursive: true });

  console.log(`\n${chalk.green('✔')} Plugin '${plugin.name}': Icons and models are imported.`);

  return true;
}
