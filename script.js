const addBtn = document.getElementById('add-note');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const notesList = document.getElementById('notes-list');
const themeToggle = document.getElementById('theme-toggle');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

addBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  
  if (title === '' || content === '') {
    alert('Please fill both title and content');
    return;
  }
  
  const note = { id: Date.now(), title, content };
  notes.push(note);
  saveNotes();
  displayNotes();
  
  titleInput.value = '';
  contentInput.value = '';
});

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  displayNotes();
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    notesList.appendChild(noteDiv);
  });
}

displayNotes();
