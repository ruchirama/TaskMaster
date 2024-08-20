// Select DOM elements
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const teamMemberInput = document.getElementById('team-member-input'); // New element
const taskList = document.getElementById('tasks');
const searchInput = document.getElementById('search-input');

// Initialize tasks array
let tasks = [];

// Add task event listener
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

// Search tasks event listener
searchInput.addEventListener('input', filterTasks);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const teamMember = teamMemberInput.value; // New property

    if (taskText) {
        tasks.push({ text: taskText, dueDate, priority, teamMember }); // Updated task object
        // Reset form fields
        taskInput.value = '';
        dueDateInput.value = '';
        teamMemberInput.value = ''; // Reset team member input
        renderTasks();
    }
}

// Render tasks function
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <span>Due: ${task.dueDate}</span>
            <span>Priority: ${task.priority}</span>
            <span>Assigned to: ${task.teamMember}</span> <!-- New span for team member -->
            <button data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Filter tasks function
function filterTasks() {
    const filterText = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(filterText));
    tasks = filteredTasks;
    renderTasks();
}

// Delete task event listener
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    }
});
