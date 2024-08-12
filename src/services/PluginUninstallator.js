import fs from 'fs';
import fsExtra from 'fs-extra2';
import { execSync } from 'node:child_process';
import chalk from 'chalk';

/**
 * @typedef {import('../models/Plugin').Plugin} Plugin
 */

/**
 * Execute npm uninstall command, remove public folder of the plugin and regenerate index of
 * plugins.
 *
 * @param {Plugin} plugin - Plugin to uninstall.
 * @returns {Boolean} True if uninstall command is done.
 */
export function uninstall(plugin) {
  try {
    execSync(`npm uninstall ${plugin.packageKey}`);
  } catch (err) {
    console.log(err);
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (Object.keys(packageJson.dependencies).includes(plugin.packageKey)) {
    return false;
  }

  const folder = `./public/plugins/${plugin.name}/`;

  if (!fs.existsSync(folder)) {
    console.log(`\n${chalk.green('✔')} Plugin '${plugin.name}': Icons and models are already deleted.`);
    return true;
  }

  fsExtra.removeSync(folder);

  console.log(`\n${chalk.green('✔')} Plugin '${plugin.name}': Icons and models are deleted.`);

  return true;
}
