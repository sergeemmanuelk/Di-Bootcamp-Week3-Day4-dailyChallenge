const tasks = [];
let form = document.forms.formTodoList;
let inputTodo = document.getElementById("todo");
let divListTasks = document.getElementsByClassName("listTasks")[0];
let clearPanel = document.getElementById("clearPanel");
divListTasks.removeChild(clearPanel);
let inputUser = document.getElementById("todo");
let idTask = 0;

class Task {
    constructor(task_id, text, done) {
        this.task_id = task_id;
        this.text = text;
        this.done = done;
    }
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    addTask();
});

inputUser.addEventListener("keypress", (ev) => {
    if (ev.key == "Enter") {
        addTask();
    }
});

function addTask() {
    let dataInputValue = inputTodo.value.trim();
    if (dataInputValue != '' && !checkDoublon(dataInputValue)) {
        let task = new Task(idTask, dataInputValue, false);
        tasks.push(task);
        divListTasks.appendChild(createTask(task))
        divListTasks.appendChild(clearPanel);
        idTask++;
        inputUser.value = "";
        inputUser.focus();

        if (divListTasks.childElementCount != 0) divListTasks.style.paddingTop = "20px";
    }
}

function checkDoublon(dataInputValue) {
    for (const task of tasks) {
        if (dataInputValue == task.text) {
            alert("This task is already added");
            return true;
        }
    }
    return false;
}

function createTask(task) {
    let item = document.createElement("div");
    item.classList.add("task");
    item.setAttribute("data-task-id", task.task_id);

    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark", "icon");
    icon.addEventListener("click", deleteTask)

    let blankNode = document.createTextNode(" ");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox" + task.task_id);
    checkbox.setAttribute("id", "checkbox" + task.task_id);
    checkbox.addEventListener("input", doneTask);

    let labelCheckbox = document.createElement("label");
    labelCheckbox.innerHTML = task.text;
    labelCheckbox.setAttribute("for", "checkbox" + task.task_id);

    item.appendChild(icon);
    item.appendChild(blankNode);
    item.appendChild(checkbox);
    item.appendChild(labelCheckbox);

    return item;
}

function doneTask(event) {
    let taskElement = findTaskElement(event);
    let task = taskElement.task;
    let divParent = taskElement.divParent;

    task.isDone = event.target.checked;

    task.isDone ? divParent.lastElementChild.classList.add("task-done") : divParent.lastElementChild.classList.remove("task-done");
}

function findTaskElement(event) {
    let taskElement = {};

    let divParent = event.target.closest("div"); 
    
    let task = tasks.find((taskObject) => {
        return taskObject.task_id == divParent.getAttribute("data-task-id");
    });

    taskElement = { "divParent": divParent, "task": task };

    return taskElement;
}

function deleteTask(event) {
    let taskElement = findTaskElement(event);
    let task = taskElement.task;
    let divParent = taskElement.divParent;

    for (const key in tasks) {
        if (tasks[key].task_id == task.task_id) {
            tasks.splice(key, 1);
            break;
        }
    }

    divListTasks.removeChild(divParent);

    cleanObject();
}

function cleanObject() {
    if (tasks.length == 0) {
        idTask = 0;

        divListTasks.style.paddingTop = "0px";
        divListTasks.innerHTML = "";
    }
}

function clearTasks(event) {
    tasks.splice(0, tasks.length);

    cleanObject();
}