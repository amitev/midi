import { expect } from 'chai';
import { Note } from '../../src/model/note';

describe('Note', () => {

  describe('from name', () => {
    it('should create node object from String', () => {
      let note = Note.fromName('C2');
      expect(note.value).to.eql(0);
      expect(note.octave).to.eql(2);

      note = Note.fromName('Eb3');
      expect(note.value).to.eql(3);
      expect(note.octave).to.eql(3);

      note = Note.fromName('D#3');
      expect(note.value).to.eql(3);
      expect(note.octave).to.eql(3);
    });

    it('should throw an error when the note is not existig', () => {
      expect(() => Note.fromName('Z1')).to.throw('Unrecognized note: Z1');
    });
  });
});