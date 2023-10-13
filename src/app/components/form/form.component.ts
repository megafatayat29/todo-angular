import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { AlertMessage } from 'src/app/models/alert-message-interface';
import { Todo } from 'src/app/models/todo.models';
import { TodoServiceService } from 'src/app/services/todo-service/todo-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  message?: AlertMessage;
  isEdit: boolean = false;
  id?: string;
  currentData: any;
  
  todoForm: FormGroup = new FormGroup({
    todo: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    completed: new FormControl(false),
    userId: new FormControl('1'),
  });

  constructor(
    private readonly router: Router,
    private readonly todoService: TodoServiceService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.router.url.match(/edit*/)) {
      this.isEdit = true;
    };
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        return params['id'] ? params['id'] : '';
      })
    )
    .subscribe(
      {
        next: (id: string) => {
          if(id){
            this.id = id;
            this.onView(id);
          }
        },
        error: console.error
      }
    )
  }

  get f() { return this.todoForm.controls; }

  onView(id: string): void {
    this.todoService.getById(id).then(
      (todo: Todo) => {
        this.currentData = todo;
        if (this.currentData) {
          this.f['todo'].setValue(this.currentData.todo);
        }
      }
    );
  }

  onSubmit(): void {
    const todo: Todo = this.todoForm.value;

    this.todoService.addTodo(todo).then(
      (resp: any) => {
        if (this.isEdit) {
          this.message = {
            status: 'success',
            text: `You just edit the todo: ${todo.todo}!`
          }
        } else {
          this.message = {
            status: 'success',
            text: `You just add the todo: ${todo.todo}!`
          }
        }
        setTimeout(() => {
          this.message = undefined;
          this.router.navigateByUrl('');
        }, 5000);
      }
    );
  }
}
