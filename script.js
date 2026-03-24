const todoInput = document.getElementById("todo-input");
const todoAddBtn = document.getElementById("todo-add-btn");
const todoColumn = document.getElementById("todo-column");

function addTodoTask() {
    let task = todoInput.value.trim();
    if (task === "") {
        return;
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = task;
    todoColumn.append(newCard);
    todoInput.value = "";
}

todoAddBtn.addEventListener("click", addTodoTask);
todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodoTask();
    }
});


const ongoingInput = document.getElementById("ongoing-input");
const ongoingAddBtn = document.getElementById("ongoing-add-btn");
const ongoingColumn = document.getElementById("ongoing-column");

function ongoingTask() {
    let task = ongoingInput.value.trim();
    if (task === "") {
        return;
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = task;
    ongoingColumn.append(newCard);
    ongoingInput.value = "";
}

ongoingAddBtn.addEventListener("click", ongoingTask);
ongoingInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter"){
        ongoingTask();
    }
});


const doneInput = document.getElementById("done-input");
const doneAddBtn = document.getElementById("done-add-btn");
const doneColumn = document.getElementById("done-column");

function doneTask() {
    let task = doneInput.value.trim();
    if (task === "") {
        return;
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerText = task;
    doneColumn.append(newCard);
    doneInput.value = "";
}

doneAddBtn.addEventListener("click", doneTask);
doneInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter"){
        doneTask();
    }
});