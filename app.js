// HTML Items
let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".add-todo-btn");
let todoList = document.querySelector(".todo-list");
let filterSelect = document.querySelector(".filter-todo");
let todoValue = todoInput.value;
// Event Listeners
window.onload = loadFromStorage;
todoBtn.addEventListener("click", addTodoFromTodoInput);
todoList.addEventListener("click", checkTodo);
filterSelect.addEventListener("change", filterTodos);

//Functions

function addTodoFromTodoInput(event) {
  if (!todoInput.value) {
    event.preventDefault();
    return;
  }
  event.preventDefault();
  saveToLocalStorage(todoInput.value)
  createTodo(todoInput.value);
  todoInput.value = ""; //make sure todo is empty
}

function createTodo(value) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoItem = document.createElement("li");
  todoItem.innerText = value;
  todoDiv.classList.add("todo-item");

  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="far fa-check-square"></i>';
  checkBtn.classList.add("check-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(todoItem);
  todoDiv.appendChild(checkBtn);
  todoDiv.appendChild(deleteBtn);
  todoList.appendChild(todoDiv);
 
}

function checkTodo(event) {
  var todoItem = event.target;
  const todo = todoItem.parentElement;
  //check for deletion of todo
  if (todoItem.classList[0] === "delete-btn") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
      deleteFromStorage(event)
    });
  }

  //check for complete
  if (todoItem.classList[0] === "check-btn") {
    todo.classList.toggle("completed");
  }
}

function filterTodos(event) {
  filterValue = event.target.value;
  let todos = todoList.childNodes;
  todos.forEach(function(todo){
      switch(filterValue){
        case "completed":
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
            break;
        case "uncompleted":
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
            break;
        case "all":
            todo.style.display = "flex";
            break;
      }
  });

}

function saveToLocalStorage(todo){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos' , JSON.stringify(todos));
}

function loadFromStorage(event){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => createTodo(todo));
}

function deleteFromStorage(event){

    let todotext = event.target.parentElement.innerText
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
        todos.splice(todotext, 1)
        localStorage.setItem('todos', JSON.stringify(todos));
    }


}