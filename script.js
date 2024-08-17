    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');

    // Load todos from localStorage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    };

    // Save todos to localStorage
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.querySelector('.todo-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Add todo to DOM
    const addTodoToDOM = (todo) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        if (todo.completed) {
            li.classList.add('completed');
        }
        todoList.appendChild(li);

        // Add event listeners for edit and delete buttons
        li.querySelector('.edit-btn').addEventListener('click', () => editTodoItem(li));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodoItem(li));
    };

    // Add new todo
    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todo = { text: todoText, completed: false };
            addTodoToDOM(todo);
            saveTodos();
            todoInput.value = '';
        }
    };

    // Edit todo item
    const editTodoItem = (li) => {
        const todoText = li.querySelector('.todo-text');
        const newText = prompt('Edit your task:', todoText.textContent);
        if (newText !== null && newText.trim() !== '') {
            todoText.textContent = newText.trim();
            saveTodos();
        }
    };

    // Delete todo item
    const deleteTodoItem = (li) => {
        li.remove();
        saveTodos();
    };

    // Toggle dark/light mode
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
    };

    // Event listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    toggleThemeBtn.addEventListener('click', toggleTheme);

    // Load todos on page load
    loadTodos();
