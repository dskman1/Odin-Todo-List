export const allContainer = (()=>{
    const Container = {
        projects : [],
        projectsIds: [],
    }

  
    let lastExictingIndex = 0;

    const setContainer = (arr) => Container.projects = arr;

    const getlastIdBeforeDeletedProject = (projectId) =>{ 

        Container.projectsIds = Container.projectsIds.filter(
            id=> id !== projectId
        );

        if(lastExictingIndex === -1) return null;
        if(lastExictingIndex === 0){
            if(Container.projectsIds.length > 0){
                return Container.projectsIds[0]
            }else{
                return null
            }
        };
      
      return Container.projectsIds[lastExictingIndex - 1]
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

        lastExictingIndex = Container.projects.findIndex(project=> project.getId() === projectId);

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
    

    return{getProjects, getProject, addProject, removeProject, addTodo, removeTodo, getlastIdBeforeDeletedProject, setContainer}
})();



