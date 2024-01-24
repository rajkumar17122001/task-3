var taskList = [];
var inputType = "add";
var editTaskId;

var inputTask = document.getElementById("taskInput");
var createBtn = document.getElementById("createBtn");
var noTasks = document.getElementById("noTasks");
var tasks = document.querySelector(".tasks");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();

    createBtn.disabled = true;
});

inputTask.addEventListener("change", function() {
    if(inputTask.value.trim() != null){
        createBtn.disabled = false;
    } else {
        createBtn.disabled = true;
    }
});

inputTask.addEventListener("input", function () {
    createBtn.disabled = !inputTask.value.trim();
});

function createTask() {
    if (!inputTask.value.trim()) {
        return;
    }
    
    var task = {
        id: Date.now(),
        text: inputTask.value
    };
    taskList.push(task);
    saveTasksToLocalStorage();
    renderTask(task);
    inputTask.value = "";
    createBtn.disabled = true;
}

function createSave() {
    if (inputType === "add") {
        createTask();
    } 
    
    if (inputType === "save") {
        saveTask();
        createBtn.disabled = true;
    }
}

function renderTask(task) {
    if (taskList.length === 0) {
        noTasks.style.display = "flex"; 
        tasks.style.display = "none"; 
    } else {
        noTasks.style.display = "none"; 
        tasks.style.display = "flex";
    }

    var li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
        <span class="text">${task.text}</span>
        <div class="btn-container">
            <button class="editButton" onclick="editTask('${task.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>
            <button class="deleteButton" onclick="deleteTask('${task.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
            </button>
        </div>
    `;

    tasks.appendChild(li);
}

function renderTasks() {
    tasks.innerHTML = ""; 
     
    // Render tasks from the taskList array
    taskList.forEach(function(task) {
        renderTask(task);
    });
    
    if (taskList.length === 0) {
        noTasks.style.display = "flex"; 
        tasks.style.display = "none"; 
    } else {
        noTasks.style.display = "none"; 
        tasks.style.display = "flex"; 
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
        renderTasks(); // Render tasks from localStorage
    }
}

function editTask(taskId) {
    editTaskId = taskId;
    var task = taskList.find(function(task) {
        return task.id == taskId;
    });

    inputTask.value = task.text;
    inputType = "save";
    createBtn.innerText = "Save task";
}

function deleteTask(taskId) {
    taskId = parseInt(taskId);
    taskList = taskList.filter(function(task) {
        return task.id !== taskId;
    });
    saveTasksToLocalStorage();
    renderTasks();
}

function saveTask() {
    if (editTaskId !== undefined) {
        // Check if editTaskId is defined
        var taskToEdit = taskList.find(function (task) {
            return task.id == editTaskId;
        });

        if (taskToEdit) {
            // If the task is found, update its text
            taskToEdit.text = inputTask.value;
            saveTasksToLocalStorage();
            renderTasks();
            inputTask.value = "";
            editTaskId = undefined; // Reset editTaskId
            createBtn.innerText = "Add task"; // Reset button text
        }
    }
}


// Update time

function updateTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = dayNames[now.getDay()];

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = monthNames[now.getMonth()];

    var date = now.getDate();
    var year = now.getFullYear();

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${day}, ${date} ${month} ${year}`;
}

updateTime(); // Initial call to display time and date
setInterval(updateTime, 1000);