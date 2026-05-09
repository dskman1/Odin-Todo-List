import { dom } from "../dom.js";
import { allContainer } from '../data/container.js'

export function renderTodos(projectId){
   
    dom.todos.textContent = "";

    const project = allContainer.getProject(projectId);
    if(!project) return;

    const todos = project.getTodos();
    
    for (const todo of todos){
        if(todo){
            const container = document.createElement("div");
            container.classList.add("todo-container");
            container.dataset.id = todo.getId();

            const title = document.createElement("h3");
            title.textContent = `Title: ${todo.title}`;

            const description = document.createElement("p");
            description.textContent = `Description: ${todo.description}`;

            const dueDate = document.createElement("p");
            dueDate.textContent = `Date: ${todo.dueDate}`;

            const priority = document.createElement("p");
            priority.textContent = `Priority: ${todo.priority}`;

            const notes = document.createElement("p");
            notes.textContent = `Notes: ${todo.notes}`;

            const completed = document.createElement("button");
            completed.textContent = todo.completed ? "Completed": "Not Completed"
            completed.classList.add("todo-toggle-button");

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("todo-delete-button")

            container.append(
                title,
                description,
                dueDate,
                priority,
                notes,
                completed,
                deleteButton
            );
            dom.todos.append(container);
        }
    }
}

