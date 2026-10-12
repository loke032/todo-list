
import { toggleTodo, deleteTodo, setEditingTodo, getEditingTodo, clearEditingTodo, setEditingProject, getEditingProject, clearEditingProject, Todo, addTodo, currentProject, Project, addProject, changeCurrentProject, projects, deleteProject } from "./applicationLogic.js"

function loadSidebar(projects) {
    const sidebar = document.querySelector(".sidebar-content")
    sidebar.innerHTML = ""

    const title = document.createElement("h3")
    title.textContent = "PROJECTS"
    title.classList.add("project-title-header")
    sidebar.appendChild(title)

    const addProjectButton = document.createElement("button")
    addProjectButton.classList.add("add-project-button")
    addProjectButton.textContent = "Add Project"
    sidebar.appendChild(addProjectButton)

    addProjectButton.addEventListener("click", ()=>{

        sidebarModal.showModal()

        document.querySelector(".sidebar-modal-title").textContent = "Add Project"
        document.querySelector(".add-project-button-modal").textContent = "Add"

        document.querySelector("#project-title-input").value = ""
        document.querySelector("#project-title-input").textContent = ""
    })

    for (const project of projects) {
        const projectDiv = document.createElement("div")
        projectDiv.classList.add("project-div")
        sidebar.appendChild(projectDiv)

        const projectTitle = document.createElement("div")
        projectTitle.classList.add("project-title")
        projectTitle.textContent = project.title
        projectDiv.appendChild(projectTitle)

        projectTitle.addEventListener("click", ()=>{
            changeCurrentProject(project)
            loadTodos(project)
        })

        const projectButtons = document.createElement("div")
        projectButtons.classList.add("project-buttons")
        projectDiv.appendChild(projectButtons)

        const projectDeleteButton = document.createElement("button")
        projectDeleteButton.classList.add("project-delete-button")
        projectDeleteButton.textContent = "Delete"
        projectButtons.appendChild(projectDeleteButton)

        projectDeleteButton.addEventListener("click", ()=>{
            deleteProject(project)
            loadSidebar(projects)
            
            loadTodos(projects[0])
        })

        const projectEditButton = document.createElement("button")
        projectEditButton.classList.add("project-edit-button")
        projectEditButton.textContent = "Edit"
        projectButtons.appendChild(projectEditButton)

        projectEditButton.addEventListener("click", ()=>{
            setEditingProject(project)

            const titleInput = document.querySelector("#project-title-input")

            titleInput.value = project.title

            document.querySelector(".sidebar-modal-title").textContent = "Edit Project"
            document.querySelector(".add-project-button-modal").textContent = "Save"

            const sidebarModal = document.querySelector("#sidebar-modal")
            sidebarModal.showModal()
        })
    }
}


const sidebarModal = document.querySelector("#sidebar-modal")


const sidebarModalForm = document.querySelector(".sidebar-form")

sidebarModalForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const projectTitleInput = document.querySelector(".project-title-input")

    const editingProject = getEditingProject()

    if (editingProject) {
        editingProject.title = projectTitleInput.value

        loadTodos(editingProject)
        clearEditingProject()
    } else {
        const project = new Project(projectTitleInput.value)

        addProject(project)
        changeCurrentProject(project)
        loadTodos(project)
    }
    
    
    loadSidebar(projects)

    sidebarModalForm.reset()

    sidebarModal.close()
    
})

const cancelProjectButton = document.querySelector(".cancel-project-button")

cancelProjectButton.addEventListener("click", ()=>{
    sidebarModal.close()
    clearEditingProject()
})






