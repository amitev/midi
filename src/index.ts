import subscribe from "./midi/midi-stream";

subscribe((event) => {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = event;
  document.body.appendChild(newParagraph);
});