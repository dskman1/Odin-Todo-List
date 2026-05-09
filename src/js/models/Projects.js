export class Project {
    constructor(name){
        this.name = name;
        this.id = crypto.randomUUID();
        this.todos = [];
    }

    getId(){
       return this.id;
    }
    
    addTodos(todo){
        this.todos.push(todo);
    }

    getTodos(){
        return this.todos;
    }

    getName(){
        return this.name;
    }
    
    setTodos(todosArr){
        this.todos = todosArr;
    }

    setId(thisId){
        this.id = thisId;
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(
            todo => todo.getId() !== todoId
        );
    }

};