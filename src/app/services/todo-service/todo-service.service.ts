import { Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor() { }

  public getAll(): Promise<any> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    
    return fetch('https://dummyjson.com/todos', options)
      .then((response) => response.json())
      .catch(err => console.error(err));
  }

  public getById(id: string) {
    return fetch(`https://dummyjson.com/todos/${id}`)
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  public addTodo(todo: Todo): Promise<any> {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: todo,
        completed: false,
        userId: 5,
      })
    };
    
    return fetch('https://dummyjson.com/todos/add', options)
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  public editTodo(id: string): Promise<any> {
    const options = {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: false,
      })
    };
    
    return fetch(`https://dummyjson.com/todos/${id}`, options)
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  public deleteTodo(id: string): Promise<any> {
    return fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .catch(err => console.error(err));
  }
}
