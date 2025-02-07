// Configurable Settings
// note: Canvas does not work with decimal values -
//       ensure values are whole when divided by 2
export default {
  octives: 1,     // Number of octives to display. (default: 2)
  firstOctive: 2, // The first octive's pitch.     (default: 2)
  height_1: 180,   // Pixel height value 1.         (default: 90)
  height_2: 120,   // Pixel height value 2.         (default: 60)
  width_1: 48,    // Pixel width value 1.          (default: 24)
  keyGap: 4,      // The pixel gap between keys.   (default: 2)
  background: {
    color: "#339c1a",
    describe: ".a green background.",
  },
  keys: {
    black_key_01: {
      fill: {
        color: "#000000",
        stroke: "#FFFFFF",
        describe: "A piano key shape drawn in black.",
      },
    },
    white_key_01: {
      fill: {
        color: "#FFFFFF",
        stroke: "#000000",
        describe: "A piano key shape drawn in white.",
      },
    },
    white_key_02: {
      fill: {
        color: "#FFFFFF",
        stroke: "#000000",
        describe: "A piano key shape drawn in white.",
      },
    },
    white_key_03: {
      fill: {
        color: "#FFFFFF",
        stroke: "#000000",
        describe: "A piano key shape drawn in white.",
      },
    },
  },
};
