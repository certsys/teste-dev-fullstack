import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  formLogin: FormGroup;
  submit:boolean = false;

  notificationError: boolean = false;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _user: UsersService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required])
    });
  }

  clickLogin() {
    let email = this.formLogin.value.email.toLowerCase();
    let password = this.formLogin.value.password;
    this._user
      .login(email, password)
      .subscribe(
        data => {
          console.log(data);
          this._user.save_user(data.user);
          this._user.save_session(data);
          this.router.navigate(["/home"]);
          this.formLogin.reset();
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.submit = true;
            this.errorMsg = "Matrícula ou Senha não são válidos!";
            // this.opsError();
          } else {
            this.errorMsg = "Houve um erro inesperado, tente novamente!";
            // this.opsError();
          }
        }
      );
  }

  redirectSenhaRecovery() {
    this.router.navigate(["/forgot-password"]);
    // localStorage.setItem("recovery_password", JSON.stringify(true));
  }

  createUser(){
    this.router.navigate(['/user']);
  }

}
