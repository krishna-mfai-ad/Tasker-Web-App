// Select the task add box and task container elements
var inBox = document.querySelector('.task-add-box');
var taskCon = document.getElementById("TaskContainer");
var cancelBtn = document.getElementById("cancelBtn");
var allBtn = document.querySelector('button[name="allBtn"]');
var categoryFilter = document.getElementById("category1");
var sureDelete=document.getElementById("sureDelete")
var editIndex = null;

// Initially hide the task add box
inBox.style.scale = 0;

// Load tasks from local storage
loadTasks();

// Function to show the task add box
function addtask() {
    inBox.style.transition = "all 0.2s";
    inBox.style.scale = 1;
}

// Function to add or update the task in the task container
function addToWindow() {
    let insertName = document.getElementById("insertName").value;
    let category = document.getElementById("category2").value;

    if (insertName === "" || category === "Category") {
        alert("Please enter task name and select a category.");
        return;
    }

    if (editIndex !== null) {
        // Update the existing task
        let taskOne = taskCon.children[editIndex];
        taskOne.querySelector('h1').innerText = insertName;
        taskOne.querySelector('p').innerText = category;
        editIndex = null;
    } else {
        // Create a new task
        let taskOne = document.createElement("div");
        taskOne.classList.add("taskOne");
        taskOne.innerHTML = `
            <div class="taskContent">
                <h1>${insertName}</h1>
                <p>${category}</p>
            </div>
            <div class="taskActions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskCon.appendChild(taskOne);
    }

    saveTasks();

    // Hide the task add box and clear the input fields
    inBox.style.scale = 0;
    document.getElementById("insertName").value = "";
    document.getElementById("category2").value = "Category";
}

// Function to edit a task
function editTask(button) {
    let taskOne = button.parentElement.parentElement;
    let taskContent = taskOne.querySelector('.taskContent');
    document.getElementById("insertName").value = taskContent.querySelector('h1').innerText;
    document.getElementById("category2").value = taskContent.querySelector('p').innerText;
    editIndex = Array.from(taskCon.children).indexOf(taskOne);
    addtask();
}

// Function to delete a task
function deleteTask(button) {
    let taskOne = button.parentElement.parentElement;
    taskCon.removeChild(taskOne);
    saveTasks();
    sureDelete.innerHTML = `
    <div class="taskContent">
        <h1>${insertName}</h1>
        <p>${category}</p>
    </div>
`;
}

// Function to save tasks to local storage
function saveTasks() {
    let tasks = [];
    taskCon.querySelectorAll('.taskOne').forEach(task => {
        let taskName = task.querySelector('h1').innerText;
        let category = task.querySelector('p').innerText;
        tasks.push({ taskName, category });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCon.innerHTML = '';  // Clear the task container
    tasks.forEach(task => {
        let taskOne = document.createElement("div");
        taskOne.classList.add("taskOne");
        taskOne.innerHTML = `
            <div class="taskContent">
                <h1>${task.taskName}</h1>
                <p>${task.category}</p>
            </div>
            <div class="taskActions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskCon.appendChild(taskOne);
    });
}

// Function to display all tasks when the "All" button is clicked
function displayAllTasks() {
    loadTasks();
}

// Function to filter tasks by category
function filterTasksByCategory() {
    let selectedCategory = categoryFilter.value;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCon.innerHTML = '';  // Clear the task container
    tasks.filter(task => task.category === selectedCategory).forEach(task => {
        let taskOne = document.createElement("div");
        taskOne.classList.add("taskOne");
        taskOne.innerHTML = `
            <div class="taskContent">
                <h1>${task.taskName}</h1>
                <p>${task.category}</p>
            </div>
            <div class="taskActions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskCon.appendChild(taskOne);
    });
}

// Add event listener to the "Add" button inside the task add box
document.getElementById('addBtn').addEventListener('click', addToWindow);

// Add event listener to the "Cancel" button inside the task add box
cancelBtn.addEventListener('click', function () {
    inBox.style.scale = 0;
    document.getElementById("insertName").value = "";
    document.getElementById("category2").value = "Category";
    editIndex = null;
});

// Add event listener to the "All" button to display all tasks
allBtn.addEventListener('click', displayAllTasks);

// Add event listener to the category filter dropdown to filter tasks by category
categoryFilter.addEventListener('change', filterTasksByCategory);
