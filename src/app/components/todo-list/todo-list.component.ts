import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertMessage } from 'src/app/models/alert-message-interface';
import { Todo } from 'src/app/models/todo.models';
import { TodoServiceService } from 'src/app/services/todo-service/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  message?: AlertMessage;
  
  constructor(
    private readonly todoService: TodoServiceService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  getAll(): void {
    this.todoService.getAll().then(
      (resp) => {
        this.todos = resp.todos;
        this.dtTrigger.next(null);
      }
    );
  }

  markAsComplete(id: string): void {
    this.todoService.editTodo(id).then(
      (resp) => {
        console.log(resp);
        this.message = {
          status: 'success',
          text: `You have done the todo: ${resp.todo}`
        }
      }
    );
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  edit(id: string): void {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  add(): void {
    this.router.navigateByUrl('/add');
  }

  delete(id: string): void {
    this.todoService.deleteTodo(id).then(
      (resp) => {
        this.message = {
          status: 'success',
          text: `You success to delete the todo: ${resp.todo} with the id: ${resp.id}!`
        }
      }
    );
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }
}