function loadTodos(project) {
    const main = document.querySelector(".todo-content2") 
    main.innerHTML = ""

    const openButton = document.querySelector("#open-modal")

    if (!project) {
        openButton.classList.add("hidden")
        return
    } else {
        openButton.classList.remove("hidden")
    }

    const projectTitle = document.createElement("h1")
    projectTitle.classList.add("project-title-todo")
    projectTitle.textContent = project.title
    
    
    for (const todo of project.todos) {
        const card = document.createElement("div")
        card.classList.add("card")
        main.prepend(card)

        const title = document.createElement("h3")
        title.classList.add("todo-title")
        title.textContent = todo.title
        card.appendChild(title)

        const description = document.createElement("p")
        description.classList.add("description")
        description.textContent = todo.description
        card.appendChild(description)

        description.addEventListener("click", () => {
            description.classList.toggle("expanded");
        });

        if (description.scrollHeight > description.clientHeight) {
            description.classList.add("expandable");
        }

        const date = document.createElement("div")
        date.classList.add("date")
        date.textContent = `Due: ${todo.dueDate}`
        card.appendChild(date)
        
        const priority = document.createElement("p")
        priority.classList.add("priority")
        priority.textContent = todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)
        if (todo.priority === "low") {
            priority.classList.add("priority-low")
        } else if (todo.priority === "medium") {
            priority.classList.add("priority-medium")
        } else if (todo.priority === "high") {
            priority.classList.add("priority-high")
        }
        card.appendChild(priority)

        const buttons = document.createElement("div")
        buttons.classList.add("card-buttons")
        card.appendChild(buttons)

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.classList.add("checkbox")
        buttons.appendChild(checkbox)

        if (todo.done) {
            checkbox.checked = true
            card.classList.add("completed")
        }

        checkbox.addEventListener("change", ()=>{
            if (checkbox.checked) {
                card.classList.add("completed");
                toggleTodo(todo)
            } else {
                card.classList.remove("completed");
                toggleTodo(todo)
            }
        })

        

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-todo-button")
        deleteButton.textContent = "Delete"

        deleteButton.addEventListener("click", ()=>{
            deleteTodo(project, todo)
            loadTodos(project)
        })
        buttons.appendChild(deleteButton)

        const editButton = document.createElement("button")
        editButton.classList.add("edit-todo-button")
        editButton.textContent = "Edit"
        buttons.appendChild(editButton)

        editButton.addEventListener("click", ()=>{
            setEditingTodo(todo)

            const modal = document.querySelector("#todo-modal")
            const titleInput = document.querySelector("#title")
            const descriptionInput = document.querySelector("#description")
            const dateInput = document.querySelector("#date")
            document.querySelector(`input[value="${todo.priority}"]`).checked = true

            titleInput.value = todo.title;
            descriptionInput.value = todo.description;
            dateInput.value = todo.dueDate;

            document.querySelector(".modal-title").textContent = "Edit Todo"
            document.querySelector(".add-todo-button").textContent = "Save"
            

            modal.showModal()
        })

        
    }
    main.prepend(projectTitle)
}





const modal = document.querySelector("#todo-modal")
const openButton = document.querySelector("#open-modal")


openButton.addEventListener("click", ()=> {
    modal.showModal()
    document.querySelector(".modal-title").textContent = "Add Todo"
    document.querySelector(".add-todo-button").textContent = "Add"

    
    const titleInput = document.querySelector("#title")
    const descriptionInput = document.querySelector("#description")
    const dateInput = document.querySelector("#date")
    document.querySelector(`input[value="${"low"}"]`).checked = true

    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    
})

const addTodoButton = document.querySelector(".add-todo-button")

addTodoButton.addEventListener("click", (e)=> {
    e.preventDefault()


    const titleInput = document.querySelector("#title")
    const descriptionInput = document.querySelector("#description")
    const dateInput = document.querySelector("#date")
    const priorityInput = document.querySelector('input[name="priority"]:checked')

    const editTodo = getEditingTodo()

    if (editTodo) {
        editTodo.title = titleInput.value;
        editTodo.description = descriptionInput.value;
        editTodo.dueDate = dateInput.value;
        editTodo.priority = priorityInput.value;

        clearEditingTodo()
        loadTodos(currentProject)
    } else {
        const todo = new Todo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)

        addTodo(currentProject, todo)
        loadTodos(currentProject)
    }

    const todoForm = document.querySelector(".todo-form")
    todoForm.reset()

    modal.close()
}) 




const cancelButton = document.querySelector(".cancel-todo-button");

cancelButton.addEventListener("click", () => {
    modal.close();
});

export { loadSidebar, loadTodos }