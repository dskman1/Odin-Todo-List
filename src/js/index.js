import { renderProjects } from './ui/renderProjects.js';
import { renderTodos } from './ui/renderTodos.js';
import { setupDialog } from './ui/dialogs.js';

import { Project } from './models/Projects.js';
import { Todo } from './models/Todo.js';

import { state } from './state.js';
import { dom } from './dom.js';

import { allContainer } from './data/container.js';

import { setupEvents } from "./events/setUpEvents.js";

import { local, renderLocal } from '../localStorage.js';


import '../css/styles.css'

setupDialog(
    dom.openProject, 
    dom.closeProject,
    dom.projectDialog
);

setupDialog(
    dom.openTodo,
    dom.closeTodo, 
    dom.todoDialog
);


setupEvents();


const dataRestored = renderLocal();
if (!dataRestored) {
    initializeDefault();
}



function initializeDefault() {

    const defaultProject = new Project("Default");

    allContainer.addProject(defaultProject);

    state.currentProjectId = defaultProject.getId();


    const defaultTodo = new Todo(
        "Learn Algorithms",
        "Practice daily",
        "2026-12-12",
        "High",
        "Keep consistency"
    );

    allContainer.addTodo(
        state.currentProjectId,
        defaultTodo
    );


    renderProjects();
    renderTodos(state.currentProjectId);
}

// initializeDefault();

