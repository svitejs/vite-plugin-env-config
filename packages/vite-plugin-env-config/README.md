# @svitejs/project-template

PROJECT TAGLINE HERE

## Installation

```bash
pnpm i -D vite-plugin-env-config
```

## Usage

### add plugin to vite

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

### set config options via env

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

## License

[MIT](./LICENSE)
