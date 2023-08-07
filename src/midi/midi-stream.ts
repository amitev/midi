import {Note} from '../model/note';

type Observer = ((value: string) => void);

const observers: Observer[] = [];

export enum MidiCodes {
  NOTE_ON = 144,
  NOTE_OFF = 128,
  ACTIVE_SENSING = 254,
  CONTINUOUS_CONTROLLER = 176
}

function toNote(midiMessage: number[]): Note {
  return new Note(midiMessage[1] % 12, Math.floor(midiMessage[1] / 12));
}

function midiMessage(message: any) {
  let data = message.data[0] as number;
  if (data == MidiCodes.NOTE_ON) {
    console.log('note on', toNote(message.data).getName());

    observers.forEach((fn: Observer) => fn(message.data.toString()));
  }

  if (data == MidiCodes.NOTE_OFF) {
    console.log('note off', toNote(message.data).getName());

    // TODO send velocity

    observers.forEach((fn: Observer) => fn(message.data.toString()));
  }
}

let _navigator: any = navigator;
_navigator.requestMIDIAccess()
  .then((access: any) => {
    const inputs = access.inputs.values();

    access.inputs.forEach((input: any) => {
      console.log(input.name);
      input.onmidimessage = midiMessage;
    });

    access.onstatechange = (event: any) => {
      // Print information about the (dis)connected MIDI controller
      console.log(event.port.name, event.port.manufacturer, event.port.state);
    };
  });

function subscribe(callback: (value: string) => any) {
  observers.push(callback);
}

export default subscribe;
