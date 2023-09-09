/*
    TODO:
    
    [x] - Добавить кнопку, которая выделяет каждый четный элемент
    [x] - Добавить кнопку, которая выделяет каждый нечетный элемент
    
    [x] - Добавить кнопку, удаление последнего элемента
    [x] - Добавить кнопку, удаление первого элемента
    
    [] - Добавить кнопку Complete, которая помечает элемент завершенным и помещает в конец
    [x] - Добавить кнопку удаление элемента из списка
    
    [x] - Сохранять данные в localSorage

    Для себя можно добавить

    [] - Пагинацию на список (что бы отображалось от 10 элементов)
    [] - Даты добавление в список
    [] - Сортировку
    [] - Реализовать поиск элементов
*/

// Переменные
let todos = []
const list = document.querySelector('.todoList-items')
const form = document.querySelector('.addTodoForm')
const inputAddToDo = document.querySelector('.inputTitle')
const btnAddTodo = document.querySelector('.btnAddTodo')
const checkEven = document.querySelector('.select-even')
const checkUnEven = document.querySelector('.select-uneven')
const btnLastDelete = document.querySelector('.btnLastDelete')
const btnFirstDelete = document.querySelector('.btnFirstDelete')
// Отключение preventDefault у формы
form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const todoText = inputAddToDo.value

    addNewTodo(todoText)
})

//Добавление нового элемента в список
const addNewTodo = (titleTodo) => {
    if(titleTodo) {
        const newTodo = {
            title: titleTodo,
            status: false
        }
        todos.push(newTodo)
        inputAddToDo.value = ''
        inputAddToDo.focus()
        renderTodoList(todos)
    }else{
        alert('Введите название задачи')
    }

}

//Рендер функция списка
const renderTodoList = (todos) => {
    let todoHTML
    list.innerHTML = ''
    if (!todos.length) {
        todoHTML = (
            `
                <h1>No tasks</h1>
            `
        )
        list.insertAdjacentHTML('beforeend', todoHTML)
        localStorage.setItem('todos', JSON.stringify(todos))
        return
    }
    todoHTML = `<h1>Your tasks</h1>`
    list.insertAdjacentHTML('beforeend', todoHTML)
    if(checkEven.checked && checkUnEven.checked) {
        todos.map((el, index) => {
            todoHTML = (
            `
                <li class="todoList-items__item ${el.status 
                    ? 'active-todo' 
                    : ''
                }"
                ${(index + 1) % 2 === 0 ? 'style="color: green;"' : 'style="color: red;"'}
                >${index + 1}. ${el.title}
                <button class="btnDone" data-action="done">Done</button>
                <button class="btnDelete" data-action="delete">Delete</button>
                <div class="line"></div>
                </li>
            `
            )
            list.insertAdjacentHTML('beforeend', todoHTML)
        })
    }else if(checkEven.checked) {
        todos.map((el, index) => {
            todoHTML = (
            `
                <li class="todoList-items__item ${el.status 
                    ? 'active-todo' 
                    : ''
                }"
                ${(index + 1) % 2 === 0 ? 'style="color: green;"' : ''}
                >${index + 1}. ${el.title}
                <button class="btnDone" data-action="done">Done</button>
                <button class="btnDelete" data-action="delete">Delete</button>
                <div class="line"></div>
                </li>
            `
            )
            list.insertAdjacentHTML('beforeend', todoHTML)
        })
    }else if(checkUnEven.checked) {
        todos.map((el, index) => {
            todoHTML = (
            `
                <li class="todoList-items__item ${el.status 
                    ? 'active-todo' 
                    : ''
                }"
                ${(index + 1) % 2 !== 0 ? 'style="color: red;"' : ''}
                >${index + 1}. ${el.title}
                <button class="btnDone" data-action="done">Done</button>
                <button class="btnDelete" data-action="delete">Delete</button>
                <div class="line"></div>
                </li>
            `
            )
            list.insertAdjacentHTML('beforeend', todoHTML)
        })
    }else {
        todos.map((el, index) => {
            todoHTML = (
            `
                <li class="todoList-items__item ${el.status 
                    ? 'active-todo' 
                    : ''
                }">${index + 1}. ${el.title}
                <button class="btnDone" data-action="done">Done</button>
                <button class="btnDelete" data-action="delete">Delete</button>
                <div class="line"></div>
                </li>
            `
            )
            list.insertAdjacentHTML('beforeend', todoHTML)
        })
    }
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeToDo = (event) => {
    if(event.target.dataset.action === 'delete'){
        const parent = event.target.closest('.todoList-items__item')
        const idElemtn = parent.textContent[0]
        todos = todos.filter((value, index) => index !== +idElemtn - 1)
        renderTodoList(todos)
    }
}

const doneToDo = (event) => {
    if(event.target.dataset.action === 'done'){
        const parent = event.target.closest('.todoList-items__item')
        const idElemtn = parent.textContent[0]
        todos[+idElemtn - 1].status = !todos[+idElemtn - 1].status
        let elemnt = todos[+idElemtn - 1]
        if(todos[+idElemtn - 1].status) {
            todos = todos.filter((value, index) => index !== +idElemtn - 1)
            todos.push(elemnt)
            renderTodoList(todos)
        }else{
            todos = todos.filter((value, index) => index !== +idElemtn - 1)
            todos.unshift(elemnt)
            renderTodoList(todos)
        }
    }
}
list.addEventListener('click', removeToDo)
list.addEventListener('click', doneToDo)

checkEven.addEventListener('click', () => {
    renderTodoList(todos)
})

checkUnEven.addEventListener('click', () => {
    renderTodoList(todos)
})

const removeLastItem = () => {
    if(todos.length) {
        todos.pop()
        renderTodoList(todos)
    }
}
const removeFirstItem = () => {
    if(todos.length) {
        todos.shift()
        renderTodoList(todos)
    }
}

btnFirstDelete.addEventListener('click', removeFirstItem)

btnLastDelete.addEventListener('click', removeLastItem)

if(localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'))
    renderTodoList(todos)
}