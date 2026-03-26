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
    newCard.setAttribute("draggable", "true");

    /* CHANGE: Created span and button for the card structure */
    const cardText = document.createElement("span");
    cardText.classList.add("card-text");
    cardText.innerText = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";

    /* CHANGE: Appended the new elements instead of using innerText */
    newCard.appendChild(cardText);
    newCard.appendChild(deleteBtn);

    todoColumn.append(newCard);
    todoInput.value = "";
    saveData();
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
    newCard.setAttribute("draggable", "true");

    /* CHANGE: Applied span + button structure here too */
    const cardText = document.createElement("span");
    cardText.classList.add("card-text");
    cardText.innerText = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";

    newCard.appendChild(cardText);
    newCard.appendChild(deleteBtn);

    ongoingColumn.append(newCard);
    ongoingInput.value = "";
    saveData();
}

ongoingAddBtn.addEventListener("click", ongoingTask);
ongoingInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
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
    newCard.setAttribute("draggable", "true");

    /* CHANGE: Applied span + button structure here too */
    const cardText = document.createElement("span");
    cardText.classList.add("card-text");
    cardText.innerText = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "X";

    newCard.appendChild(cardText);
    newCard.appendChild(deleteBtn);

    doneColumn.append(newCard);
    doneInput.value = "";
    saveData();
}

doneAddBtn.addEventListener("click", doneTask);
doneInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        doneTask();
    }
});

/* --- DELETE LOGIC (EVENT DELEGATION) --- */
/* CHANGE: This one listener handles every delete button in every column */
document.getElementById("container").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const cardToRemove = event.target.closest(".card");
        if (cardToRemove) {
            cardToRemove.remove();
            saveData();
        }
    }

});


let draggedCard = null;

document.addEventListener("dragstart", (event) => {
    /* CHANGE: Used .closest() so grabbing the text span still picks up the whole card */
    const card = event.target.closest(".card");
    if (card) {
        draggedCard = card;
        // setData still works on the card element
        event.dataTransfer.setData("text/plain", draggedCard.innerText);
        draggedCard.style.opacity = "0.5";
    }
});

document.addEventListener("dragend", (event) => {
    const card = event.target.closest(".card");
    if (card) {
        card.style.opacity = "1";
        draggedCard = null;
    }
});


const allColumns = [todoColumn, ongoingColumn, doneColumn];

allColumns.forEach(column => {
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    column.addEventListener("drop", (event) => {
        event.preventDefault();
        if (draggedCard) {
            column.append(draggedCard);
            saveData();
        }
    });
});


// --- LOCAL STORAGE LOGIC ---

function saveData() {
    // Create an object to hold the text of all cards in each column
    const data = {
        todo: Array.from(todoColumn.querySelectorAll(".card-text")).map(span => span.innerText),
        ongoing: Array.from(ongoingColumn.querySelectorAll(".card-text")).map(span => span.innerText),
        done: Array.from(doneColumn.querySelectorAll(".card-text")).map(span => span.innerText)
    };
    
    // Convert the object to a string and save it to the browser's memory
    localStorage.setItem("kanbanData", JSON.stringify(data));
}

function loadData() {
    // CHANGE: First clear starter cards from HTML to avoid duplicates on refresh.
    todoColumn.querySelectorAll(".card").forEach(card => card.remove());
    ongoingColumn.querySelectorAll(".card").forEach(card => card.remove());
    doneColumn.querySelectorAll(".card").forEach(card => card.remove());

    // Check if there is any saved data
    const rawData = localStorage.getItem("kanbanData");
    if (!rawData) return;
    
    // Convert the string back into a JavaScript object
    const data = JSON.parse(rawData);
    
    // CHANGE: Use safe fallback arrays, so app doesn't crash if a key is missing.
    (data.todo || []).forEach(text => createCardFromStorage(text, todoColumn));
    (data.ongoing || []).forEach(text => createCardFromStorage(text, ongoingColumn));
    (data.done || []).forEach(text => createCardFromStorage(text, doneColumn));
}

// Helper function to build cards during page load
function createCardFromStorage(taskValue, column) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", "true");

    const span = document.createElement("span");
    span.classList.add("card-text");
    span.innerText = taskValue;

    const btn = document.createElement("button");
    btn.classList.add("delete-btn");
    btn.innerText = "X";

    newCard.appendChild(span);
    newCard.appendChild(btn);
    column.appendChild(newCard);
}

// Run this immediately when the script loads
loadData();