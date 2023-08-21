import { expect } from "chai";
import { Expression } from "../../src/model/expression";
import { Note } from "../../src/model/note";

// chord types
// CM, Cm, CM7, C7, Cm7, CmM7, Cdim, Cm7b5, Caug, Csus2, Csus4
// Expression za scale ot, no starta da ne e 1 poziciq?

describe.only('Expression', () => {

  describe('single note', () => {
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

  describe('note sequence', () => {
    it('should support multiple notes one after another', () => {
      let expression = new Expression('C,E,G');
      let sequence = [Note.fromName('C1'), Note.fromName('E1'), Note.fromName('G1')];
  
      expect(expression.matches(sequence)).to.be.true;
  
      expression = new Expression('C,E,G');
      sequence = [Note.fromName('C1'), Note.fromName('E1'), Note.fromName('D1')];
  
      expect(expression.matches(sequence)).to.be.false;
    });

    it.skip('should support octaves playing', () => {
    
    });
  
    it.skip('should support multiple notes played simultaneiously', () => {
  
    });
  });



  it.skip('should support a chord with its all inversions', () => {
    // try with minor, major and seventh chords
  });

  it.skip('should support multiple chords one-after another with its all inversions', () => {
    // try with minor, major and seventh chords
  });

  it.skip('should support playing the same with both hands', () => {
    // octaves playing with both hands
  });

  it.skip('should support playing a single chord with both hands', () => {
    // test with 9th and 11th chords
  });
});