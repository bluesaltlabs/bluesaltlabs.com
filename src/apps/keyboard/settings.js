import MusicEnum from '@/enums/MusicEnum.js'

const pitches = (() => {
  let keys = [];

  for (let p in MusicEnum.PITCHES) {
    keys.push(`${p}`);
    if (p !== "B" && p !== "E") {
      keys.push(`${p}#`);
    }
  }
  return keys;
})();
// Configurable Settings
// note: Canvas does not work with decimal values -
//       ensure values are whole when divided by 2
export default {
  octives: 2,     // Number of octives to display. (default: 2)
  first_octive: 2, // The first octive's pitch.     (default: 2)
  height_1: 180,   // Pixel height value 1.         (default: 180)
  height_2: 120,   // Pixel height value 2.         (default: 120)
  width_1: 48,    // Pixel width value 1.          (default: 48)
  keyGap: 4,      // The pixel gap between keys.   (default: 4)
  background: {
    color: "#339c1a80",
    describe: ".a green background.",
  },
  keys: {
    black_key_01: {
      fill: {
        color: "#222222",
        stroke: "#cccccc",
        describe: "A piano key shape drawn in black.",
      },
    },
    white_key_01: {
      fill: {
        color: "#eeeeee",
        stroke: "#444444",
        describe: "A piano key shape drawn in white.",
      },
    },
    white_key_02: {
      fill: {
        color: "#eeeeee",
        stroke: "#444444",
        describe: "A piano key shape drawn in white.",
      },
    },
    white_key_03: {
      fill: {
        color: "#eeeeee",
        stroke: "#444444",
        describe: "A piano key shape drawn in white.",
      },
    },
  },
  pitches,
};
