import { build } from 'esbuild';

await build({
  entryPoints: ['src/parse.ts'],
  outfile: 'dist/bundle.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node25'
});