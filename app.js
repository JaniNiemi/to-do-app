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
        taskEl.innerHTML = `<p onclick="taskCompleted(${i})">${task.task}</p> <button class="remove-task" data-index="${i}" onclick="removeTask(${i})"><i class="fa fa-times"></i>`;
        taskEl.classList.add("task");
        if(task.completed) {
            taskEl.classList.add("completed");
        }
        tasksEl.appendChild(taskEl);
    });
    handleLocalStorage();
}

// add new task when form is submitted, update DOM
function addTask(e) {
    e.preventDefault();
    if(newTaskInput.value.trim() === "") {
        alert("Please write a task");
        return false;
    }
    tasks.push({task: newTaskInput.value, completed: false},);
    newTaskForm.reset();
    buildDOM();
}

// remove task from tasks array, update localStorage
function removeTask(index) {
    tasks.splice(index, 1);
    document.querySelectorAll(".task")[index].classList.add("fade-up");
    setTimeout(() => {
        buildDOM();
    }, 500);
}

// set task completion state on click
function taskCompleted(index) {
    tasks[index].completed = !tasks[index].completed
    if(tasks[index].completed) {
        document.querySelectorAll(".task")[index].classList.add("completed");
    } else {
        document.querySelectorAll(".task")[index].classList.remove("completed");
    }
    handleLocalStorage();
}

// event listeners
newTaskForm.addEventListener("submit", addTask);

// on page load
if(localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    buildDOM();
}