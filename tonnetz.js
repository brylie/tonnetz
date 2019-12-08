//create a four voice synth
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var tonnetz = document.getElementById("tonnetz");

tonnetz.addEventListener("load", attachSounds);

function attachSounds() {
    var tonnetzSvg = tonnetz.contentDocument.documentElement;

    attachNoteSounds(tonnetzSvg);
    attachChordSounds(tonnetzSvg);
}

function attachNoteSounds (tonnetzSvg) {
    var notes = tonnetzSvg.querySelectorAll(".note");

    notes.forEach(function (element) {
        element.addEventListener("mousedown", playNote);
        element.addEventListener("mouseup", stopNote);
    });
}

function playNote(event) {
    var note = event.target.dataset["notes"];

    polySynth.triggerAttack(`${note}4`)
}

function stopNote(event) {
    var note = event.target.dataset["notes"];

    polySynth.triggerRelease(`${note}4`)
}

function attachChordSounds (tonnetzSvg) {
    var chords = tonnetzSvg.querySelectorAll(".chord");

    chords.forEach(function (element) {
        element.addEventListener("mousedown", playChord);
        element.addEventListener("mouseup", stopChord);
    });
}

function playChord(event, chordNotes) {
    var tonic = event.target.dataset["tonic"];
    var quality = event.target.dataset["quality"];

    var chord = teoria.note(tonic).chord(quality).simple()
    
    var notes_with_octave = chord.map(note => {
        return `${note}4`
    });

    polySynth.triggerAttack(notes_with_octave);
}

function stopChord(event) {
    var tonic = event.target.dataset["tonic"];
    var quality = event.target.dataset["quality"];

    var chord = teoria.note(tonic).chord(quality).simple()

    var notes_with_octave = chord.map(note => {
        return `${note}4`
    });

    polySynth.triggerRelease(notes_with_octave)
}
