class MusicEnum {
  static PITCH = {
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    A: "A",
    B: "B",
  };

  static OCTIVE = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
  }

  static TEMPO = {
    MIN: 22,
    MAX: 220,
  }

// Source: https://en.wikipedia.org/wiki/Tempo#Approximately_from_the_slowest_to_the_fastest

  // Larghissimo – extremely slow, slowest type of tempo (24 bpm and under)
  static LARGHISSIMO = {
    name: "Larghissimo",
    min: this.TEMPO.MIN,
    max: 24,
  }
  // Adagissimo and Grave – very slow and solemn (24–40 bpm)
  static ADAGISSIMO = {
    name: "Adagissimo",
    min: 24,
    max: 40,
  }
  // Largo – slow and broad (40–66 bpm)
  static LARGO = {
    name: "Largo",
    min: 40,
    max: 66,
  }
  // Larghetto – rather slow and broad (44–66 bpm)
  static LARGHETTO = {
    name: "Larghetto",
    min: 44,
    max: 66,
  }
  // Adagio – slow with great expression[12] (44–66 bpm)
  static ADAGIO = {
    name: "Adagio",
    min: 44,
    max: 66,
  }
  // Adagietto – slower than andante or slightly faster than adagio (46–80 bpm)
  static ADAGIETTO = {
    name: "Adagietto",
    min: 46,
    max: 80,
  }
  // Lento – slow (52–108 bpm)
  static LENTO = {
    name: "Lento",
    min: 52,
    max: 108,
  }
  // Andante – at a walking pace, moderately slow (56–108 bpm)
  static ANDANTE = {
    name: "Andante",
    min: 56,
    max: 108,
  }
  // Andantino – slightly faster than andante, but slower than moderato (80–108 bpm) (although, in some cases, it can be taken to mean slightly slower than andante)
  static ANDANTINO = {
    name: "Andantino",
    min: 80,
    max: 108,
  }
  // Marcia moderato – moderately, in the manner of a march[13] (66–80 bpm)
  static MARCIA_MODERATO = {
    name: "Marcia moderato",
    min: 66,
    max: 80,
  }
  // Andante moderato – between andante and moderato (at a moderate walking speed) (80–108 bpm)
  static ANDANTE_MODERATO = {
    name: "Andante moderato",
    min: 80,
    max: 108,
  }
  // Moderato – at a moderate speed (108–120 bpm)
  static MODERATO = {
    name: "Moderato",
    min: 108,
    max: 120,
  }
  // Allegro moderato – close to, but not quite allegro (116–120 bpm)
  static ALLEGRO_MODERATO = {
    name: "Allegro moderato",
    min: 116,
    max: 120,
  }
  // Allegro – fast and bright (120–156 bpm)
  static ALLEGRO = {
    name: "Allegro",
    min: 120,
    max: 156,
  }
  // Molto Allegro or Allegro vivace – at least slightly faster and livelier than allegro, but always at its range (and no faster than vivace) (124–156 bpm)
  static MOLTO_ALLEGRO = {
    name: "Molto Allegro",
    min: 124,
    max: 156,
  }
  // Vivace – lively and fast (156–176 bpm)
  static VIVACE = {
    name: "Vivace",
    min: 156,
    max: 176,
  }
  // Vivacissimo and Allegrissimo – very fast, lively and bright (172–176 bpm)
  static VIVACISSIMO = {
    name: "Vivacissimo",
    min: 172,
    max: 176,
  }
  // Presto – very fast (168–200 bpm)
  static PRESTO = {
    name: "Presto",
    min: 168,
    max: 200,
  }
  // Prestissimo – extremely fast (200 bpm and over)
  static PRESTISSIMO = {
    name: "Prestissimo",
    min: 200,
    max: this.TEMPO.MAX,
  }

  constructor() {
    return Object.freeze(this);
  }
}

  // todo: include these snazzy words at some point:
  // Larghissimo – extremely slow, slowest type of tempo (24 bpm and under)
  // Adagissimo and Grave – very slow and solemn (24–40 bpm)
  // Largo – slow and broad (40–66 bpm)
  // Larghetto – rather slow and broad (44–66 bpm)
  // Adagio – slow with great expression[12] (44–66 bpm)
  // Adagietto – slower than andante or slightly faster than adagio (46–80 bpm)
  // Lento – slow (52–108 bpm)
  // Andante – at a walking pace, moderately slow (56–108 bpm)
  // Andantino – slightly faster than andante, but slower than moderato (80–108 bpm) (although, in some cases, it can be taken to mean slightly slower than andante)
  // Marcia moderato – moderately, in the manner of a march[13] (66–80 bpm)
  // Andante moderato – between andante and moderato (at a moderate walking speed) (80–108 bpm)
  // Moderato – at a moderate speed (108–120 bpm)
  // Allegretto – by the mid-19th century, moderately fast (112–120 bpm); see paragraph above for earlier usage
  // Allegro moderato – close to, but not quite allegro (116–120 bpm)
  // Allegro – fast and bright (120–156 bpm)
  // Molto Allegro or Allegro vivace – at least slightly faster and livelier than allegro, but always at its range (and no faster than vivace) (124–156 bpm)
  // Vivace – lively and fast (156–176 bpm)
  // Vivacissimo and Allegrissimo – very fast, lively and bright (172–176 bpm)
  // Presto – very fast (168–200 bpm)
  // Prestissimo – extremely fast (200 bpm and over)

export default MusicEnum;
