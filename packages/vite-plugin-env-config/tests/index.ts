import { test } from 'uvu';
import * as assert from 'uvu/assert';
// eslint-disable-next-line node/no-missing-import
import { envConfig } from '../src/index.js';

test.before.each(() => {
	process.env = {};
});
test('it converts boolean false', () => {
	const plugin = envConfig();
	process.env.VITECONFIG_build_minify = 'false';
	const result = plugin.config(
		{ build: { minify: true } },
		{ mode: 'development', command: 'serve' }
	);
	assert.equal(result, { build: { minify: false } });
});

test('it converts boolean true', () => {
	const plugin = envConfig();
	process.env.VITECONFIG_build_minify = 'true';
	const result = plugin.config(
		{ build: { minify: false } },
		{ mode: 'development', command: 'serve' }
	);
	assert.equal(result, { build: { minify: true } });
});

test('it converts number', () => {
	const plugin = envConfig();
	process.env.VITECONFIG_custom_number = '1';
	const result = plugin.config({}, { mode: 'development', command: 'serve' });
	assert.equal(result, { custom: { number: 1 } });
});

test('it converts string', () => {
	const plugin = envConfig();
	process.env.VITECONFIG_base = '/foo';
	const result = plugin.config({ base: '/bar' }, { mode: 'development', command: 'serve' });
	assert.equal(result, { base: '/foo' });
});

test('it works with custom prefix', () => {
	const plugin = envConfig({ prefix: 'CUSTOM_' });
	process.env.CUSTOM_build_minify = 'false';
	const result = plugin.config(
		{ build: { minify: true } },
		{ mode: 'development', command: 'serve' }
	);
	assert.equal(result, { build: { minify: false } });
});

test('it works with custom separator', () => {
	const plugin = envConfig({ separator: '__' });
	process.env.VITECONFIG_build__minify = 'false';
	const result = plugin.config(
		{ build: { minify: true } },
		{ mode: 'development', command: 'serve' }
	);
	assert.equal(result, { build: { minify: false } });
});
test.run();
