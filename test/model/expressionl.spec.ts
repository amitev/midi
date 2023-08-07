

// [CMs]
// [C,E,G]

import { expect } from "chai";
import { Expression } from "../../src/model/expression";
import { Note } from "../../src/model/note";

// chord types
// CM, Cm, CM7, C7, Cm7, CmM7, Cdim, Cm7b5, Caug, Csus2, Csus4
// Expression za scale ot, no starta da ne e 1 poziciq?

describe('Expression', () => {

  describe.only('single note', () => {
    it('should support a single note', () => {
      let expression = new Expression('C');
      let sequence = [Note.fromName('C1')];
  
      expect(expression.matches(sequence)).to.be.true;

      // negative case
      sequence = [Note.fromName('D1')];
  
      expect(expression.matches(sequence)).to.be.false;
    });

    it('should throw an error if the note is not recognized', () => {
      expect(() => new Expression('Z')).to.throw('Unrecognized note');
    });
  });



  it('should support multiple notes one after another', () => {

  });

  it('should support octaves playing', () => {

  });

  it('should support multiple notes played simultaneiously', () => {

  });

  it('should support a chord with its all inversions', () => {
    // try with minor, major and seventh chords
  });

  it('should support multiple chords one-after another with its all inversions', () => {
    // try with minor, major and seventh chords
  });

  it('should support playing the same with both hands', () => {
    // octaves playing with both hands
  });

  it('should support playing a single chord with both hands', () => {
    // test with 9th and 11th chords
  });
});