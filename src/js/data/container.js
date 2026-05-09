export const allContainer = (()=>{
    const Container = {
        projects : [],
        projectsIds: [],
    }

  
    let lastExcitingIndex = 0;


    const getLastIdBeforeDeletedProject = (projectId) =>{ 

        Container.projectsIds = Container.projectsIds.filter(
            id=> id !== projectId
        );

        if(lastExcitingIndex === -1) return null;
        if(lastExcitingIndex === 0){
            if(Container.projectsIds.length > 0){
                return Container.projectsIds[0]
            }else{
                return null
            }
        };
      
      return Container.projectsIds[lastExcitingIndex - 1]
    }

    const getProjects = ()=> Container.projects;

    const getProject = (projectId) => {
        return Container.projects.find(
            project => project.getId() === projectId
        );
    };

    const addProject = (project)=> {
        Container.projects.push(project)
        Container.projectsIds.push(project.getId());
    }

    const removeProject = (projectId) => {

        lastExcitingIndex = Container.projects.findIndex(project=> project.getId() === projectId);

        Container.projects = Container.projects.filter(
            project => project.getId() !== projectId
        );
    }


    const addTodo = (projectId, todo)=> {
        const project = getProject(projectId);
        if(!project) return;

        project.addTodos(todo);
        
    }

    const removeTodo = (projectId, todoId) =>{
       const project = getProject(projectId);
       if(!project) return;

       project.removeTodo(todoId);

    }

    const editTodo = (projectId, todoId, title, desc, date, priority, notes )=>{
        const project = getProject(projectId);
        if(!project) return;
        project.editTodos(todoId, title, desc, date, priority, notes)
    }
    

    return{getProjects, getProject, addProject, removeProject, addTodo, removeTodo, getLastIdBeforeDeletedProject, editTodo}
})();



