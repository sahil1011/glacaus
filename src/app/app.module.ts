import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailCreateComponent } from './emails/email-create/email-create.component';
import { EmailListComponent } from './emails/email-list/email-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailCreateComponent,
    EmailListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
