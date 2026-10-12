import "./styles.css";
import { format } from "date-fns";

import { Todo, addTodo, projects, currentProject } from "./modules/applicationLogic.js";

import { loadSidebar, loadTodos } from "./modules/displayLogic.js";


loadSidebar(projects)
loadTodos(currentProject)


/*Make storing system*/