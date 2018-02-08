import { Component }       from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators,
  FormControl }            from '@angular/forms';
import { TodoValidators }  from '../app.customValidators';
import { TodoService }     from '../todo.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  providers: [TodoService],
  styleUrls: ['../css/style.css']
})


export class TodoComponent {


  private addTodoForm: FormGroup;
  private oldTodoForm: FormGroup;
  private oTodo;
  private todoInput = "";

  constructor(fb: FormBuilder, private todoService : TodoService){
    this.oldTodoForm = fb.group({
      'todo' : ["", TodoValidators.limitChars()]
    }),
    this.addTodoForm = fb.group({
      'addTodo' : ["", TodoValidators.limitChars()]
    });
  };

  title = 'The Great Todo App';
  aListOfTodos = [];


  toggleHide(oTodo){
    if(this.oTodo != null && this.oTodo!=oTodo){
      this.oTodo.hideMe = true;
    }
    oTodo.hideMe = !oTodo.hideMe;
    this.oTodo = oTodo;
    return oTodo.hideMe;
  };


  onRead() {
    this.todoService.getAllTodos().subscribe(response => {
      this.aListOfTodos = response.filter((todo) => {
        if (todo.todoCML) {
          todo.hideMe = true;
          this.aListOfTodos.push(todo);
          return todo;
        }
      });
    });
  }

  // Adds a todo to the html
  appendNewTodo(newTodo){
    var todoName = newTodo._value.todo;
    this.aListOfTodos.push({
      todoCML: todoName, done: false
    });
  }

  // We get the data from HTML form(formData). To be created as a todo object later..
  onCreate(formData){
    //     this.aListOfTodos.push({todoCML: formData.get('todo').value, done: false}); // adds the todo directly to the list, instead of getting it form database
      this.todoService.postTodo(formData.get('addTodo').value).subscribe(
        () => {
          this.onRead();
        }
      );
          this.todoInput = "";
  }

  // We get the todo object(oTodo) from the specified item in the list
  onDelete(oTodo){
    this.todoService.deleteTodo(oTodo._id).subscribe( 
      () => {
        this.onRead();
      }
    )
  }

  // Whatever user clicks, get object
  // Extract ID out of object
  onUpdate(oTodo, sUpdatedTodo: String){
    this.todoService.updateTodo(oTodo._id, sUpdatedTodo).subscribe(
      () => {
        this.onRead();
      }
    )
  }

  // toggleUpdateInput(){
  //   var input = document.querySelector(".updateInput");
  //     input.addEventListener("click", function(){
  //       this.classList.toggle("showUpdate");
  //     });
  // }



  ngOnInit() {
    this.onRead();
    // this.toggleUpdateInput();
  }

}


