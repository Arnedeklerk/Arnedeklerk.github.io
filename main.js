const noteContainer = document.getElementById("note-container");
const addNoteForm = document.getElementById("add-note-form");

let notes = [];

function addNote(e) {
    e.preventDefault();
    const note = document.getElementById("note-input").value;
    if(note){
        const newNote = {
            id: Date.now(),
            text: note,
            completed: false
        };
        notes.push(newNote);
        renderNotes();
        addNoteForm.reset();
    }
}

function editNote(noteId){
    const note = notes.find(n => n.id === noteId);
    const updatedNote = prompt("Edit Note:", note.text);
    if (updatedNote) {
        note.text = updatedNote;
        renderNotes();
    }
}

function deleteNote(noteId){
    notes = notes.filter(note => note.id !== noteId);
    renderNotes();
}

function toggleCompleted(noteId){
    const note = notes.find(n => n.id === noteId);
    note.completed = !note.completed;
    renderNotes();
}

function renderNotes() {
    noteContainer.innerHTML = "";
    notes.forEach(note => {
        const noteEl = document.createElement("div");
        noteEl.classList.add("note");
        noteEl.innerHTML = `
            <div> 
                <input type="checkbox" id="note-${note.id}" ${note.completed ? "checked" : ""} onchange="toggleCompleted(${note.id})"/>
                <label for="note-${note.id}" ${note.completed ? "style='text-decoration: line-through;'" : ""}>${note.text}</label>
            </div>
            <div class="note-btns">
                <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        noteContainer.appendChild(noteEl);
    });
}

addNoteForm.addEventListener("submit", addNote);
