const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addTaskButton = document.getElementById('addTaskButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value;
    const dueDate = dateInput.value;

    if (taskText && dueDate) {
        const task = {
            text: taskText,
            date: dueDate
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        dateInput.value = '';

        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.querySelector('.taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('toDoRow');
        taskItem.innerHTML = `
            <p>${task.text}</p>
            <p>${task.date}</p>
            <button data-index="${index}" onclick="deleteTask()" class="deleteButton">Delete</button>
        `;
        taskList.appendChild(taskItem);
    })
    
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    })
}


function deleteTask(event) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
