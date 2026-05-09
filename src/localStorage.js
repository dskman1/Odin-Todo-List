import { allContainer } from "./js/data/container.js";
import { renderProjects } from "./js/ui/renderProjects.js";
import { renderTodos } from "./js/ui/renderTodos.js";
import { Project } from "./js/models/Projects.js";
import { Todo } from "./js/models/Todo.js";
import { state } from "./js/state.js";

export function local(){
    localStorage.setItem('lastState', JSON.stringify(allContainer.getProjects()));
}

export function renderLocal(){
  const savedData = localStorage.getItem('lastState');
  
  if (!savedData) return false; 
  
  const projects = JSON.parse(savedData);
  
  projects.forEach(project => {
    const newProject = new Project(project.name);
    newProject.setId(project.id);
    
    if(project.todos && project.todos.length > 0){
      project.todos.forEach(todo => {
        const newTodo = new Todo(
          todo.title, 
          todo.description, 
          todo.dueDate, 
          todo.priority, 
          todo.notes
        );
        newTodo.setId(todo.id);
        newTodo.setCompleted(todo.completed);
        newProject.addTodos(newTodo);
      });
    }
    
    allContainer.addProject(newProject);
  });
  
  renderProjects();
  const firstProject = allContainer.getProjects()[0];
  if (firstProject) {
    state.currentProjectId = firstProject.getId();
    renderTodos(state.currentProjectId);
  }
  
  return true; 
}   
