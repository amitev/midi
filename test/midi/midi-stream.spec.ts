(global as any).navigator = {};
(navigator as any).requestMIDIAccess = async () => {};

import { expect } from 'chai';
import subscribe, { handleMidiMessage, MidiEvent, MidiEventType, reset } from '../../src/midi/midi-stream';
import { Note } from '../../src/model/note';

describe('midi-stream', () => {

  let buffer: Array<MidiEvent> = [];
  let observer: (event: MidiEvent) => any = (event) => buffer.push(event);

  before(() => {
    subscribe(observer);
  });

  beforeEach(() => {
    buffer.length = 0;
    reset();
  });

  it('should fire a NOTE_ON when a note is activated and the buffer is empty', () => {
    handleMidiMessage({
      data: [144, 12, 50]
    });

    expect(buffer.length).to.eql(1);
    expect(buffer[0].type).to.eql(MidiEventType.NOTE_ON);
    expect(buffer[0].notes.length).to.eql(1);
    expect(buffer[0].notes[0].getFullName()).to.eql('C1');
  });

  it('should fire an UPDATE when a note is activated and there are existing notes in the buffer', () => {
    handleMidiMessage({
      data: [144, 16, 50]
    });

    handleMidiMessage({
      data: [144, 12, 50]
    });

    expect(buffer.length).to.eql(2);
    expect(buffer[0].type).to.eql(MidiEventType.NOTE_ON);

    expect(buffer[1].type).to.eql(MidiEventType.UPDATE);
    expect(buffer[1].notes.length).to.eql(2);
    expect(buffer[1].notes[0].getFullName()).to.eql('C1');
    expect(buffer[1].notes[1].getFullName()).to.eql('E1');
  });

  it('should fire a NOTE_OFF when a note is activated and then deactivated', () => {
    handleMidiMessage({
      data: [144, 12, 50]
    });

    handleMidiMessage({
      data: [128, 12, 50]
    });

    expect(buffer.length).to.eql(2);
    expect(buffer[0].type).to.eql(MidiEventType.NOTE_ON);
    expect(buffer[0].notes.length).to.eql(1);
    expect(buffer[0].notes[0].getFullName()).to.eql('C1');

    expect(buffer[1].type).to.eql(MidiEventType.NOTE_OFF);
    expect(buffer[1].notes.length).to.eql(1);
    expect(buffer[1].notes[0].getFullName()).to.eql('C1');
  });

  it('should fire an UPDATE when multiple notes are activated and then one of them gets deactivated', () => {
    handleMidiMessage({
      data: [144, 12, 50]
    });

    handleMidiMessage({
      data: [144, 14, 50]
    });

    handleMidiMessage({
      data: [128, 12, 50]
    });

    expect(buffer.length).to.eql(3);
    expect(buffer[0].type).to.eql(MidiEventType.NOTE_ON);
    expect(buffer[0].notes.length).to.eql(1);
    expect(buffer[0].notes[0].getFullName()).to.eql('C1');

    expect(buffer[1].type).to.eql(MidiEventType.UPDATE);
    expect(buffer[1].notes.length).to.eql(2);
    expect(buffer[1].notes[0].getFullName()).to.eql('C1');
    expect(buffer[1].notes[1].getFullName()).to.eql('D1');

    expect(buffer[2].type).to.eql(MidiEventType.UPDATE);
    expect(buffer[2].notes.length).to.eql(1);
    expect(buffer[2].notes[0].getFullName()).to.eql('D1');
  });
});