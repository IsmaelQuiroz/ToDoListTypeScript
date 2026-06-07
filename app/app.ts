interface Task {
    id: number,
    description: string,
    done: boolean
}

class Tasks {
    private _idCount : number = 0;
    private _arrayTask : Array<Task> = [];

    public push(task: Task){
        this._arrayTask.push(task);
    }

    public getNewId(){
        return this._idCount++;
    }
}

//UI Las interacciones con la interface de usuario
class Tasks_UIInteraction {
     public push(task: Task) {
        var template = document.getElementById("template-task-item")!.innerHTML;
        mustache.parse(template);
        var rendered = mustache.render(template, task);
        document.getElementById("taskList")!.innerHTML += rendered;

        (<HTMLInputElement>document.getElementById('inputTask')!).value = '';

        this.addAmountToBadge(1);

        let tasks = document.getElementsByClassName("list-group-item");

        let markAsDoneButtons = document.getElementsByClassName('markTaskAsDone');
        let removeTaskButtons = document.getElementsByClassName('removeTask');

        for (let i = 0; i < markAsDoneButtons.length; i++) {
            var currentElement = markAsDoneButtons[i];
            currentElement.addEventListener("click", this.handleMarkAsDoneClick.bind(this));
        }

        for (let i = 0; i < removeTaskButtons.length; i++) {
            var currentElement = removeTaskButtons[i];
            currentElement.addEventListener("click", this.handleRemoveTaskClick.bind(this));
        }
}

let tasks = new Tasks();

document.getElementById("addTask")!.addEventListener('click',handleAddTaskClick);

function handleAddTaskClick(){
    let inputTask: HTMLInputElement = <HTMLInputElement>document.getElementById('inputTask');
    let inputTaskValue = inputTask.value;
    if(inputTaskValue === ""){
        return;
    }

    let id = tasks.getNewId();

    let task : Task = {
        id : id,
        description: inputTaskValue,
        done: false
    };

    tasks.push(task);
}