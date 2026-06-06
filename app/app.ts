interface Task {
    id: number,
    description: string,
    done: boolean
}

class Task {
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

let tasks = new Task();

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