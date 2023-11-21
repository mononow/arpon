# Arpon Prettier Config

[Prettier](https://prettier.io/docs/en/index.html) config of
Many Dots projects with [Svelte](https://svelte.dev) + [TypeScript](https://www.typescriptlang.org).

## Usage

1. Install:

```bash
npm install --save-dev @arpon/prettier-config prettier svelte
```

2. Add the the `.prettierrc` at your project root:

```json
"@arpon/prettier-config"
```

> Note: This method does not offer a way to extend the configuration to overwrite some properties from the shared configuration. If you need to do that, rename the file to .prettierrc.js (or `.prettierrc.cjs` if you use ESM) and export the modifications, e.g:
>
> ```js
> module.exports = {
>   ...require('@arpon/prettier-config'),
>   semi: false,
> };
> ```

## Editor support

In order to format code automatically when you save it, you can tell your editor which tool to use.
Or you can just do a [Husky](https://github.com/typicode/husky) +
[lint-staged](https://github.com/okonet/lint-staged) config to only format your code when you commit
it for example.

### VSCode integration

Install VSCode
[Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode),
and add `.vscode/settings.json` file to your workspace, add the following settings:

```json5
// Normally these configs aren't necessary, but it's an example for enforce format JavaScript files with Prettier.
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",

// With specific file association
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

Now every time you save your code, it will be formatted by Prettier...

> For more info about editor and other integrations check the
> [Prettier Docs ](https://prettier.io/docs/en/editors.html)

## License

Licensed under the [Apache 2.0 License](/LICENSE).
