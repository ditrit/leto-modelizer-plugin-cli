# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Added

- Add workflow to publish on npm.

### Changed

- Update nodejs to version `20.16.0`.
- Update npm to version `10.8.1`.
- Update `install` command to init plugin too.
- All plugins must now be defined in the configuration file to be installed.
- Command line options:
  - Remove `repository-name` and `repository-url`.
  - Add `name` and `version`.

### Removed

- Command `init` is done in install command now.

## [1.0.0] - 2023/05/03

### Added

- Add prompt to choose between official or custom plugins via `install` command.
- Externalize official plugins list in leto-modelizer.

## [0.2.1] - 2022/11/24

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

[1.0.0]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/1.0.0/changelog.md
[0.2.1]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.2.1/changelog.md
[0.2.0]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.2.0/changelog.md
[0.1.2]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.2/changelog.md
[0.1.1]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.1/changelog.md
[0.1.0]: https://github.com/ditrit/leto-modelizer-plugin-cli/blob/0.1.0/changelog.md
