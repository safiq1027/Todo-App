//find the elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("meassage");


// create todo
const createTodo=(todoId,todoValue)=>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML=`
    <span>${todoValue}</span>
    <span> <button class="btn" id="deleteButton" > <i class="fa fa-trash"></i> </button> </span>
    `;
    todoLists.appendChild(todoElement);
    ///delete button er list=ner eikhne  ekorte hbe ..na hoye kaj korbe na..
    const deleteButton=todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);

}
// delete todo
const deleteTodo = (event)=>{
    const selctedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selctedTodo);
    showMessage("todo is deletde","danger")

   // const todoId =  selctedTodo.id;
    let todos=getTodosFromLocalStorage();
    todos = todos.filter((todo)=>todo.todoId!==selctedTodo.id);
    localStorage.setItem("mytodos",JSON.stringify(todos));
}
//Show message
const showMessage=(text,status)=>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent="";
        messageElement.classList.remove(`bg-${status}`);

    },1000)

}
//getTodosFromLocalStorage
const getTodosFromLocalStorage=()=>{
    return localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];

}
//add todo
const addTodo=(event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    //unique id
    const todoId = Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("todo is added","success")
///add todo to local storage
    const todos = getTodosFromLocalStorage();
   // const todos = localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
    todoInput.value="";
    
};

//load todos
const loadTodos = ()=>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue))
};
//add event listener
todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);
