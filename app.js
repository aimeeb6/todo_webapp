// HTML Items
let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".add-todo-btn");
let todoList = document.querySelector(".todo-list");

// Event Listeners

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTodo);

//Functions

function addTodo(event) {
  if (!todoInput.value) {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  todoInput.value = "";
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
  const todo = todoItem.parentElement
  //check for deletion of todo
  if (todoItem.classList[0] === "delete-btn") {
      todo.classList.add("fall");
      todo.addEventListener('transitionend', function(){ 
        todo.remove();
    });
  }

  //check for complete
  if (todoItem.classList[0] === "check-btn") {
      todo.classList.toggle("completed");
  }
}
