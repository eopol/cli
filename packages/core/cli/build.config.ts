import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  tsconfig: '../../tsconfig.node.json',
  dts: {
    compilerOptions: {
      // use tsconfig references generate .d.ts has error. see https://github.com/egoist/tsup/issues/647
      composite: false,
    },
  },
  platform: 'node',
  // shims: true,
  banner: {
    // esbuild build commonjs package error. see https://github.com/evanw/esbuild/issues/1921
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
  minify: !options.watch,
}))
