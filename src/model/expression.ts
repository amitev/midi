// matcher v otdelen class?

import { Note } from "./note";

interface ExpressionElement {
  matches(sequence: Note[]): boolean;
}


class ExpressionNote implements ExpressionElement {

  private static NOTE_EXPRESSION_PATTERN = /[A-G]{1}/;

  constructor(private value: string) {
    if (value.length == 1 && !ExpressionNote.NOTE_EXPRESSION_PATTERN.test(value)) {
      throw new Error("Unrecognized note");
    }
  }

  public static isNote(value: string) {
    if (ExpressionNote.NOTE_EXPRESSION_PATTERN.test(value)) {
      return true;
    }

    throw new Error("Unrecognized note");

    return false;
  }

  matches(sequence: Note[]): boolean {
    // TODO note-a sega ima chislo, trqbva toi da moje da proveri value da ima takava funkciq)
    return sequence[0].matches(this.value);
  }
}

class ExpressionChord {

}

class ExpressionScale {

}

export class Expression {

  private elemenents: ExpressionElement[] = [];

  constructor(private value: string) {
    this.parse(value);
  }

  private parse(value: string) {
    let separated = value.split(',');
    for (let current of separated) {
      if (ExpressionNote.isNote(current)) {
        this.elemenents.push(new ExpressionNote(current));
      };
    }
  }

  public matches(sequence: Note[]): boolean {
    // iterate nqkak si i match i da izqjda veche validiranite
    return this.elemenents[0].matches(sequence);
  }


}

// model for expression
// ne6to kato regex
// add note including time being pressed
// on fehler event
// on success event