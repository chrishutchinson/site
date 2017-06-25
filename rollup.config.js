// rollup.config.js
import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const writeFileSync = destination => content =>
  fs.writeFileSync(destination, content);

export default {
  entry: 'app/index.js',
  dest: 'dist/app.js',
  format: 'iife',
  plugins: [
    serve('dist'),
    livereload(),
    svelte({
      css: writeFileSync('dist/main.css'),
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
