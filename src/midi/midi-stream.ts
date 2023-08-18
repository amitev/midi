import { Note } from '../model/note';

type Observer = ((event: MidiEvent) => void);

const observers: Observer[] = [];

enum MidiCodes {
  NOTE_ON = 144,
  NOTE_OFF = 128,
  ACTIVE_SENSING = 254,
  CONTINUOUS_CONTROLLER = 176
}

export enum MidiEventType {
  NOTE_ON = 'on',
  NOTE_OFF = 'off',
  UPDATE = 'update',
}

export interface MidiEvent {
  type: MidiEventType,
  notes: Note[]
}

function toNote(midiMessage: number[]): Note {
  return new Note(midiMessage[1] % 12, Math.floor(midiMessage[1] / 12), midiMessage[2]);
}

let buffer: Array<Note> = [];

export function reset() {
  buffer = [];
}

export function handleMidiMessage(message: any) {
  let midiCommand = message.data[0] as number;
  if (midiCommand == MidiCodes.NOTE_ON) {
    let note = toNote(message.data);

    buffer.push(note);
    buffer.sort((note1, note2) => note1.compareTo(note2));

    if (buffer.length === 1) {
      observers.forEach((fn: Observer) => fn({
        type: MidiEventType.NOTE_ON,
        notes: [note]
      }));
    } else {
      observers.forEach((fn: Observer) => fn({
        type: MidiEventType.UPDATE,
        notes: [...buffer]
      }));
    }
  }

  if (midiCommand == MidiCodes.NOTE_OFF) {
    let note = toNote(message.data);

    buffer = buffer.filter((current) => current.getFullName() !== note.getFullName());

    if (buffer.length === 0) {
      observers.forEach((fn: Observer) => fn({
        type: MidiEventType.NOTE_OFF,
        notes: [note]
      }));
    } else {
      observers.forEach((fn: Observer) => fn({
        type: MidiEventType.UPDATE,
        notes: [...buffer]
      }));
    }
  }
}

let _navigator: any = navigator;
_navigator.requestMIDIAccess()
  .then((access: any) => {
    const inputs = access.inputs.values();

    access.inputs.forEach((input: any) => {
      console.log(input.name);
      input.onmidimessage = handleMidiMessage;
    });

    access.onstatechange = (event: any) => {
      // Print information about the (dis)connected MIDI controller
      console.log(event.port.name, event.port.manufacturer, event.port.state);
    };
  });

function subscribe(callback: (event: MidiEvent) => any) {
  observers.push(callback);
}

export default subscribe;
