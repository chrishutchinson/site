// rollup.config.js
import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';

const writeFileSync = destination => content =>
  fs.writeFileSync(destination, content);

export default {
  entry: 'app/index.js',
  dest: 'dist/app.js',
  format: 'iife',
  plugins: [
    serve('dist'),
    svelte({
      css: writeFileSync('dist/main.css'),
      hydratable: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    copy({
      'app/sw.js': 'dist/sw.js',
    }),
    uglify(),
    livereload(),
  ],
};
