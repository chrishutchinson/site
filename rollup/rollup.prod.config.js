// rollup.config.js
import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

const writeFileSync = destination => content =>
  fs.writeFileSync(destination, content);

export default {
  entry: 'app/index.js',
  dest: 'dist/app.js',
  format: 'iife',
  plugins: [
    svelte({
      css: writeFileSync('dist/main.css'),
      hydratable: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
    copy({
      'app/manifest.json': 'dist/manifest.json',
      'app/assets': 'dist/assets',
      'app/sw.js': 'dist/sw.js',
    }),
  ],
};
