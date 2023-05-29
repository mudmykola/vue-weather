import {fileURLToPath, URL} from 'node:url'


import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
import envCompatible from 'vite-plugin-env-compatible'

dotenv.config();
export default defineConfig({
    plugins: [
        vue(),
        envCompatible(),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})