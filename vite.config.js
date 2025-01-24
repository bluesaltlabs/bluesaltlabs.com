/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '98': '98.html',
        metronome: 'music/metronome.html'
      },
    },
  },
}
