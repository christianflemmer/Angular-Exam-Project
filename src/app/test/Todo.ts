export class Todo {
    id: Number;
    name: String;
    constructor(id: Number, name: String){
        this.id = id;
        this.name = name;
    }
    getName(){
        return this.name;
    };
}


// Where you want to use the class, import it and instantiate it:
// import { Todo } from './test/Todo.ts';

// let newTodo = new Todo("Howard");
