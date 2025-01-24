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
        metronome: 'music/metronome.html',
        sequencer: 'music/sequencer.html',
        games: 'games/index.html',
        tools: 'tools/index.html',
      },
    },
  },
};
