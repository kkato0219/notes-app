const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-note-btn");
const notesList = document.getElementById("notes-list");

window.addEventListener("DOMContentLoaded", () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNoteToDOM(note.text, note.id, note.timestamp));
});

addBtn.addEventListener("click", function() {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
        const noteId = Date.now();
        const timestamp = new Date().toLocaleString();
        addNoteToDOM(noteText, noteId, timestamp);
        saveNoteToStorage(noteText, noteId, timestamp);
        noteInput.value = "";
    } else {
        alert("Please write a note!");
    }
});

function addNoteToDOM(text, id, timestamp) {
    const li = document.createElement("li");

    const noteSpan = document.createElement("span");
    noteSpan.textContent = text;
    li.appendChild(noteSpan);

    const timeSpan = document.createElement("span");
    timeSpan.textContent = ` (${timestamp})`;
    timeSpan.style.fontSize = "12px";
    timeSpan.style.color = "#666";
    li.appendChild(timeSpan);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";
    editBtn.style.cursor = "pointer";
    editBtn.addEventListener("click", function() {
        const newText = prompt("Edit your note:", noteSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            noteSpan.textContent = newText.trim();
            updateNoteInStorage(id, newText.trim());
        }
    });
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", function() {
        li.remove();
        removeNoteFromStorage(id);
    });
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
}

function saveNoteToStorage(text, id, timestamp) {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push({ text, id, timestamp });
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

function removeNoteFromStorage(id) {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes = savedNotes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

function updateNoteInStorage(id, newText) {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteIndex = savedNotes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
        savedNotes[noteIndex].text = newText;
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    }
}

