import { Injectable } from '@angular/core';

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
}
