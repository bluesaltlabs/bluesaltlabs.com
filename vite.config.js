import path from "path";

export default {

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '98': '98.html',
        music: 'music/index.html',
        music_about: 'music/about.html',
        music_metronome: 'music/metronome.html',
        music_sequencer: 'music/sequencer.html',
        music_components: 'music/components.html',
        games: 'games/index.html',
        tools: 'tools/index.html',
        resources: 'resources/index.html',
        blog: 'blog/index.html',
      },
    },
  },
};
