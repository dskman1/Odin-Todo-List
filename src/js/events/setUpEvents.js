import { dom } from "../dom.js";
import { state } from "../state.js";

import { allContainer } from "../data/container.js";

import { local } from "../../localStorage.js";

import { Project } from "../models/Projects.js";
import { Todo } from "../models/Todo.js";
  
import { renderProjects } from "../ui/renderProjects.js";
import { renderTodos } from "../ui/renderTodos.js";

export function setupEvents() {

    dom.projectForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const value = dom.projectInput.value.trim();

        if (!value) return;

        const project = new Project(value);

        allContainer.addProject(project);

        state.currentProjectId = project.getId();

        renderProjects();
        renderTodos(state.currentProjectId);

        local();

        dom.projectForm.reset();
        dom.projectDialog.close();
    });


    dom.todoForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!state.currentProjectId) return;

        const title = dom.todoTitle.value.trim();

        if (!title) return;

        const todo = new Todo(
            title,
            dom.todoDesc.value,
            dom.todoDate.value,
            dom.todoPriority.value,
            dom.todoNotes.value
        );

        allContainer.addTodo(state.currentProjectId, todo);

        renderTodos(state.currentProjectId);

        local();

        dom.todoForm.reset();
        dom.todoDialog.close();
    });

    document.addEventListener("click", (e) => {

        if (e.target.matches(".project-name")) {

            const parent = e.target.closest(".project-container");

            state.currentProjectId = parent.dataset.id;

            renderTodos(state.currentProjectId);
        }


        if (e.target.matches(".project-delete-button")) {

            const parent = e.target.closest(".project-container");

            const projectId = parent.dataset.id;

            allContainer.removeProject(projectId);

            local();

            if (state.currentProjectId === projectId) {
                state.currentProjectId = allContainer.getLastIdBeforeDeletedProject(projectId);
            }

            renderProjects();
            renderTodos(state.currentProjectId);
        }


        if (e.target.matches(".todo-delete-button")) {

            const parent = e.target.closest(".todo-container");

            const todoId = parent.dataset.id;

            allContainer.removeTodo(
                state.currentProjectId,
                todoId
            );

            local();
            renderTodos(state.currentProjectId);
        }


        if (e.target.matches(".todo-toggle-button")) {

            const parent = e.target.closest(".todo-container");

            const todoId = parent.dataset.id;

            const project = allContainer.getProject(
                state.currentProjectId
            );

            const todo = project.getTodos().find(
                todo => todo.getId() === todoId
            );

            if (!todo) return;

            todo.toggleCompleted();
            
            local();

            renderTodos(state.currentProjectId);
        }

        if(e.target.matches(".todo-edit-button")){
            const parent = e.target.closest(".todo-container")
            const todoId = parent.dataset.id;

            state.currentTodoId = todoId;
            dom.todoEditDialog.showModal()
        }

        if(e.target.matches(".close-todo-edit-dialog")){
            dom.todoEditDialog.close()
        }
    });
    dom.todoEditDialog.addEventListener("click", (ev)=>{
        if(ev.target === dom.todoEditDialog){
            dom.todoEditDialog.close()
        }
    })
       dom.todoEditForm.addEventListener("submit",(e)=>{
        e.preventDefault()


        const title = dom.todoEditTitle.value.trim();

        if(!title) return;

        allContainer.editTodo(
            state.currentProjectId,
            state.currentTodoId,
            dom.todoEditTitle.value,
            dom.todoEditDesc.value,
            dom.todoEditDate.value,
            dom.todoEditPriority.value,
            dom.todoEditNotes.value
        )

        renderTodos(state.currentProjectId)

        local()

         dom.todoEditForm.reset();
        dom.todoEditDialog.close();
    })

}