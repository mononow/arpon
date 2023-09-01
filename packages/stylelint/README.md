# Arpon Stylelint Config

> A sharable [Stylelint](https://stylelint.io/) configuration that enforce CSS rules of MONO.now projects.

## Install

1. Install:

```bash
npm install --save-dev @arpon/stylelint-config stylelint
```

2. Enable this configuration in your Stylelint configuration file (e.g. `.stylelintrc`):

```json
{
  "extends": "@arpon/stylelint-config"
}
```

> Note: This method does not offer a way to extend the configuration to overwrite some properties from the shared configuration. If you need to do that, rename the file to .stylelintrc.js (or `.stylelintrc.cjs` if you use ESM) and export the modifications, e.g:
>
> ```js
> module.exports = {
>   extends: " @arpon/stylelint-config",
>   // ... overwrites
> };
> ```

#### This shareable config expands to the following:

```js
/** @arpon/stylelint-config/index.js */
{
  extends: [
    'stylelint-config-html/html',
    'stylelint-config-html/svelte',
    'stylelint-config-standard',
    'stylelint-prettier',
  ],
  customSyntax: 'postcss-html',
  rules: {
    // ...
  }
}
```

### VSCode integration

To work with [Visual Studio Code](https://code.visualstudio.com), you must install the
[stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
extension.

## License

Licensed under the [Apache 2.0 License](/LICENSE).
