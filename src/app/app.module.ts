import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataTablesModule } from "angular-datatables";
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    SidebarComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
