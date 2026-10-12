
let projects = []

const savedData = localStorage.getItem("projects");

if (savedData !== null) {
    console.log("localstorage found")
    projects = JSON.parse(savedData)
} else {
    projects = [];
}

if (projects.length === 0) {
    const defaultProject = new Project("Default")

    const todo1 = new Todo("Test", "test test test test", "2027-05-17", "low")
    addTodo(defaultProject, todo1)
    projects.push(defaultProject)
}

let currentProject = projects[0]

let editingTodo = null

let editingProject = null

function storeData() {
    const data = JSON.stringify(projects)
    localStorage.setItem("projects", data);
}

function Todo(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.done = false;
}

function Project(title) {
    this.title = title
    this.todos = []
}

function addTodo(currentProject, todo) {
    currentProject.todos.push(todo)
    storeData()
}

function addProject(project) {
    projects.push(project)
    storeData()
}

function toggleTodo(todo) {
    todo.done = !todo.done
    storeData()
}

function deleteTodo(project, todo) {
    const index = project.todos.indexOf(todo)

    if (index !== -1) {
        project.todos.splice(index, 1)
    }
    storeData()
}

function deleteProject(project) {
    const index = projects.indexOf(project)

    projects.splice(index, 1)
    storeData()
}

function changeCurrentProject(project) {
    currentProject = project
} 

function setEditingTodo(todo) {
    editingTodo = todo;
}

function getEditingTodo() {
    return editingTodo;
}

function clearEditingTodo() {
    editingTodo = null;
    storeData()
}

function setEditingProject(project) {
    editingProject = project
}

function getEditingProject() {
    return editingProject
}

function clearEditingProject() {
    editingProject = null
    storeData()
}


export { Todo, Project, addTodo, projects, currentProject, toggleTodo, deleteTodo, getEditingTodo, clearEditingTodo, setEditingTodo, addProject, changeCurrentProject, deleteProject, setEditingProject, getEditingProject, clearEditingProject}