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

  edit(name: string) {
    this.message = {
      status: 'success',
      text: `You have done the todo: ${name}`
    }
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  add() {
    this.router.navigateByUrl('/add');
  }
}
