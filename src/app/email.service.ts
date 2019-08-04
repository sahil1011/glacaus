import { Email } from './emails/email.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emails: Email[] = [

  ];
  private emailUpdated = new Subject<Email[]>();

  constructor(private http: HttpClient) { }
  getEmail() {
    this.http.get<Email[]>
      ('https://devfrontend.gscmaven.com/wmsweb/webapi/email/')
      .subscribe(
        (data) => {
          this.emails = data;
          this.emailUpdated.next([...this.emails]);
        }
      );

  }
  getEmailUpdateListener() {
    return this.emailUpdated.asObservable();
  }
  addEmail(contents: string, valids: boolean) {
    const email = { tableEmailEmailAddress: contents, tableEmailValidate: valids };
    this.http.post<Email>('https://devfrontend.gscmaven.com/wmsweb/webapi/email/', email)
      .subscribe(data => {

        this.getEmail();
      });
  }
  updateEmail(id: number, contents: string, valids: boolean) {
    const email = { tableEmailEmailAddress: contents, tableEmailValidate: valids };
    this.http.put<Email>('https://devfrontend.gscmaven.com/wmsweb/webapi/email/' + id, email)
      .subscribe(data => {
     
        this.getEmail();
      });
  }
  deleteEmail(id: number) {

    this.http.delete<boolean>('https://devfrontend.gscmaven.com/wmsweb/webapi/email/' + id)
      .subscribe(data => {

     this.getEmail();
      });
  }
}



