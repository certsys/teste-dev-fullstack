import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  loading = false;
  formForgot: FormGroup;
  submit:boolean = false;

  notificationError: boolean = false;
  errorMsg: string;

  notificationSuccess: boolean = false;
  msgSuccess: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _user: UsersService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.formForgot = this.fb.group({
      email: this.fb.control("", [Validators.required])
    });
  }

  forgotPassword(){
    let email = this.formForgot.value.email
    this._user.forgotPassword(email).subscribe((data) => {
      console.log(data);
      this._user.forgot_password(data);

      this.formForgot.reset();
      this.msgSuccess = 'Solicitação enviada com sucesso!';
      setTimeout(() => {
        this.notificationSuccess = false;
        this.router.navigate(["/recover-password"]);
      }, 3000);
    },
    error => {
          console.log(error);
          this.notificationError = true;
          this.errorMsg = 'Error ao recuperar senha!';
          setTimeout(() => {
            this.notificationError = false;
          }, 3000);
        }
    );
  }

  cancelForgot(){
    localStorage.removeItem('forgot');
    this.router.navigate(['/']);
    this.formForgot.reset();
  }

}
