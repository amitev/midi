// https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html
const NOTE_PATTERN = /([A-G]{1}[b#]?)(\d{1,2})/;

export class Note {
  
  constructor(public value: number, public octave: number, public velocity?: number) { }

  getName(): string {
    switch (this.value) {
      case 0: return 'C';
      case 1: return 'C#';
      case 2: return 'D';
      case 3: return 'Eb';
      case 4: return 'E';
      case 5: return 'F';
      case 6: return 'F#';
      case 7: return 'G';
      case 8: return 'Ab';
      case 9: return 'A';
      case 10: return 'Bb';
      case 11: return 'B';
    }
  }

  getFullName(): string {
    switch (this.value) {
      case 0: return 'C' + this.octave;
      case 1: return 'C#' + this.octave;
      case 2: return 'D' + this.octave;
      case 3: return 'Eb' + this.octave;
      case 4: return 'E' + this.octave;
      case 5: return 'F' + this.octave;
      case 6: return 'F#' + this.octave;
      case 7: return 'G' + this.octave;
      case 8: return 'Ab' + this.octave;
      case 9: return 'A' + this.octave;
      case 10: return 'Bb' + this.octave;
      case 11: return 'B' + this.octave;
    }
  }

  compareTo(note: Note) {
    return ((this.octave * 12) + this.value) - ((note.octave * 12) + note.value);
  }

  matches(value: string): boolean {
    return value === this.getName();
  }

  static fromName(name: string): Note {
    let parsedNote: RegExpExecArray = NOTE_PATTERN.exec(name);

    if (!parsedNote) {
      throw new Error('Unrecognized note: ' + name);
    }

    let getValue = (name: string) => {
      switch (parsedNote[1]) {
        case 'C': return 0;
        case 'C#': return 1;
        case 'Db': return 1;
        case 'D': return 2;
        case 'D#': return 3;
        case 'Eb': return 3;
        case 'E': return 4;
        case 'F': return 5;
        case 'F#': return 6;
        case 'Gb': return 6;
        case 'G': return 7;
        case 'G#': return 8;
        case 'Ab': return 8;
        case 'A': return 9;
        case 'A#': return 10;
        case 'Bb': return 10;
        case 'B': return 11;
      }
    }

    return new Note(getValue(name), Number.parseInt(parsedNote[2]));
  }

};