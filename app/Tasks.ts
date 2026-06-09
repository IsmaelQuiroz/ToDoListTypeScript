import { Task } from "./Task";
import { Tasks_UIInteraction} from "./Tasks_UIInteraction";

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

export { Tasks};