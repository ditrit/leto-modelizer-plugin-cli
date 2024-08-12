# Contributing

## Install

```
npm install
```

## Default commands

Usage explanation of scripts in `package.json`.

### dev

Run the application in dev mode.

### build

Build the application in `dist` folder.

### lint

Run eslint check on the project.

### lint:fix

Run eslint fix on the project.

### lint:report

Generate issues report with eslint for sonar.

## Development

### Directory structure

This is the default directory structure we use for the project:

```
leto-modelizer-plugin-cli
├ dist                 ⇨ Contains the built application
└ src                  ⇨ Contains all files for the leto-modelizer-plugin-cli application
  ├ command            ⇨ Contains all the commands
  ├ prompts            ⇨ Contains all the prompts
  └ services           ⇨ Contains all the specific functions
```

### How to release

We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html) as guideline for the version management.

Steps to release:
- Create a new branch labeled `release/vX.Y.Z` from the latest `main`.
- Improve the version number in `package.json`, `package-lock.json` and `changelog.md`.
- Verify the content of the `changelog.md`.
- Commit the modifications with the label `Release version X.Y.Z`.
- Create a pull request on github for this branch into `main`.
- Once the pull request validated and merged, tag the `main` branch with `vX.Y.Z`
- After the tag is pushed, make the release on the tag in GitHub

### Git: Default branch

The default branch is main. Direct commit on it is forbidden. The only way to update the application is through pull request.

Release tag are only done on the `main` branch.

### Git: Branch naming policy

`[BRANCH_TYPE]/[BRANCH_NAME]`

* `BRANCH_TYPE` is a prefix to describe the purpose of the branch. Accepted prefixes are:
    * `feature`, used for feature development
    * `bugfix`, used for bug fix
    * `improvement`, used for refacto
    * `library`, used for updating library
    * `prerelease`, used for preparing the branch for the release
    * `release`, used for releasing project
    * `hotfix`, used for applying a hotfix on main
    * `poc`, used for proof of concept
* `BRANCH_NAME` is managed by this regex: `[a-z0-9._-]` (`_` is used as space character).
