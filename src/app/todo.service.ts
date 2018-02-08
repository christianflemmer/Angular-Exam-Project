import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodoService {

  private url = "http://angular2api2.azurewebsites.net/api/internships";

  constructor( private http: Http ) { }

postTodo(todoCML): Observable < any > {
  // Here we create the data that goes to the API, like the body in postman
  const data = new URLSearchParams();
  data.append('todoCML', todoCML);
  data.append('done', "false");

  // Here we send the request and gets a response
  return this.http.post(this.url, data)
    .map(
      (response: Response) => {
        console.log(response);
        return response;
      } 
    );
}


  getAllTodos(): Observable < any >{
    return this.http.get(this.url)
    .map(
      (response: Response) => {
      return response.json();
      } 
    );
  }

  deleteTodo(iTodo): Observable < any >{
    const url = this.url + "/" + iTodo;
    return this.http.delete(url)
      .map(
        (response: Response) => {
          console.log("We have deleted a todo!");
          return response;
        }
      )
  }

  updateTodo(id, sUpdatedTodo){
    const url  = this.url + "/" + id;
    const data = new URLSearchParams();

    data.append('todoCML', sUpdatedTodo);
    data.append('done', "false");

    return this.http.put(url, data)
      .map(
        (response: Response) => {
          console.log(response);
          return response;
        }
      );
  }

}