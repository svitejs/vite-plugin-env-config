import _set from 'just-safe-set';
import { Plugin, UserConfig } from 'vite';

export interface Options {
	/**
	 * prefix of env variables to look for
	 * @default VITECONFIG_
	 */
	prefix: string;

	/**
	 * seprarator for path splits, should be one or multiple _
	 * @default _
	 */
	separator: string;
}

const DEFAULT_OPTIONS: Options = {
	prefix: 'VITECONFIG_',
	separator: '_'
};

function parseValue(val?: string) {
	if (val === 'undefined' || val === undefined) {
		return undefined;
	}
	try {
		return JSON.parse(val);
	} catch (e) {
		return `${val}`;
	}
}

function env2config(options: Options): UserConfig {
	const { prefix, separator } = options;
	return Object.keys(process.env)
		.filter((key) => key.startsWith(prefix))
		.map((key) => {
			const path = key.substring(prefix.length).split(separator).join('.');
			const val = parseValue(process.env[key]);
			return { path, val };
		})
		.reduce((acc, { path, val }) => {
			_set(acc, path, val); // just-safe-set
			return acc;
		}, {});
}

export function envConfig(inlineOptions?: Partial<Options>): Plugin {
	const options = {
		...DEFAULT_OPTIONS,
		...inlineOptions
	};
	return {
		name: 'vite-plugin-env-config',
		config(): UserConfig {
			const config = env2config(options);
			return config;
		}
	};
}
