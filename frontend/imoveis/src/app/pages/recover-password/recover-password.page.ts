import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  loading = false;
  formRecover: FormGroup;
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
    this.formRecover = this.fb.group({
      password: this.fb.control("", [Validators.required])
    });
  }

  recoverPassword(){
    let forgot = JSON.parse(localStorage.getItem('forgot'));
    let email = forgot.emailUser;
    let token = forgot.token;
    let password = this.formRecover.value.password;

    let dados = {
      email,
      token,
      password
    };

    this._user.recoverPassword(dados).subscribe(() => {
      localStorage.removeItem('forgot');
      this.formRecover.reset();
      this.notificationSuccess = true;
      this.msgSuccess = 'Senha atualizada com sucesso!';
      setTimeout(() => {
        this.notificationSuccess = false;
        this.router.navigate(['/']);
      }, 3000);
    }, error => {
      this.notificationError = true;
      this.errorMsg = 'Error ao atualizar a senha!';
      setTimeout(() => {
        this.notificationError = false;
      }, 3000);
    });
  }

  cancelForgot(){
    localStorage.removeItem('forgot');
    this.router.navigate(['/']);
    this.formRecover.reset();
  }

}
