// Helpful tool: https://tailwindpalette.jurs.me

// Application theme colors (Override Tailwind CSS default theme colors)
export default ({ colors }) => ({
  ...colors,
  slate: {
    50: '#e8ebed',
    100: '#cfd3d8',
    200: '#b5bcc4',
    300: '#99a4b2',
    400: '#7e8c9f',
    500: '#64748b',
    600: '#435370',
    700: '#283350',
    800: '#11172b',
    900: '#000000',
  },
  gray: {
    50: '#e6e8ea',
    100: '#cdd0d5',
    200: '#b5b9c0',
    300: '#9ca1aa',
    400: '#848a95',
    500: '#6b7280',
    600: '#5d6676',
    700: '#4f5b6c',
    800: '#425060',
    900: '#364454',
  },
  blue: {
    50: '#ffffff',
    100: '#dce5f8',
    200: '#b9cbf0',
    300: '#97b1e9',
    400: '#7497e1',
    500: '#517dda',
    600: '#4269bc',
    700: '#33569f',
    800: '#244281',
    900: '#152e63',
  },
  indigo: {
    50: '#ffffff',
    100: '#e3e6f9',
    200: '#c5caf5',
    300: '#a4a9f4',
    400: '#8285f4',
    500: '#6366f1',
    600: '#5861d0',
    700: '#505dab',
    800: '#41508d',
    900: '#2c4075',
  }
});
