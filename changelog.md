# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Fixed

- Fix bad name of public plugin resources folder on `plugin:install`.

## [0.2.0] - 2022/11/07

### Added

- Add handling of 'repository-name' and 'repository-url' arguments for `install` command.

## [0.1.2] - 2022/09/20

### Fixed

- Permit to have version number or branch name in repository url

## [0.1.1] - 2022/09/02

### Fixed

- Fix typo in command `init`
- Fix import folder from plugin
- Fix scripts commands in readme
- Sanitize plugin name

## [0.1.0] - 2022/09/02

### Added

- Setup project.
- Add command `install` to install plugin with npm and generate `plugin.config.js`.
- Add command `init` to import icons and models of each plugin then generate `src/plugins/index.js`.
- Init webpack build
- Init linter

[0.2.0]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.2.0/changelog.md
[0.1.2]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.2/changelog.md
[0.1.1]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.1/changelog.md
[0.1.0]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.0/changelog.md
