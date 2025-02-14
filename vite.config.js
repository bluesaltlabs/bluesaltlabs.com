import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: "/",
  publicDir: '/public',
  plugins: [

  ],
  //assetsInclude: ['**/*.md', '**/*.json'],
  assetsInclude: ['**/*.md', '/data/**'],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './assets'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        demos: resolve(__dirname, 'demos/index.html'),
        demos_keyboard: resolve(__dirname, 'demos/keyboard/index.html'),
        demos_music: resolve(__dirname, 'demos/music/index.html'),
        demos_schedule: resolve(__dirname, 'demos/schedule/index.html'),
        demos_tone: resolve(__dirname, 'demos/tone/index.html'),
        demos_design_patterns: resolve(__dirname, 'demos/design-patterns/index.html'),
        demos_design_patterns_factory: resolve(__dirname, 'demos/design-patterns/factory.html'),
        demos_design_patterns_iterator: resolve(__dirname, 'demos/design-patterns/iterator.html'),
        demos_design_patterns_mediator: resolve(__dirname, 'demos/design-patterns/mediator.html'),
        demos_design_patterns_observer: resolve(__dirname, 'demos/design-patterns/observer.html'),
        demos_design_patterns_proxy: resolve(__dirname, 'demos/design-patterns/proxy.html'),
        demos_design_patterns_singleton: resolve(__dirname, 'demos/design-patterns/singleton.html'),
        demos_design_patterns_strategy: resolve(__dirname, 'demos/design-patterns/strategy.html'),
        demos_design_patterns_visitor: resolve(__dirname, 'demos/design-patterns/visitor.html'),
      },
    },
  },
});
