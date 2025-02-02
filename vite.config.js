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
        demos: 'demos/index.html',
        demos_drag_drop: 'demos/drag-drop.html',
        demos_drag_drop_vanilla: 'demos/drag-drop-vanilla.html',
        demos_spa: 'demos/spa/index.html',
        demos_tone: 'demos/tone/index.html',
        demos_tone_examples: 'demos/tone/examples.html',

      },
    },
  },
};
