const noteContainer = document.getElementById("note-container");
const addNoteForm = document.getElementById("add-note-form");

let notes = [];

function addNote(e) {
    e.preventDefault();
    const note = document.getElementById("note-input").value;
    if(note){
        const newNote = {
            id: Date.now(),
            text: note
        };
        notes.push(newNote);
        renderNotes();
        addNoteForm.reset();
    }
}

function deleteNote(noteId){
    notes = notes.filter(note => note.id !== noteId);
    renderNotes();
}

function renderNotes() {
    noteContainer.innerHTML = "";
    notes.forEach(note => {
        const noteEl = document.createElement("div");
        noteEl.classList.add("note");
        noteEl.innerHTML = `
            <div> ${note.text} </div>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        `;
        noteContainer.appendChild(noteEl);
    });
}

addNoteForm.addEventListener("submit", addNote);
