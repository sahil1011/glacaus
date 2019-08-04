import { Email } from './../email.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailService } from 'src/app/email.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit, OnDestroy {
  emails: Email[] = [];
  addModal = false;
  private emailSubs: Subscription;
  addForm: FormGroup;
  updateForm: FormGroup;
  showDialog: false;
  selectedId: number;
  bool: boolean;
  constructor(public emailService: EmailService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    this.updateForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    this.emailService.getEmail();
    // this.emailService.addEmail('sahil3@g.com', true);
    this.emailSubs = this.emailService.getEmailUpdateListener()
      .subscribe(
        (emails: Email[]) => {
          this.emails = emails;
        }
      );
  }
  addpopup() {
    $('#myModal1').modal('show');
  }
  updatePopup(id: number) {
    $('#myModal2').modal('show');
    this.selectedId = id;
  }
  addEmail(){
   this.emailService.addEmail(this.addForm.get('email').value, this.addForm.get('email').valid);
   this.addForm.reset();
   $('#myModal1').modal('hide');
  }
  updateEmail() {
    this.emailService.updateEmail(this.selectedId, this.updateForm.get('email').value, this.updateForm.get('email').valid);
    $('#myModal2').modal('hide');
    this.updateForm.reset();
   }
   deleteEmail(id: number){
     this.emailService.deleteEmail(id);
   }
  ngOnDestroy() {
    this.emailSubs.unsubscribe();
  }
}
