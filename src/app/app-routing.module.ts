import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { 
    path: '', 
    component: TodoListComponent
  },
  { 
    path: 'add', 
    component: FormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
