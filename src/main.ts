import './style.css'


interface Todo{
    todoTitle:string;
    isTaskCompleted:boolean;
    readonly id:string
}

let todos:Array<Todo> = []

const todoContainer = document.querySelector(".todo-container") as HTMLDivElement

const todoInput = document.querySelector(".input_field") as HTMLInputElement

const form = document.querySelector("#myform") as HTMLFormElement

form.onsubmit=(e)=>{
    e.preventDefault()

    const todo:Todo={
        todoTitle:todoInput.value,
        isTaskCompleted:false,
        id:String(Math.round(Math.random()*1000))
    }
    
    todos.push(todo)
    todoInput.value=""
    // console.log(todos);
    displayTodo(todos)
    
}

const displayTodo = (todos:Todo[]) => {
    todoContainer.innerText=""
    todos.forEach(task=>{
        generateTodo(task.todoTitle,task.isTaskCompleted,task.id)
    })
}

function generateTodo(title:string,isCompleted:boolean,id:string) {
    const todo = document.createElement("div")
    todo.className="todo"

    const checkBox = document.createElement("input")
    checkBox.setAttribute("type","checkbox")
    checkBox.checked=isCompleted
    checkBox.onchange = () => {
        paragraph.className=checkBox.checked ? "textCut":""
        todos.find(task=>{
            if(task.id === id)task.isTaskCompleted=checkBox.checked
        })
    }

    const paragraph = document.createElement("p")
    paragraph.innerText=title

    const btn = document.createElement("button")
    btn.innerText='X'
    btn.onclick = () => {
        deleteTask(id)
    }

    todo.append(checkBox,paragraph,btn)

    todoContainer.append(todo)

}

const deleteTask = (id:string) => {
    todos=todos.filter(item=> item.id !== id)
    displayTodo(todos)
}