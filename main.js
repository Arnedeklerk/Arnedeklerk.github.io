const noteContainer = document.getElementById("note-container");
const addNoteBtn = document.getElementById("add-note-btn");

let notes = [];

function addNote() {
  const note = prompt("Enter your note:");
  const newNote = {
    id: Date.now(),
    text: note
  };
  notes.push(newNote);
  renderNotes();
}

function renderNotes() {
  noteContainer.innerHTML = "";
  notes.forEach(note => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.innerHTML = note.text;
    noteContainer.appendChild(noteEl);
  });
}

addNoteBtn.addEventListener("click", addNote);