import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _api: ApiService) { }

  login(email, password){
    email = email.toLowerCase();
    return this._api.post('auth/authenticate', { email, password });
  }

  create(dados){
    return this._api.post('auth/register', dados);
  }

  forgotPassword(email){
    email = email.toLowerCase();
    return this._api.post('auth/forgot_password', { email });
  }

  recoverPassword(dados){
    console.log(dados);
    return this._api.post('auth/reset_password', dados);
  }

  save_user(dados){
    console.log(dados);
    localStorage.setItem('usuario_logado', JSON.stringify(dados));
  }

  // SALVAR SESSAO
  save_session(dados){
    console.log(dados);
    this.logoff();
    localStorage.setItem('sessao', JSON.stringify(dados));
  }

  forgot_password(dados){
    this.logoff();
    localStorage.setItem('forgot', JSON.stringify(dados));
  }

  logoff(){
    localStorage.setItem('sessao', '');
    localStorage.clear();
  }
}
