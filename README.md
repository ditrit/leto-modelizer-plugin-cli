# Leto Modelizer Plugin CLI (leto-modelizer-plugin-cli)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=alert_status)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=reliability_rating)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=security_rating)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=code_smells)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=bugs)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=vulnerabilities)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=sqale_index)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=ncloc)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=coverage)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ditrit_leto-modelizer-plugin-cli&metric=duplicated_lines_density)](https://sonarcloud.io/summary/overall?id=ditrit_leto-modelizer-plugin-cli)

[![](https://dcbadge.vercel.app/api/server/zkKfj9gj2C?style=flat&theme=default-inverted)](https://discord.gg/zkKfj9gj2C)

Client for [Leto-Modelizer](https://github.com/ditrit/leto-modelizer). It installs plugins and imports their models and icons.

## Requirements

* node - [v20.16.0](https://nodejs.org/en/blog/release/v20.16.0)
* npm - [v10.8.1](https://www.npmjs.com/package/npm/v/10.8.1)

## Leto Modelizer Install

To install the client in Leto Modelizer, use this command line:

```
npm install --save-dev "git://github.com/ditrit/leto-modelizer-plugin-cli.git#1.0.0"
```

Add this to package.json scripts:

```
{
    "plugin:install": "node node_modules/leto-modelizer-plugin-cli install",
    "plugin:init": "node node_modules/leto-modelizer-plugin-cli init"
}
```
### How to define official plugins

The user can select one or more plugins to install from a list of official plugins. To do that, create a `leto-modelizer-plugin-cli.json` file at the root of Leto Modelizer project. Each object represent a plugin. Example :

```
[
  {
    "displayName": "Terraform plugin",
    "name": "terrator-plugin",
    "scope": "ditrit",
    "version": "0.12.0" ,
    "url": "https://github.com/ditrit/terrator-plugin.git#0.11.0"
  }
]

```

- `displayName` attribute represents the plugin's display name, which is used to assist the user during installation.
- `name` attribute is the plugin's name and must match the one defined in the plugin project.
- `url` attribute is the repository url of the plugin. It must be valid (see **_NOTE_** ).
- `scope` attribute is the organisation name of the plugin.
- `version` attribute is the release version of the plugin.

:warning: The `url` attribute is optional! If specified, the plugin will be installed from the repository instead of the registry.

## Leto Modelizer commands

### Install

```
"plugin:install": "leto-modelizer-plugin-cli install",
```

Tasks performed during installation:
- Install plugin(s) from npm.
- Import icons and models from each selected plugins.
- Then generate or update "src/plugins/index.js".

Options `name` and `version` can be added with the `npm run plugin:install` command 
to bypass cli prompts. Example :

```
npm run plugin:install -- name="name" version="version"
```

**_NOTE:_**  
The repository url must be valid like `git@github.com/repository.git`, `http(s)://github.com/repository.git` or `http(s)://github.com/repository.git#1.0.0`.

## Delete plugin

A future command will be introduced to perform this action.

However, here are the actions you need to take to delete the plugin:

1. Remove wanted plugin from dependencies in `package.json`
2. Delete folder `public/plugins/[YOUR_PLUGIN]`
3. Delete folder `node_modules`
4. Regenerate `package-lock.json`

