import path from 'path'
//import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [
    //tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@db': path.resolve(__dirname, './db'),
      '@data': path.resolve(__dirname, './data'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog/index.html',
        games: 'games/index.html',
        music: 'music/index.html',
        music_about: 'music/about.html',
        music_metronome: 'music/metronome.html',
        music_sequencer: 'music/sequencer.html',
        music_components: 'music/components.html',
        //pc: 'pc/index.html',
        pc_98: 'pc/98.html',
        resources: 'resources/index.html',
        resources_design_patterns: 'resources/design-patterns/index.html',
        resources_design_patterns_factory: 'resources/design-patterns/factory.html',
        resources_design_patterns_iterator: 'resources/design-patterns/iterator.html',
        resources_design_patterns_mediator: 'resources/design-patterns/mediator.html',
        resources_design_patterns_observer: 'resources/design-patterns/observer.html',
        resources_design_patterns_proxy: 'resources/design-patterns/proxy.html',
        resources_design_patterns_singleton: 'resources/design-patterns/singleton.html',
        resources_design_patterns_strategy: 'resources/design-patterns/strategy.html',
        resources_design_patterns_visitor: 'resources/design-patterns/visitor.html',
        demos: 'demos/index.html',
        demos_keyboard: 'demos/keyboard/index.html',
        demos_test: 'demos/keyboard/test.html',
        demos_drag_drop: 'demos/drag-drop/index.html',
        demos_drag_drop_old: 'demos/drag-drop/old.html',
        demos_drag_drop_vanilla: 'demos/drag-drop/vanilla.html',
        demos_spa: 'demos/spa/index.html',
        demos_tone: 'demos/tone/index.html',
        demos_tone_examples: 'demos/tone/examples.html',
        demos_tone_simple: 'demos/tone/simple.html',
      },
    },
  },
};
