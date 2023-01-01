<h1>@eo-cli-pro</h1>

## Table of Contents

- [Refatcor](#refactor)
- [Origin](#origin)
- [Development](#development)
  - [Vitepress for @eo-cli-pro](#vitepress-for-eo-cli-pro)
  - [Playground for @eo-cli-pro](#playground-for-eo-cli-pro)
- [Commits & releases](#commits--releases)
- [Get involved](#get-involved)
- [Reach out to us](#reach-out-to-us)
- [License](#license)

## Refactor

I rewrote this project using `pnpm + changeset + typescript + vite + tsup`, use monorepo to manage project. The package name is `@eo-cli-pro`.

The previous `eo-cli-pro` package move to repo `backup/master`, if you want to check it, click [here](https://github.com/eopol/eo-cli-pro/tree/backup/master).

I refactor previous `eo-cli-pro` package using `typescript` and renamed it `@eo-cli-pro/vue2`, if you want to check it, click [here](https://github.com/eopol/eo-cli-pro/tree/master/packages/vue2).

## Origin

This package enables localization of web apps made with vue by use of google translate.As your website and app grows, you may find a need to expand to other markets outside your home country.

If your target market lives across the sea and speaks a different language, you may not have any choice but to localize.

For more details on what localization is and the potential benefits, [checkout this article](https://alistapart.com/article/do-you-need-to-localize-your-website/).

## Development

For local development, in the root of the repo run `pnpm i` to install all dependencies and then `pnpm build` to build all packages. Now follow the instructions of the specific package you’re working on.

> In case you are having problems to install the dependencies, try using NVM to get the same node version we use by running `nvm use` in the root of the repo, and check `pnpm` version.

### Vitepress for @eo-cli-pro

We use vitepress with our library to develop document. You can start it from the root of the repo, just run `pnpm dev:docs`

### Playground for @eo-cli-pro

We use vite with our library to test it. You can start it from the root of the repo, just run `pnpm dev:react` or `pnpm dev:vue2` or `pnpm dev:vue3`.

## Commits & releases

Use `pnpm commit`. This uses the [cz-git](https://cz-git.qbb.sh/) CLI to create a conventional commit message based on your changes. CI is setup to release all new commits on the main branch that contains a new [changeset](https://github.com/changesets/changesets).

Read more about changeset [here](RELEASES.md)

## Get involved

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=31557600)](http://makeapullrequest.com)

We appreciate any help on our repositories. For more details about how to contribute to a package, see the README of the corresponding package.

## Reach out to us

Create an issue using one of the templates [![File an issue](https://img.shields.io/badge/-Create%20Issue-6cc644.svg?logo=github&maxAge=31557600)](https://github.com/eopol/eo-cli-pro/issues/new/choose).
Make sure to remove any credential from your code before sharing it.

## License

This repository is published under the [MIT](LICENSE) license.