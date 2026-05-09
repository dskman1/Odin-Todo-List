import { dom } from "../dom.js";
import { allContainer } from '../data/container.js'

export function renderProjects(){

    dom.projects.textContent = "";


    const projects = allContainer.getProjects();

    for(const project of projects){
    const container = document.createElement("div");
    container.classList.add("project-container");
    container.dataset.id = project.getId()

    const projectButton = document.createElement("button");
    projectButton.textContent = project.getName();
    projectButton.classList.add("project-name")

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("project-delete-button")

    container.append(
        projectButton,
        deleteBtn
    );
    dom.projects.append(container);

    }
}
