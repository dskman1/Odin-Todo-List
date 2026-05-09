export class Todo{
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.id = crypto.randomUUID();
        this.completed = false
    }

    getId(){
        return this.id;
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }

    setId(thisId){
        this.id = thisId;
    }

    setCompleted(thisCompleted){
        this.completed = thisCompleted;
    }

    setInfo({editTitle, EditDescription="", editDueDate = "", EditPriority , EditNotes =""}){
        this.title = editTitle;
        this.description = EditDescription;
        this.dueDate = editDueDate;
        this.priority = EditPriority;
        this.notes = EditNotes;
    }
}


