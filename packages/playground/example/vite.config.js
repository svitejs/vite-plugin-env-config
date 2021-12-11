import { defineConfig } from 'vite';
import { envConfig } from 'vite-plugin-env-config';
export default defineConfig({
	plugins: [envConfig()]
});
