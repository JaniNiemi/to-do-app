const newTaskForm = document.querySelector("#new-task");
const newTaskInput = document.querySelector("#task-input");
const tasksEl = document.querySelector("#task-list");
const removeBtns = document.querySelectorAll(".remove-task");

let tasks = [];

// handle localStorage
function handleLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// build DOM with tasks from tasks array
function buildDOM() {
    tasksEl.innerHTML = "";
    tasks.forEach((task, i) => {
        const taskEl = document.createElement("li");
        taskEl.innerHTML = `<p>${task.task}</p> <button class="remove-task" data-index="${i}" onclick="removeTask(${i})"><i class="fa fa-times"></i>`;
        taskEl.classList.add("task");
        tasksEl.appendChild(taskEl);
    });
    handleLocalStorage();
}

// add new task when form is submitted
function addTask(e) {
    e.preventDefault();
    if(newTaskInput.value.trim() === "") {
        alert("Please write a task");
        return false;
    }
    tasks.push({task: newTaskInput.value},);
    newTaskForm.reset();
    buildDOM();
}

// remove task from tasks array, update localStorage
function removeTask(index) {
    tasks.splice(index, 1);
    buildDOM();
}

// event listeners
newTaskForm.addEventListener("submit", addTask);

// on page load
if(localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    buildDOM();
}