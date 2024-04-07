# Blocklet Demo

A Blocklet demo based on [todo-list-example](https://github.com/blocklet/create-blocklet/tree/main/packages/create-app/templates/todo-list-example).

## Usage

```sh
pnpm install
pnpm dev
```

## Technical Details

- Profile Data is stored in the [DID space](https://www.arcblock.io/content/docs/did-spaces/en/connect-did-space-on-login), with the data flow as follows: web page <-> Node.js service <-> DID space.
- Keep the UI/UX as consistent as possible with the official guideline, by reusing existing components such as [`@arcblock/ux`](https://arcblock.github.io/ux/) and [`blocklet/ui-react`](https://arcblock.github.io/ux/?path=/story/blocklet-ui-react-header--with-enable-connect-enable-locale).
- Fully support i18n, which can be toggled through the locale selector in the upper right corner.

## License

MIT
