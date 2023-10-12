import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/models/alert-message-interface';
import { Todo } from 'src/app/models/todo.models';
import { TodoServiceService } from 'src/app/services/todo-service/todo-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  message?: AlertMessage;
  
  todoForm: FormGroup = new FormGroup({
    todo: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    completed: new FormControl(false),
    userId: new FormControl('1'),
  });

  constructor(
    private readonly router: Router,
    private readonly todoService: TodoServiceService
  ) {}

  onSubmit(): void {
    const todo: Todo = this.todoForm.value;

    this.todoService.addTodo(todo).then(
      (resp) => {
        this.message = {
          status: 'success',
          text: `You just add the todo: ${todo.todo}!`
        }
        setTimeout(() => {
          this.message = undefined;
          this.router.navigateByUrl('');
        }, 5000);
      }
    );
  }
}
