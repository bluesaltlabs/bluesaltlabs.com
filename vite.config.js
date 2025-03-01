import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    // historyApiFallback: true,
  },
  base: "./",
  plugins: [],
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
        blog_posts: resolve(__dirname, 'blog/posts.html'),
        demos: resolve(__dirname, 'demos/index.html'),
        demos_keyboard: resolve(__dirname, 'demos/keyboard/index.html'),
        demos_sequencer: resolve(__dirname, 'demos/sequencer/index.html'),
        demos_sequencer_notes: resolve(__dirname, 'demos/sequencer/notes.html'),
        demos_controls: resolve(__dirname, 'demos/controls/index.html'),
        demos_vectors: resolve(__dirname, 'demos/vectors/index.html'),
        demos_vectors_notes: resolve(__dirname, 'demos/vectors/notes.html'),
        demos_design_patterns: resolve(__dirname, 'demos/design-patterns/index.html'),
        demos_design_patterns_factory: resolve(__dirname, 'demos/design-patterns/factory.html'),
        demos_design_patterns_iterator: resolve(__dirname, 'demos/design-patterns/iterator.html'),
        demos_design_patterns_mediator: resolve(__dirname, 'demos/design-patterns/mediator.html'),
        demos_design_patterns_observer: resolve(__dirname, 'demos/design-patterns/observer.html'),
        demos_design_patterns_proxy: resolve(__dirname, 'demos/design-patterns/proxy.html'),
        demos_design_patterns_singleton: resolve(__dirname, 'demos/design-patterns/singleton.html'),
        demos_design_patterns_strategy: resolve(__dirname, 'demos/design-patterns/strategy.html'),
        demos_design_patterns_visitor: resolve(__dirname, 'demos/design-patterns/visitor.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        todo: resolve(__dirname, 'todo/index.html'),
      },
    },
  },
});
