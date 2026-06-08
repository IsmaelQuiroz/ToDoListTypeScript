import * as mustache from 'mustache';

interface Task {
    id: number,
    description: string,
    done: boolean
}

class Tasks {
    private _idCount : number = 0;
    private _arrayTask : Array<Task> = [];
    private _uiInteractor: Tasks_UIInteraction = new Tasks_UIInteraction();

    public push(task: Task){
        this._arrayTask.push(task);
        this._uiInteractor.push(task);
    }

    public markAllAsDone() : void {
        this._arrayTask.forEach(function(value){
            value.done = true;
        });
        this._uiInteractor.markAllAsDone();
    }

    public markAsDone(id: number) : void{
        var that = this;
        this._arrayTask.forEach(function(value){
            if(value.id === id){
                value.done = true;
                that._uiInteractor.markAsDone(id);
                return false;
            }
        })
    }

    public removeAll(){
        this._arrayTask = [];
        this._uiInteractor.removeAll();
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

    public markAsDone(id:number){
        let tasks = document.getElementsByClassName("list-group-item");
        for(let i = 0; i < tasks.length; i++){
            let task = tasks[i];
            var currentId: number = Number(task.getAttribute("data-id"));
            if(id === currentId){
                task.classList.add("task-done");
                break;
            }
        }
        this.addAmountToBadge(-1);
    }

    public markAllAsDone(){
        let tasks = document.getElementsByClassName("list-group-item");
        for(let i=0; i < tasks.length; i++){
            let task = tasks[i];
            task.classList.add("task-done");
        }
        this.assignValueToBadge('0');
    }

    public removeAll(){
        var tasks = document.getElementsByClassName("list-group-item");
        while(tasks[0]){
            tasks[0].remove();
        }
        this.assignValueToBadge('0');
    }

    private assignValueToBadge(value: string){
        document.getElementById('yourTasksBadge')!.innerHTML = value;
    }

    public addAmountToBadge(amount: number){
        var currentValueTaskBadge = Number(document.getElementById('yourTasksBadge')!.innerHTML);
        document.getElementById('yourTasksBadge')!.innerHTML = (currentValueTaskBadge + amount).toString();
    }

    private handleMarkAsDoneClick(event: Event){
        var target = event.currentTarget;
        var element = <HTMLButtonElement>target;
        var row = element.parentElement!.parentElement!;
        if(!row.classList.contains('task-done')){
            row.classList.add('task-done');
            this.addAmountToBadge(-1);
        }
    }

    private handleRemoveTaskClick(event: Event){
        var target = event.currentTarget;
        var element  = <HTMLButtonElement>target;
        var row = element.parentElement!.parentElement!;
        if(!row.classList.contains('task-done')){
            this.addAmountToBadge(-1);
        }
        row.remove();
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

document.getElementById('inputTask')!.addEventListener('keydown', function(event: KeyboardEvent){
    if(event.keyCode === 13){
        handleAddTaskClick();
    }
},true);

document.getElementById('removeAll')!.addEventListener('click', function() {
    tasks.removeAll();
});

document.getElementById('markAllAsDone')!.addEventListener('click',function(){
    tasks.markAllAsDone();
});