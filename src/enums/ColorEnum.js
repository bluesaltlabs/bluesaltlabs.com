// todo: figure out how to prevent duplication of these values

class ColorEnum {
  static RED = "#EF476F";
  static YELLOW = "#FFD166";
  static GREEN = "#06D6A0";
  static BLUE = "#073B4C";
  static BLUE_ALT = "#118AB2";
  static GRAY_100 = "#4A4A4A";
  static GRAY_200 = "#3E3E3E";
  static GRAY_300 = "#333333";
  static GRAY_400 = "#252525";
  static GRAY_500 = "#131313";


  constructor() {
    return Object.freeze(this);
  }
}

export default ColorEnum;
