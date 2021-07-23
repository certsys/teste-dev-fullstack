import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PropertiesService } from '../../services/properties.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  loading = false;
  create: FormGroup;
  submit: boolean = false;

  notificationError: boolean = false;
  errorMsg: string;

  notificationSuccess: boolean = false;
  msgSuccess: string;

  propertieId;
  type;

  dados;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _propertie: PropertiesService,
    private _authService: AuthService,
    private _Activatedroute: ActivatedRoute,
    private _user: UsersService
  ) {
    this.create = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  createUser(){
    let dados = this.create.value;

    this._user.create(dados).subscribe((data) => {
      console.log(data);
      this.notificationSuccess = true;
      this.msgSuccess = "Usuário cadastrado com sucesso!"
      setTimeout(() => {
        this.notificationSuccess = false;
        this.back();
      }, 3000);
    }, error => {
      console.log(error);
      this.notificationError = true;
      this.errorMsg = "Error ao cadastrar o usuário!"
      setTimeout(() => {
        this.notificationError = false;
      }, 3000);
    })
  }

  back() {
    this.create.reset();
    this.router.navigate(['/']);
  }

}
