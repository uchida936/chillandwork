// To-Do List
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
  const input = document.getElementById('todo-input');
  const todoText = input.value.trim();
  if (todoText) {
    todos.push({ id: Date.now(), text: todoText, completed: false });
    input.value = '';
    saveTodos();
    renderTodos();
  }
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = todos.map(todo => `
    <li class="${todo.completed ? 'completed' : ''}">
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleTodo(${todo.id})">${todo.completed ? '✅' : '⬜'}</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    </li>
  `).join('');
}

function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Заметки
const notesInput = document.getElementById('notes-input');
const notesDisplay = document.getElementById('notes-display');

function saveNotes() {
  const notes = notesInput.value.trim();
  localStorage.setItem('notes', notes);
  renderNotes();
}

function renderNotes() {
  const notes = localStorage.getItem('notes') || '';
  notesDisplay.textContent = notes;
}

// Spotify Integration
async function getNowPlaying() {
  // Заглушка для Spotify API
  const nowPlaying = {
    name: "Название трека",
    artist: "Исполнитель",
    albumArt: "https://via.placeholder.com/150"
  };

  document.getElementById('track-name').textContent = nowPlaying.name;
  document.getElementById('artist-name').textContent = nowPlaying.artist;
  document.getElementById('album-art').src = nowPlaying.albumArt;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  renderNotes();
  getNowPlaying();
});
