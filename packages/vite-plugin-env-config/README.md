# vite-plugin-env-config

Set vite config options with environment variables

## Installation

```bash
pnpm i -D vite-plugin-env-config
```

## Usage

### add to vite config

```ts
// vite config
import { defineConfig } from 'vite';
import { envConfig } from 'vite-plugin-env-config';

export default defineConfig({
	plugins: [
		envConfig({
			/* plugin options */
		})
	]
});
```

### use environment variables to specify config values on the fly

```shell
# this calls vite build with build.minify set to false in resolved config
VITECONFIG_build_minify=false vite build
```

## Options

```ts
interface Options {
	/**
	 * prefix of env variables to look for
	 * @default VITECONFIG_
	 */
	prefix: string;

	/**
	 * seprarator for path splits, should be one or multiple _
	 *
	 * eg VITECONFIG_foo_bar=3 gets converted to {foo:{bar: 3}}
	 * @default _
	 */
	separator: string;
}
```

> Environment variables have a limited charset
>
> - Use A-Z\_ chars for prefix
> - separator should be left at _ for regular use, if you want to set a property that contains a _, use \_\_

## Limitations

- uses JSON.parse to parse values, what cannot be parsed will be converted to string
- can only set object properties, not array items

## License

[MIT](./LICENSE)
