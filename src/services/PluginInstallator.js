import fs from 'fs';
import { execSync } from 'node:child_process';

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

  return Object.keys(packageJson.dependencies).includes(plugin.packageKey);
}
