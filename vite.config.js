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
  assetsInclude: ['**/*.md'],
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
        music: resolve(__dirname, 'music/index.html'),
        music_about: resolve(__dirname, 'music/about.html'),
        music_metronome: resolve(__dirname, 'music/metronome.html'),
        music_sequencer: resolve(__dirname, 'music/sequencer.html'),
        music_components: resolve(__dirname, 'music/components.html'),
        //pc: resolve(__dirname, 'pc/index.html'),
        pc_98: resolve(__dirname, 'pc/98.html'),
        resources: resolve(__dirname, 'resources/index.html'),
        resources_design_patterns: resolve(__dirname, 'resources/design-patterns/index.html'),
        resources_design_patterns_factory: resolve(__dirname, 'resources/design-patterns/factory.html'),
        resources_design_patterns_iterator: resolve(__dirname, 'resources/design-patterns/iterator.html'),
        resources_design_patterns_mediator: resolve(__dirname, 'resources/design-patterns/mediator.html'),
        resources_design_patterns_observer: resolve(__dirname, 'resources/design-patterns/observer.html'),
        resources_design_patterns_proxy: resolve(__dirname, 'resources/design-patterns/proxy.html'),
        resources_design_patterns_singleton: resolve(__dirname, 'resources/design-patterns/singleton.html'),
        resources_design_patterns_strategy: resolve(__dirname, 'resources/design-patterns/strategy.html'),
        resources_design_patterns_visitor: resolve(__dirname, 'resources/design-patterns/visitor.html'),
        demos: resolve(__dirname, 'demos/index.html'),
        demos_keyboard: resolve(__dirname, 'demos/keyboard/index.html'),
        demos_keyboard_test: resolve(__dirname, 'demos/keyboard/test.html'),
        demos_keyboard_vector: resolve(__dirname, 'demos/keyboard/vector.html'),
        demos_drag_drop: resolve(__dirname, 'demos/drag-drop/index.html'),
        demos_drag_drop_old: resolve(__dirname, 'demos/drag-drop/old.html'),
        demos_drag_drop_vanilla: resolve(__dirname, 'demos/drag-drop/vanilla.html'),
        demos_schedule: resolve(__dirname, 'demos/schedule/index.html'),
        demos_spa: resolve(__dirname, 'demos/spa/index.html'),
        demos_tone: resolve(__dirname, 'demos/tone/index.html'),
        demos_tone_examples: resolve(__dirname, 'demos/tone/examples.html'),
        demos_tone_simple: resolve(__dirname, 'demos/tone/simple.html'),
      },
    },
  },
});
