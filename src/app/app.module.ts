import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { CustomerComponent }  from './customer.component';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		CustomerComponent
  ],
  providers: [
        CustomerService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
