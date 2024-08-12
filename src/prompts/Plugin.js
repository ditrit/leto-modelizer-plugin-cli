import prompts from 'prompts';

export async function getOfficialPlugins(plugins) {
  return (await prompts({
    type: 'multiselect',
    name: 'type',
    message: 'Choose plugin(s) to install',
    choices: plugins.map((plugin) => ({
      title: `${plugin.displayName} (${plugin.version})`,
      value: plugin,
    })),
    initial: 0,
  })).type;
}

export async function confirmInstallation(plugin) {
  return (await prompts({
    type: 'toggle',
    name: 'value',
    message: `Install ${plugin.displayName} (${plugin.version}) ?`,
    initial: true,
    active: 'yes',
    inactive: 'no',
  })).value;
}
