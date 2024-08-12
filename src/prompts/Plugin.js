import prompts from 'prompts';

export async function getOfficialPlugins(plugins, action) {
  return (await prompts({
    type: 'multiselect',
    name: 'type',
    message: `Choose plugin(s) to ${action}`,
    choices: plugins.map((plugin) => ({
      title: `${plugin.displayName} (${plugin.version})`,
      value: plugin,
    })),
    initial: 0,
  })).type;
}

export async function confirmAction(plugin, action) {
  return (await prompts({
    type: 'toggle',
    name: 'value',
    message: `Confirm: ${action} plugin ${plugin.displayName} (${plugin.version}) ?`,
    initial: true,
    active: 'yes',
    inactive: 'no',
  })).value;
}
